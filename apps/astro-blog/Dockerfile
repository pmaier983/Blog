# syntax=docker/dockerfile:1

# This file was inspired by the following:
# https://github1s.com/vercel/turbo/blob/main/examples/with-docker/apps/web/Dockerfile#L14
# https://pnpm.io/docker

# This file should not be run from within the astro-blog folder!
# We depend on the entire monorepo to be present in the container!

# Step to debug (you may need to `docker login` first):
# 1. To Build the docker image run:
#    docker build -t pmaier983/private-docker-images:astro-blog -f apps/astro-blog/Dockerfile $(cat .env | grep -v '^#' | xargs -I {} echo --build-arg {}) .
#    * do this FROM THE TURBOREPO ROOT
# 2. To test the image locally run:
#    docker run -p 4321:4321 --env-file .env -t pmaier983/private-docker-images:astro-blog
#    * open locally via: http://localhost:4321
# 3. Use the docker desktop app to explore the container via the CLI

# to push to my private repo run:

# 4. docker push pmaier983/private-docker-images:astro-blog

############### Install pnpm & turbo ###############
FROM node:20-slim AS base

ARG DATABASE_URL
ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY
ARG PUBLIC_BACKEND_API_URL
ARG PUBLIC_IN_NETWORK_BACKEND_API_URL

# Set environment variables
ENV DATABASE_URL=${DATABASE_URL}
ENV SUPABASE_URL=${SUPABASE_URL}
ENV SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
ENV PUBLIC_BACKEND_API_URL=${PUBLIC_BACKEND_API_URL}
ENV PUBLIC_IN_NETWORK_BACKEND_API_URL=${PUBLIC_IN_NETWORK_BACKEND_API_URL}

# ensure we properly set the ARGS
RUN if [ -z "$DATABASE_URL" ]; then echo "DATABASE_URL is not set"; exit 1; fi
RUN if [ -z "$SUPABASE_URL" ]; then echo "SUPABASE_URL is not set"; exit 1; fi
RUN if [ -z "$SUPABASE_ANON_KEY" ]; then echo "SUPABASE_ANON_KEY is not set"; exit 1; fi
RUN if [ -z "$PUBLIC_BACKEND_API_URL" ]; then echo "PUBLIC_BACKEND_API_URL is not set"; exit 1; fi
RUN if [ -z "$PUBLIC_IN_NETWORK_BACKEND_API_URL" ]; then echo "PUBLIC_IN_NETWORK_BACKEND_API_URL is not set"; exit 1; fi

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
# If we add --prod it does not install what is required to build the package ... (typescript - tsc)
# Docs: https://pnpm.io/cli/install#--prod--p
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# our build step expects a .env.prod file to be present
RUN printenv > .env.prod

# Build the project
RUN pnpm turbo run build --filter=astro-blog...

############### Run the project ###############
FROM base AS runner
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
