@echo off
setlocal enabledelayedexpansion
rem variables
call vars.bat
call db.bat

docker run --rm -ti --volumes-from !CREDVOLUME! --link !DBNAME!:dbhost -p 5000:!HOSTPORT! -v %~dp0\..\..:/project -w /project !IMAGE! bash