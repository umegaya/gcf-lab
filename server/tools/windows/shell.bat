@echo off
setlocal enabledelayedexpansion
rem variables
call vars.bat

docker run --rm -ti --volumes-from !CREDVOLUME! -p 5000:!HOSTPORT! -v %~dp0\..\..:/project -w /project !IMAGE! bash