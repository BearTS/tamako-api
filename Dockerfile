FROM node:16-alpine

# Dependencies
RUN apk add  --no-cache git ffmpeg gettext librsvg ghostscript imagemagick graphicsmagick \
    && apk add --virtual build-dependencies \
    build-base \
    gcc \
    python3 \
    python3-dev \
    make \
    pkgconfig \
    autoconf \
    libtool \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev
    
RUN mkdir -p /usr/src/
WORKDIR /usr/src/

RUN npm install -g pm2 

COPY package.json /usr/src/
RUN yarn install
COPY . /usr/src/

CMD ["pm2-runtime", "start ecosystem.cluster.json"]