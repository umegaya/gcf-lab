@echo off
setlocal enabledelayedexpansion
rem variables
call vars.bat
set PROJECT_ID=%1

rem commands
echo "please provide your google cloud sdk credential..."
docker rm !CREDVOLUME! 
docker run -ti --name !CREDVOLUME! !IMAGE! gcloud auth login
docker run -ti --volumes-from !CREDVOLUME! !IMAGE! gcloud config set project !PROJECT_ID!
docker run -ti --volumes-from !CREDVOLUME! !IMAGE! gcloud config set functions/region !REGION!
