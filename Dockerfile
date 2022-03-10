FROM node:14-alpine

ENV CHATBRAIN=${CHATBRAIN}
ENV rateLimit=${rateLimit}
ENV PORT=3000
ENV FACEPLUSPLUS_KEY=${FACEPLUSPLUS_KEY}
ENV FACEPLUSPLUS_SECRET=${FACEPLUSPLUS_SECRET}
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