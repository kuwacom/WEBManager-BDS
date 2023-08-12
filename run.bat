set /P ID="サーバーID: "
docker run --cpus 1 --memory 500m -d --name %ID% -p %ID%:19132/udp -p 80:80/tcp -p 8080:8080/tcp minecraft:node-bds
