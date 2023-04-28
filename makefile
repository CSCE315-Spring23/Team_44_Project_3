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
	jsdoc "./Client/src" "./Server/api" -r --verbose --private -d docs

rm-docs:
	rm -rf docs/