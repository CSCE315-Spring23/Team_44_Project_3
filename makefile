.PHONY: install run client server

run: client server

client:
	cd ./Client && npm run build

server:
	cd ./Server && npm run dev

install:
	cd Client && npm install
	cd Server && npm install