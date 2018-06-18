### caution
- if you add new directory for function (under ./functions), please restart make dev manually. 

### setup
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

### create/change database schema (migrations)



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
