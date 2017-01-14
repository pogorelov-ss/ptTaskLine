from allauth.account.views import LogoutView

class ExtendedLogoutView(LogoutView):

    def post(self, *args, **kwargs):
        url = super().get_redirect_url()
        if is_authenticated(self.request.user):
            super().logout(self)
        response = redirect(url)
        print(response)
        response.set_cookie('auth', "test", max_age=1)
        response.delete_cookie('auth')
        return response
