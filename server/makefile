PROJECT_ID=
IMAGE=umegaya/gcfdev
CREDVOLUME=gcloud-config-for-gcfdev
BIN=./node_modules/.bin
WEBPACK=$(BIN)/webpack
NODEMON=$(BIN)/nodemon

run:
	node index.js

dev:
	$(WEBPACK) --config ./tools/webpack/config.js --watch &
	$(NODEMON) --ext js --watch dist -x 'node index.js'

compile:
	$(WEBPACK) --config ./tools/webpack/config.js

test:
	wrk -t4 -c10 -d10s -s bench/entry.lua http://localhost:5000

deploy:
	bash ./tools/deploy/gcp.sh

image:
	docker build -t umegaya/gcfdev -f ./tools/docker/Dockerfile . 

init:
	@echo "please provide your google cloud sdk credential..."
	docker run -ti --name $(CREDVOLUME) $(IMAGE) gcloud auth login
	docker run -ti --volumes-from $(CREDVOLUME) $(IMAGE) gcloud config set project $(PROJECT_ID)

shell:
	docker run --rm -ti --volumes-from $(CREDVOLUME) -v `pwd`:/project -w /project $(IMAGE) bash