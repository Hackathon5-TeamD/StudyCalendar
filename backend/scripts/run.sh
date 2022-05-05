#!/bin/bash

echo "Waiting for mysql to start..."
until mysql -h"$MYSQL_HOST" -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" &> /dev/null
do
    sleep 1
done

cd /usr/src/app/db && alembic upgrade head
# cd /usr/src/app/db && python seed.py
apt install -y locales
cd /usr/src/app/app/sql_app && python database.py
echo "ja_JP UTF-8" > /etc/locale.gen && locale-gen
# cd /usr/src/app/app && uvicorn sql_app.main:app --reload --port=8000 --host=0.0.0.0
cd /usr/src/app/app && gunicorn sql_app.main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000

