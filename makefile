.PHONY: install run client server

run: client server

client:
	cd ./Client && npm run build

server:
	cd ./Server && npm run dev

install:
	cd Client && npm install
	cd Server && npm install

docs: rm-docs
	./node_modules/.bin/jsdoc --verbose --private "./Client/src" -r -d docs
	./node_modules/.bin/jsdoc --verbose --private "./Server/api" -r -d docs

rm-docs:
	rm -rf docs/