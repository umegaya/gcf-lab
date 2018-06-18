@echo off
setlocal enabledelayedexpansion
rem variables
call vars.bat

docker kill !DBNAME!
docker rm !DBNAME!
