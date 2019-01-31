# Codersmind - Nginx RTMP

## Summary

- Debian Slim (we started with Alpine, but we got DNS errors after a while, Debian should fix that)
- Nginx with RTMP
- FFMPEG
- Node.js server for: authentication & stream hls files from the nginx server to s3

## Getting started

`npm run docker`

### Manually building & running the image

1. Build the image: `docker build -t rtmp .`
2. Run the image: `docker run -p 2001:80 -p 2002:443 -p 8080:8080 -p 1935:1935 rtmp`

You can now start streaming.

### Authentication

TODO...

---

You can access the docker instance by:

1. Get the container ID: `docker ps`
2. Get in the container shell: `docker exec -it <container_id> sh`

## Development of Node server

`npm install`
`npm start`
