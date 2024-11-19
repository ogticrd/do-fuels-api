# syntax=docker/dockerfile:1
# ===================== Create base stage =====================
ARG NODE_VERSION=lts
ARG WORK_DIR=/app
FROM node:${NODE_VERSION}-slim AS base

ARG WORK_DIR
ARG APP_ENV=production

ARG PORT=80
ENV WORK_DIR=${WORK_DIR}

WORKDIR ${WORK_DIR}

# Install corepack and set pnpm as default package manager
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install wget
RUN apt-get update \
    && apt-get install -y ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

# ===================== Install Deps =====================
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
# By caching the content-addressable store we stop downloading the same packages again and again
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# ===================== Build Stage =====================
# Rebuild the source code only when needed
FROM base AS build

COPY --from=deps ${WORK_DIR}/node_modules ./node_modules
COPY . .

RUN npm run build

# Only production dependencies will be installed
ENV NODE_ENV=${APP_ENV}
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

# ===================== App Runner Stage =====================
FROM base AS runner

RUN addgroup --gid 1001 --system nodejs && \
    adduser --system --no-create-home --uid 1001 nestjs

COPY --from=build --chown=nestjs:nodejs ${WORK_DIR}/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs ${WORK_DIR}/package.json ./package.json
COPY --from=build --chown=nestjs:nodejs ${WORK_DIR}/dist ./dist

USER nestjs

EXPOSE ${PORT}

ENV PORT=${PORT}
ENV HOSTNAME=0.0.0.0
ENV TZ=America/Santo_Domingo

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

CMD [ "node", "dist/main.js" ]
