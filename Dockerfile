FROM alpine:latest
LABEL maintainer="Jisu Kim <webmaster@alien.moe>"

RUN apk add --no-cache nodejs yarn
RUN yarn global add ts-node typescript
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
CMD [ "yarn", "start" ]
