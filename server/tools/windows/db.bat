@echo off
setlocal enabledelayedexpansion
rem variables
call vars.bat

docker inspect !DBNAME >nul 2>&1
if %ERRORLEVEL% == 0 goto :dbexists
echo "create database container"
docker run --name !DBNAME! -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -d mysql:5.7

:dbexists
echo "init database"
docker run --rm -ti --link !DBNAME!:dbhost -v %~dp0\..\..:/project -e MYSQL_ROOT_PASSWORD=admin mysql:5.7 bash /project/tools/deploy/dbinit.sh dbhost db
