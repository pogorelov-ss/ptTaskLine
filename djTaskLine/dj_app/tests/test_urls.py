# from django.test import TestCase

# Create your tests here.
import factory
from django import test
from django.contrib.auth import models
from django.core.urlresolvers import reverse
from django.conf import settings
import importlib


class UserFactory(factory.Factory):
    class Meta:
        model = models.User
    username = 'testUser'
    email = 'pogorelov.ss+1t@gmail.com'
    admin = True
    staff = True
    password = '123456'


#  based on http://stackoverflow.com/a/19162337/3921551
class UrlsTest(test.TestCase):
    def setUp(self):
        self.user = models.User.objects.create_user('testUser', email='pogorelov.ss+1t@gmail.com', password='123456',
                                             is_staff=True, is_superuser=True)
        print(self.user.id, self.user.username, self.user.password)

    def test_responses(self, allowed_http_codes=[200, 302, 405],
                       credentials={'username': 'testUser', 'password': '123456'}, logout_url="/admin/logout/",
                       default_kwargs={}, quiet=False):
        """
        Test all pattern in root urlconf and included ones.
        Do GET requests only.
        A pattern is skipped if any of the conditions applies:
            - pattern has no name in urlconf
            - pattern expects any positinal parameters
            - pattern expects keyword parameters that are not specified in @default_kwargs
        If response code is not in @allowed_http_codes, fail the test.
        if @credentials dict is specified (e.g. username and password),
            login before run tests.
        If @logout_url is specified, then check if we accidentally logged out
            the client while testing, and login again
        Specify @default_kwargs to be used for patterns that expect keyword parameters,
            e.g. if you specify default_kwargs={'username': 'testuser'}, then
            for pattern url(r'^accounts/(?P<username>[\.\w-]+)/$'
            the url /accounts/testuser/ will be tested.
        If @quiet=False, print all the urls checked. If status code of the response is not 200,
            print the status code.
        """
        module = importlib.import_module(settings.ROOT_URLCONF)
        if credentials:
            self.client.login(**credentials)

        def check_urls(urlpatterns, prefix=''):
            for pattern in urlpatterns:
                if hasattr(pattern, 'url_patterns'):
                    # this is an included urlconf
                    new_prefix = prefix
                    if pattern.namespace:
                        new_prefix = prefix + (":" if prefix else "") + pattern.namespace
                    check_urls(pattern.url_patterns, prefix=new_prefix)
                params = {}
                skip = False
                regex = pattern.regex
                if regex.groups > 0:
                    # the url expects parameters
                    # use default_kwargs supplied
                    if regex.groups > len(regex.groupindex.keys()) \
                            or set(regex.groupindex.keys()) - set(default_kwargs.keys()):
                        # there are positional parameters OR
                        # keyword parameters that are not supplied in default_kwargs
                        # so we skip the url
                        skip = True
                    else:
                        for key in set(default_kwargs.keys()) & set(regex.groupindex.keys()):
                            params[key] = default_kwargs[key]
                if hasattr(pattern, "name") and pattern.name:
                    name = pattern.name
                else:
                    # if pattern has no name, skip it
                    skip = True
                    name = ""
                fullname = (prefix + ":" + name) if prefix else name
                if not skip:
                    url = reverse(fullname, kwargs=params)
                    response = self.client.get(url)
                    self.assertIn(response.status_code, allowed_http_codes)
                    # print status code if it is not 200
                    status = "" if response.status_code == 200 else str(response.status_code) + " "
                    if not quiet:
                        print(status + url)
                    if url == logout_url and credentials:
                        # if we just tested logout, then login again
                        self.client.login(**credentials)
                else:
                    if not quiet:
                        print("SKIP " + regex.pattern + " " + fullname)

        check_urls(module.urlpatterns)
