# syntax=docker/dockerfile:1

# This file was inspired by the following:
# https://turbo.build/repo/docs/handbook/deploying-with-docker#example
# https://pnpm.io/docker

# This file should not be run from within the blog-backend folder!
# We depend on the entire monorepo to be present in the container!

# Step to debug (you may need to `docker login` first):
# 1. To Build the docker image run:
#    docker build -t pmaier983/private-docker-images:blog-backend -f apps/blog-backend/Dockerfile $(cat .env | grep -v '^#' | xargs -I {} echo --build-arg {}) .
#    * do this FROM THE TURBOREPO ROOT
# 2. To test the image locally run:
#    docker run -p 4321:4321 --env-file .env -t pmaier983/private-docker-images:blog-backend
#    * open locally via: http://localhost:3030/api/v1/buttons/test
# 3. Use the docker desktop app to explore the container via the CLI

# to push to my private repo run:

# 4. docker push pmaier983/private-docker-images:blog-backend

############### Install pnpm & turbo ###############
FROM node:20-slim AS base

ARG DATABASE_URL

# Set environment variables
ENV DATABASE_URL=${DATABASE_URL}

# ensure we properly set the ARGS
RUN if [ -z "$DATABASE_URL" ]; then echo "DATABASE_URL is not set"; exit 1; fi
RUN if [ -z "$BACKEND_API_PORT" ]; then echo "BACKEND_API_PORT is not set"; exit 1; fi

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

# our build step expects a .env file to be present
RUN printenv > .env

# Build the project
RUN pnpm turbo run build --filter=blog-backend...

############### Run the project ###############
FROM base as runner
WORKDIR /app

# TODO: how to not run production as root
# RUN addgroup --system --gid 1001 api
# RUN adduser --system --uid 1001 api
# USER api

COPY --from=installer /app .

EXPOSE 8080

CMD ["pnpm", "turbo", "run", "start", "--filter=blog-backend..."]
