#!/usr/bin/env bash
# run to set current shell envs
# .  ./set_local_envs.sh

echo set shell envs

export DJANGO_SETTINGS_MODULE=dj_main.settings.dev
#export DJANGO_SECRET_KEY=

export RDS_DB_NAME=taskline
export RDS_USERNAME=db_user
export RDS_PASSWORD=xxpassxx
export RDS_PORT=5432
export RDS_HOSTNAME=127.0.0.1

#export OPBEAT_ORGANIZATION_ID=fb29d4ecd7be4db3ab3e894c1a3cc347
#export OPBEAT_APP_ID=89859b2bee
export OPBEAT_SECRET_TOKEN=9cefdda0ab876d96ae404fedeb72a1c05c50e31a


