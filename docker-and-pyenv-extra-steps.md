## 1 start simpler with docker

### Install and configure docker
#### [Install Docker on Linux distributions](https://docs.docker.com/engine/installation/linux/)
#### ? change the Docker image installation directory
type
``sudo service docker status``
and see something like this (on Fedora or Ubuntu)
```Redirecting to /bin/systemctl status  docker.service
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; enabled; vendor prese
   Active: inactive (dead)
     Docs: https://docs.docker.com
```
type
``sudo gedit /usr/lib/systemd/system/docker.service``

and add -g param to ExecStart line 

``ExecStart=/usr/bin/dockerd -g /mnt/docker-data``

#### [Create a docker group](https://docs.docker.com/engine/installation/linux/fedora/#/create-a-docker-group)

### Install Simple Python Version Management(pyenv), jupiter, etc.

#### use [pyenv installer](https://github.com/yyuu/pyenv-installer)
 or [pyenv instructions](https://github.com/yyuu/pyenv#installation)
 
 or my variant for Fedora|Ubuntu
 
 ``curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer | bash``
 
 and add to the end of .(bash|zsh)rc  file
 ```bash
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

#### install python 

``pyenv install 3.5.2 `` [if something was wrong](https://github.com/yyuu/pyenv/wiki/Common-build-problems)

for clean Fedora 25 ``install zlib-devel bzip2 bzip2-devel readline-devel sqlite sqlite-devel openssl-devel``
```
Installed:
  bzip2-devel.x86_64 1.0.6-20.fc24                                              
  keyutils-libs-devel.x86_64 1.5.9-8.fc24                                       
  krb5-devel.x86_64 1.14.4-4.fc25                                               
  libcom_err-devel.x86_64 1.43.3-1.fc25                                         
  libkadm5.x86_64 1.14.4-4.fc25                                                 
  libselinux-devel.x86_64 2.5-13.fc25                                           
  libsepol-devel.x86_64 2.5-10.fc25                                             
  libverto-devel.x86_64 0.2.6-6.fc24                                            
  ncurses-c++-libs.x86_64 6.0-6.20160709.fc25                                   
  ncurses-devel.x86_64 6.0-6.20160709.fc25                                      
  openssl-devel.x86_64 1:1.0.2j-3.fc25                                          
  pcre-cpp.x86_64 8.39-6.fc25                                                   
  pcre-devel.x86_64 8.39-6.fc25                                                 
  pcre-utf32.x86_64 8.39-6.fc25                                                 
  readline-devel.x86_64 6.3-8.fc24                                              
  sqlite-devel.x86_64 3.14.2-1.fc25                                             
  zlib-devel.x86_64 1.2.8-10.fc24
```   


#### create vitualenv
``pyenv virtualenv 3.5.2 web``

and activate
``pyenv activate web``

### if you need new clean Django project
### Create project dir

#### Install Django
``pip install django``

#### Create project
``django-admin startproject projectName``
