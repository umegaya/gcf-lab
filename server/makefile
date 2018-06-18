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

#---------------
# bootstrap(linux/osx)
#---------------
init:
	@echo "please provide your google cloud sdk credential..."
	@-docker rm $(CREDVOLUME) 
	docker run -ti --name $(CREDVOLUME) $(IMAGE) gcloud auth login
	docker run -ti --volumes-from $(CREDVOLUME) $(IMAGE) gcloud config set project $(PROJECT_ID)
	docker run -ti --volumes-from $(CREDVOLUME) $(IMAGE) gcloud config set functions/region $(REGION)

shell: db
	docker run --rm -ti --volumes-from $(CREDVOLUME) --link $(DBNAME):dbhost -p 5000:$(HOSTPORT) -v `pwd`:/project -w /project $(IMAGE) bash

#---------------
# build code 
#---------------
dev: migrate
	$(WEBPACK) --config ./tools/webpack/config.js --watch --watch-poll 1 &
	sleep 1
	$(NODEMON) -L --ext js --watch dist -x 'node index.js'

compile:
	$(WEBPACK) --config ./tools/webpack/config.js

#---------------
# build tools 
#---------------
MIGRATOR=./tools/deploy/migration.js
ENTITIES=$(shell ls ./database/entities/*.ts)
$(MIGRATOR): ./database/Migration.ts $(ENTITIES)
	$(WEBPACK) --config ./tools/webpack/tools.js

.PHONY: tools
tools: $(MIGRATOR)

#---------------
# database 
#---------------
db:
	(docker inspect $(DBNAME) 2>&1 > /dev/null || docker run --name $(DBNAME) -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -d mysql:5.7) && \
		docker run --rm -ti --link $(DBNAME):dbhost -v `pwd`:/project -e MYSQL_ROOT_PASSWORD=admin mysql:5.7 bash /project/tools/deploy/dbinit.sh dbhost db

dropdb:
	@-docker kill $(DBNAME)
	@-docker rm $(DBNAME)

dbsh:
	docker exec -ti $(DBNAME) bash

#---------------
# migration 
#---------------
checkpoint: tools
	node ./tools/deploy/migration.js generate $(NAME)

revert: tools
	node ./tools/deploy/migration.js revert
	cd ./tools/deploy/migrations/ && rm `ls -r | head -1`
	cd ./database/migrations/ && rm `ls -r | head -1`

migrate:
	$(WEBPACK) --config ./tools/webpack/migrations.js
	node ./tools/deploy/migration.js apply

#---------------
# test 
#---------------
test:
	wrk -t4 -c10 -d10s -s bench/entry.lua http://localhost:5000

#---------------
# deployment
#---------------
deploy:
	bash ./tools/deploy/gcp.sh $(FN)

#---------------
# make develop env
#---------------
image:
	docker build -t umegaya/gcfdev ./tools/docker
