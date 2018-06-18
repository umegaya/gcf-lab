#!/bin/bash

PWD=`dirname $0`

HOST=${1:-localhost}
DB=${2:-db}

echo "wait for mysql server running"
while :
do
	mysql -u root -p${MYSQL_ROOT_PASSWORD} -h ${HOST} -e "show databases" > /dev/null 2>/dev/null
	if [ $? -eq 0 ]; then
		echo "mysql server starts"
		break
	fi
	printf "."
	sleep 1
done

mysql -u root -p${MYSQL_ROOT_PASSWORD} -h ${HOST} -e "create database if not exists ${DB}"

