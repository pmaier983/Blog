# syntax=docker/dockerfile:1

# This file was inspired by the following:
# https://github1s.com/vercel/turbo/blob/main/examples/with-docker/apps/web/Dockerfile#L14
# https://pnpm.io/docker

# This file should not be run from within the astro-blog folder!
# We depend on the entire monorepo to be present in the container!

# Step to debug: 
# 1. run `docker build -t astro-blog -f apps/astro-blog/Dockerfile .` from the turborepo root
# 2. run `docker run -p 4321:4321 --env-file .env -t astro-blog` # open locally via: http://localhost:3030/api/v1/buttons/test
# 3. Use the docker desktop app to explore the container via the CLI

############### Install pnpm & turbo ###############
FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# https://nodejs.org/api/corepack.html
# Help to id the version of the package manager (and install it!)
RUN corepack enable
# install & setup turbo
RUN pnpm -g i turbo

############### Setup the files for the project ###############
FROM base AS builder

WORKDIR /app
COPY . .

# build 
RUN turbo prune astro-blog --docker

############### Install the project ###############
FROM base AS installer

WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/full/ .
# TODO: properly handle env files? (They should not be copied within the dockerfile!)
COPY --from=builder /app/.env .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build the project
RUN pnpm turbo run build --filter=astro-blog...

############### Run the project ###############
FROM base as runner
WORKDIR /app

# TODO: how to not run production as root
# RUN addgroup --system --gid 1001 api
# RUN adduser --system --uid 1001 api
# USER api

COPY --from=installer /app .

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["pnpm", "turbo", "run", "start", "--filter=astro-blog..."]
