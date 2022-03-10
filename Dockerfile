FROM node:14-alpine

ENV CHATBRAIN=${CHATBRAIN}
ENV rateLimit=${rateLimit}
ENV PORT=3000
ENV FACEPLUSPLUS_KEY=${FACEPLUSPLUS_KEY}
ENV FACEPLUSPLUS_SECRET=${FACEPLUSPLUS_SECRET}
ENV GOV_KEY=${GOV_KEY}
ENV ANILIST_USERNAME=${ANILIST_USERNAME}
ENV BITLY_KEY=${BITLY_KEY}
ENV GOOGLE_KEY=${GOOGLE_KEY}
ENV CLEARBIT_KEY=${CLEARBIT_KEY}
ENV WEBSTER_KEY=${WEBSTER_KEY}
ENV GITHUB_ACCESS_TOKEN=${GITHUB_ACCESS_TOKEN}
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