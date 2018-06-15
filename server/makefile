PROJECT_ID=
REGION=us-central1
IMAGE=umegaya/gcfdev
CREDVOLUME=gcloud-config-for-gcfdev
BIN=./node_modules/.bin
WEBPACK=$(BIN)/webpack
NODEMON=$(BIN)/nodemon
HOSTPORT=5000
FN=

run:
	node index.js

dev:
	$(WEBPACK) --config ./tools/webpack/config.js --watch --watch-poll 1 &
	sleep 1
	$(NODEMON) -L --ext js --watch dist -x 'node index.js'

compile:
	$(WEBPACK) --config ./tools/webpack/config.js

test:
	wrk -t4 -c10 -d10s -s bench/entry.lua http://localhost:5000

deploy:
	bash ./tools/deploy/gcp.sh $(FN)

image:
	docker build -t umegaya/gcfdev -f ./tools/docker/Dockerfile . 

init:
	@echo "please provide your google cloud sdk credential..."
	@-docker rm $(CREDVOLUME) 
	docker run -ti --name $(CREDVOLUME) $(IMAGE) gcloud auth login
	docker run -ti --volumes-from $(CREDVOLUME) $(IMAGE) gcloud config set project $(PROJECT_ID)
	docker run -ti --volumes-from $(CREDVOLUME) $(IMAGE) gcloud config set functions/region $(REGION)

shell:
	docker run --rm -ti --volumes-from $(CREDVOLUME) -p 5000:$(HOSTPORT) -v `pwd`:/project -w /project $(IMAGE) bash