/**
 * Tutorials & Docs followed for the setup of this file:
 *
 * When I got it working on a VM.
 * - https://www.pulumi.com/registry/packages/gcp/how-to-guides/gce-webserver/
 * - https://github.com/pulumi/templates/blob/master/vm-gcp-typescript/index.ts
 * - https://gist.github.com/kurokobo/25e41503eb060fee8d8bec1dd859eff3
 *
 * When I tried getting it to work on Cloud Run.
 * - https://cloud.google.com/artifact-registry/docs/docker/authentication
 * - https://www.pulumi.com/registry/packages/gcp/how-to-guides/gcp-ts-docker-gcr-cloudrun/
 * - https://github.com/pulumi/examples/blob/master/gcp-ts-docker-gcr-cloudrun/cloud-run-deploy/index.ts
 * - https://github.com/pulumi/examples/blob/master/gcp-ts-cloudrun/index.ts
 *
 * When I got it working on Cloud Run.
 * - https://www.pulumi.com/docs/iac/using-pulumi/organizing-projects-stacks/
 * - https://www.pulumi.com/registry/packages/gcp/api-docs/cloudrunv2/service/
 */

import * as pulumi from "@pulumi/pulumi"
import * as gcp from "@pulumi/gcp"
import * as docker from "@pulumi/docker"

const gcpConfig = new pulumi.Config("gcp")

const PROJECT = gcpConfig.require("project")
const REGION = gcpConfig.require("region")

const defaultConfig = new pulumi.Config()

const ARTIFACT_REGISTRY_REPO_ID = defaultConfig.require(
  "artifact-registry-repo-id",
)
const DOCKER_IMAGE_NAME = defaultConfig.require("docker-image-name")
const DATABASE_URL = process.env.DATABASE_URL
const PUBLIC_FRONTEND_URL = process.env.PUBLIC_FRONTEND_URL

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

if (!PUBLIC_FRONTEND_URL) {
  throw new Error("PUBLIC_FRONTEND_URL is not set")
}

if (!DOCKER_IMAGE_NAME) {
  throw new Error("IMAGE_NAME is not set")
}

const artifactRegistryDockerImageRepo = new gcp.artifactregistry.Repository(
  "blog-backend-api-docker-image-repo",
  {
    location: REGION,
    project: PROJECT,
    repositoryId: ARTIFACT_REGISTRY_REPO_ID,
    description: "Blog backend API docker image",
    format: "DOCKER",
    dockerConfig: {
      immutableTags: true,
    },
  },
)

const backedApiDockerImage = new docker.Image(
  "blog-backend-image",
  {
    build: {
      context: "../../", // Build from the monorepo root
      dockerfile: "../../apps/blog-backend/Dockerfile",
      platform: "linux/amd64",
      args: {
        DATABASE_URL,
        PUBLIC_FRONTEND_URL,
      },
    },
    imageName: pulumi.interpolate`us-west2-docker.pkg.dev/${PROJECT}/${ARTIFACT_REGISTRY_REPO_ID}/${DOCKER_IMAGE_NAME}:latest`,
  },
  // Need to create the artifact registry repo first before building the image
  { dependsOn: artifactRegistryDockerImageRepo },
)

const cloudRunApiName = "blog-backend-api-cloud-run"

const blogBackendApiService = new gcp.cloudrunv2.Service(
  cloudRunApiName,
  {
    location: REGION,
    name: cloudRunApiName,
    project: PROJECT,
    invokerIamDisabled: true,
    // TODO: Change this to a more secure ingress policy
    ingress: "INGRESS_TRAFFIC_ALL",
    deletionProtection: false,
    template: {
      containers: [
        {
          image: backedApiDockerImage.imageName,
          ports: {
            containerPort: 8080,
          },
          envs: [
            {
              name: "DATABASE_URL",
              value: DATABASE_URL,
            },
            {
              name: "PUBLIC_FRONTEND_URL",
              value: PUBLIC_FRONTEND_URL,
            },
          ],
          resources: {
            limits: {
              memory: "1Gi",
            },
          },
        },
      ],
    },
  },
  { dependsOn: backedApiDockerImage },
)

export const blogBackendApiUrn = blogBackendApiService.urn
