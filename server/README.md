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
  
### try functions
- osx
  - use normal terminal
- windows
  - use Ubuntu on windows subsystem for linux
```
  # calc: calculate sha3 hash for the text given by the value for key "data" of posted data
  shell>curl https://localhost:5000/functions/calc -H 'Content-Type: application/json' -d '{"data":"hoge"}'
 c78a779a8cd7e0a0e280d567c59782101be0fbd3c48a118574fb545a64e3bbb1ef503d53c41474bd8ebba1c158013055892411b43414c4e649d925125358ba24
 
  # hello: respond text with delay specified by the value for key "wait_msec" of posted data
  shell>curl https://localhost:5000/functions/hello -H 'Content-Type: application/json' -d '{"wait_msec":100}'
  delayed hello: 100 ms # should have additional latency 100ms
  
  # register: create record which `name` column is the value for key "name" of posted data
  shell>curl https://localhost:5000/functions/register -H 'Content-Type: application/json' -d '{"name":"hoge"}'
  {"id":1} # insert(1, "hoge")  
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


