# syntax=docker/dockerfile:1

# This file was inspired by the following:
# https://turbo.build/repo/docs/handbook/deploying-with-docker#example
# https://pnpm.io/docker

# This file should not be run from within the blog-backend file!
# We depend on the entire monorepo to be present in the container!

# Step to debug: 
# 1. rune `docker build -t blog-backend -f apps/blog-backend/Dockerfile .` from the turborepo root
# 2. Use the docker desktop app to run the container
# 3. Use the docker desktop app to explore the container via the CLI

FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# https://nodejs.org/api/corepack.html
# Help to id the version of the package manager (and install it!)
RUN corepack enable

WORKDIR /app
RUN pnpm -g i turbo
COPY . .
RUN turbo prune blog-backend --docker
