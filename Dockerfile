ARG DOCKER_REGISTRY
FROM ${DOCKER_REGISTRY}node:14-alpine AS BUILD_IMAGE

WORKDIR /app

ARG NPM_MIRROR=https://registry.npmjs.org
RUN npm config set registry $NPM_MIRROR && npm config set progress false

COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

COPY . .

# Test and lint

# Build app
RUN npm run build && \
    npm prune --production

ARG DOCKER_REGISTRY
FROM ${DOCKER_REGISTRY}node:14-alpine

WORKDIR /app

# Copy from build
COPY --from=BUILD_IMAGE /app .

ENV NODE_ENV=production

ENV HOST=localhost \
    PORT=3030

CMD ["node", "build"]
