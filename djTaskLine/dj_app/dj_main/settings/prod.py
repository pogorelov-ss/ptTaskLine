from .base import *

DEBUG = False

##################################################################
# ALLOWED_HOSTS Hack for AWS EB
##################################################################
ALLOWED_HOSTS = [os.environ.get('ALLOWED_HOST'), 'www.{}'.format(os.environ.get('ALLOWED_HOST'))]
import requests

EC2_PRIVATE_IP = None
try:
    EC2_PRIVATE_IP = requests.get('http://169.254.169.254/latest/meta-data/local-ipv4', timeout=0.01).text
except requests.exceptions.RequestException:
    pass

if EC2_PRIVATE_IP:
    ALLOWED_HOSTS.append(EC2_PRIVATE_IP)
##################################################################
