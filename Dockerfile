# Install dependencies only when needed
FROM node:20-alpine AS base

WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update \
    && apk add --no-cache libc6-compat \
    && apk add --no-cache make \
    && apk add --no-cache bash


FROM base as deps
COPY package.json package-lock.json* ./
# Install dependencies
RUN npm ci

FROM deps as runner
COPY . .
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 prod-nodejs

USER prod-nodejs

FROM runner as dev
EXPOSE 9229
CMD ["make", "start.debug.open"]

FROM runner as prod
CMD ["make", "start.prod"]

