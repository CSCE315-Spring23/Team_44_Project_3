.PHONY: all client server

all: client server

client:
	cd ./Client && npm run build

server:
	cd ./Server && npm run dev
