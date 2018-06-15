@echo off
setlocal enabledelayedexpansion
rem variables
call vars.bat

docker run --rm -ti --volumes-from !CREDVOLUME! -p 5000:!HOSTPORT! -v `pwd`:/project -w /project !IMAGE! bash