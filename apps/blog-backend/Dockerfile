# syntax=docker/dockerfile:1

# This file was inspired by the following:
# https://turbo.build/repo/docs/handbook/deploying-with-docker#example
# https://pnpm.io/docker

# This file should not be run from within the blog-backend file!
# We depend on the entire monorepo to be present in the container!

# Step to debug: 
# 1. run `docker build -t blog-backend -f apps/blog-backend/Dockerfile .` from the turborepo root
# 2. run `docker run -p 3030:8080 --env-file .env -t blog-backend` # open locally via: http://localhost:3030/api/v1/buttons/test
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
RUN turbo prune blog-backend --docker

############### Install the project ###############
FROM base AS installer

WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/full/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build the project
RUN pnpm turbo run build --filter=blog-backend...

############### Run the project ###############
FROM base as runner
WORKDIR /app

# Don't run production as root
# RUN addgroup --system --gid 1001 api
# RUN adduser --system --uid 1001 api
# USER api

COPY --from=installer /app .

CMD ["pnpm", "turbo", "run", "start", "--filter=blog-backend..."]

EXPOSE 8080