### caution
- if you add new directory for function (under ./functions), please restart make dev manually. 

### prepare
- common
  - add "cloud functions developer" privilege to your account
  
- osx
  - osx high sierra recommended
  - install git
  - install [docker for mac](https://www.docker.com/docker-mac)
  
- win
  - windows 10 Pro (latest) recommended
  - install git
  - install [docker for win](https://www.docker.com/docker-win)
  - install [window subsystem for linux and ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install-win10) (for testing with curl)

### setup
- clone this repository
- osx
  ```
  $ cd $REPOSITORY_PATH/server
  $ make init PROJECT_ID=$GCP_PROJECT_ID # you will be asked your google account to use gcp
  $ make shell
  # in docker container
  > yarn
  > make compile
  ```
- windows
  ```
  PowerShell>cd $REPOSITORY_PATH\server\tools\windows
  PowerShell>.\init.bat $GCP_PROJECT_ID # you will be asked your google account to use gcp
  PowerShell>.\shell.bat
  # in docker container
  > yarn
  > make compile
  ```

### start development
- osx
  ```
  $ make shell
  # in docker container
  > yarn
  > make dev
  ```

- windows
  ```
  PowerShell>.\shell.bat
  # in docker container
  > yarn
  > make dev
  ```

### deployment to google cloud functions
- osx
  ```
  $ make shell
  # in docker container
  > make deploy # deploy all
  > make deploy FN=calc # only `calc` function
  ```

- windows
  ```
  PowerShell>.\shell.bat
  # in docker container
  > make deploy # deploy all
  > make deploy FN=calc # only `calc` function
  ```

### create/change database schema (migrations)
- first, add or modify file at ```./database/entities/*.ts```
- second, create ```checkpoint``` with name. it will create new migration code automatically by diffing code in ```./database/entities/*.ts``` and actual database schema.
- then apply new migration codes by using ```make migrate```
- you should commit created typescritp and compiled javascript to source control.
- osx
  ```
  $ make shell
  # in docker container
  > make checkpoint NAME=AddNewColumn # create checkpoint
  > make migrate # migrate database to above new checkpoint.
  ```

- windows
  ```
  PowerShell>.\shell.bat
  # in docker container
  > make checkpoint NAME=AddNewColumn # create checkpoint
  > make migrate # migrate database to above new checkpoint.
  ```


