#
# Inspiration / resources:
#
# Dockerfiles:
# - https://github.com/ImplementsIO/alpine-nginx-rtmp/blob/master/Dockerfile
# - https://github.com/mikkun/docker-nginx-rtmp/blob/master/Dockerfile
#

FROM node:10.15.0-slim

ARG NGINX_VERSION=1.14.2
ARG RTMP_MODULE_VERSION=1.1.7.11-dev

#
# Setup NGINX + RTMP
#

RUN apt-get update && \
    apt-get install -y build-essential curl libssl-dev ffmpeg libpcre3 libpcre3-dev zlib1g-dev

RUN mkdir /root/build
COPY build/ /root/build

RUN adduser --system --no-create-home --group --disabled-login --disabled-password nginx

RUN cd /root/build \
    && tar xfz s6-overlay-amd64.tar.gz -C / \
    && tar -xvf nginx-${NGINX_VERSION}.tar.gz \
    && cd /root/build/nginx-${NGINX_VERSION} \
    && /root/build/nginx-${NGINX_VERSION}/configure \
      --add-module=/root/build/nginx-rtmp-module-${RTMP_MODULE_VERSION} \
    && make \
    && make install \
    && make clean

ADD root /

# clean cache & package
RUN rm -rf /usr/include /usr/share/man /tmp/* /var/cache/apk/* /root/build/

# nginx
RUN ln -sf /dev/stdout /usr/local/nginx/logs/access.log \
    && ln -sf /dev/stderr /usr/local/nginx/logs/error.log

#
# Setup Node.js server
#

WORKDIR /usr/node-server

COPY ./package*.json ./
RUN npm install --only=production && npm cache clean --force
COPY ./src ./src

EXPOSE 1935 80 8080 443

CMD ["npm", "run", "start-production"]
ENTRYPOINT ["/init"]
