PROJECT_ID=
REGION=us-central1
IMAGE=umegaya/gcfdev
CREDVOLUME=gcloud-config-for-gcfdev
BIN=./node_modules/.bin
WEBPACK=$(BIN)/webpack
NODEMON=$(BIN)/nodemon
TYPEORM=typeorm
HOSTPORT=5000
DBNAME=gcf-sqldb
NAME=
FN=

db:
	(docker inspect $(DBNAME) 2>&1 > /dev/null || docker run --name $(DBNAME) -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -d mysql:5.7) && \
		docker run --rm -ti --link $(DBNAME):dbhost mysql:5.7 mysql -h dbhost -padmin -e "create database if not exists db"

dev: migrate
	$(WEBPACK) --config ./tools/webpack/config.js --watch --watch-poll 1 &
	sleep 1
	$(NODEMON) -L --ext js --watch dist -x 'node index.js'

compile:
	$(WEBPACK) --config ./tools/webpack/config.js

.PHONY: tools
tools:
	$(WEBPACK) --config ./tools/webpack/tools.js

test:
	wrk -t4 -c10 -d10s -s bench/entry.lua http://localhost:5000

deploy:
	bash ./tools/deploy/gcp.sh $(FN)

migent:
	$(TYPEORM) migration:create -n $(NAME) -d ./database/migrations/

migrate:
	$(WEBPACK) --config ./tools/webpack/migrations.js
	node ./tools/deploy/migration.js

image:
	docker build -t umegaya/gcfdev ./tools/docker

init:
	@echo "please provide your google cloud sdk credential..."
	@-docker rm $(CREDVOLUME) 
	docker run -ti --name $(CREDVOLUME) $(IMAGE) gcloud auth login
	docker run -ti --volumes-from $(CREDVOLUME) $(IMAGE) gcloud config set project $(PROJECT_ID)
	docker run -ti --volumes-from $(CREDVOLUME) $(IMAGE) gcloud config set functions/region $(REGION)

shell: db
	docker run --rm -ti --volumes-from $(CREDVOLUME) --link $(DBNAME):dbhost -p 5000:$(HOSTPORT) -v `pwd`:/project -w /project $(IMAGE) bash