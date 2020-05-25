ARG DOCKER_REGISTRY
FROM ${DOCKER_REGISTRY}node:12-alpine

WORKDIR /app

ARG NPM_MIRROR=https://registry.npmjs.org
RUN npm config set registry $NPM_MIRROR

COPY package.json package-lock.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build && \
    npm prune --production

ENV NODE_ENV=production

ENV HOST=localhost \
    PORT=3030

CMD ["node", "build"]
