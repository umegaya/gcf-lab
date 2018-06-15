### caution
- do not use docker-machine, its ignore file modify notification from host (eg. inotify).
- if you add new directory for function, please restart make dev manually. 

### setup
- osx
  ```
  $ make init PROJECT_ID=$GCP_PROJECT_ID
  # you will choose your google account to use gcp
  $ make shell
  # in docker container
  > yarn
  > make dev 
  ```
- windows
  - double-click tools/windows/init.bat
  - double-click tools/windows/shell.bat
  ```
  # in docker container
  > yarn
  > make dev   
  ```

### start development
- osx
  ```
  make dev
  ```

- windows
  - double-click tools/windows/shell.bat