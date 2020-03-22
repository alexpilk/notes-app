IP=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}'); \
xhost + $IP; \
docker-compose run -e DISPLAY=$IP:0 -v /tmp/.X11-unix:/tmp/.X11-unix --entrypoint "npx cypress open --project /e2e" cypress
