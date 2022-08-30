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

COPY package.json /usr/src/
RUN npm install
COPY . /usr/src/
EXPOSE ${PORT}
CMD ["node", "src/index.js"]