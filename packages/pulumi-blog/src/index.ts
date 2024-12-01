/**
 * Tutorials & Docs followed for the setup of this file:
 *
 * When I tried getting it to work on a VM.
 * - https://www.pulumi.com/registry/packages/gcp/how-to-guides/gce-webserver/
 * - https://github.com/pulumi/templates/blob/master/vm-gcp-typescript/index.ts
 * - https://gist.github.com/kurokobo/25e41503eb060fee8d8bec1dd859eff3
 *
 * When I tried getting it to work on Cloud Run.
 * - https://cloud.google.com/artifact-registry/docs/docker/authentication
 * - https://www.pulumi.com/registry/packages/gcp/how-to-guides/gcp-ts-docker-gcr-cloudrun/
 * - https://github.com/pulumi/examples/blob/master/gcp-ts-docker-gcr-cloudrun/cloud-run-deploy/index.ts
 * - https://github.com/pulumi/examples/blob/master/gcp-ts-cloudrun/index.ts
 */

import * as gcp from "@pulumi/gcp"
import * as pulumi from "@pulumi/pulumi"
import * as docker from "@pulumi/docker"

import { envSchema } from "./envSchema"

const env = envSchema.parse(process.env)

const location = env.LOCATION

const astroImageName = `astro-blog-${new Date().getTime()}`
const backendImageName = `blog-backend-${new Date().getTime()}`

/* ########## Build the Docker images for the backend and frontend. ########## */

const backendImage = new docker.Image(backendImageName, {
  // Use the current date as the tag to ensure the image is updated
  imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/${backendImageName}:latest`,
  build: {
    context: "../../",
    dockerfile: "../../apps/blog-backend/Dockerfile",
    platform: "linux/amd64",
    args: env,
  },
})

const astroImage = new docker.Image(astroImageName, {
  // Use the current date as the tag to ensure the image is updated
  imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/${astroImageName}:latest`,
  build: {
    context: "../../",
    dockerfile: "../../apps/astro-blog/Dockerfile",
    platform: "linux/amd64",
    args: env,
  },
})

/* ########## Upload & Deploy the backend to Google Cloud Run. ########## */

// add a unique ID to ensure the service updates
const backendServiceName = `${backendImageName}-service`

const backendService = new gcp.cloudrun.Service(backendServiceName, {
  location,
  name: backendServiceName,
  template: {
    spec: {
      containers: [
        {
          image: backendImage.imageName,
          ports: [{ containerPort: 8080 }],
          resources: {
            limits: {
              memory: "1Gi",
            },
          },
          envs: [{}],
          livenessProbe: {
            httpGet: {
              path: "/",
              port: 8080,
            },
            initialDelaySeconds: 60, // Increase initial delay for health check
            periodSeconds: 30, // Increase period for health check
          },
        },
      ],
    },
  },
})

const openBackendService = new gcp.cloudrun.IamMember(
  `${backendServiceName}-everyone`,
  {
    service: backendService.name,
    location,
    role: "roles/run.invoker",
    member: "allUsers",
  },
)

export const backendUrl = backendService?.statuses[0]?.url

if (!backendUrl) {
  throw new Error(
    "backendUrl is undefined, did something go wrong with Pulumi or the deployment?",
  )
}

/* ########## Upload & Deploy the Astro Frontend to Google Cloud Run. ########## */

const astroServiceName = `${astroImageName}-service`

const astroService = new gcp.cloudrun.Service(
  astroServiceName,
  {
    location,
    name: astroServiceName,
    template: {
      spec: {
        containers: [
          {
            image: astroImage.imageName,
            ports: [{ containerPort: 4321 }],
            resources: {
              limits: {
                memory: "1Gi",
              },
            },
            envs: [
              {
                name: "PUBLIC_BACKEND_URL",
                value: backendUrl,
              },
            ],
            livenessProbe: {
              httpGet: {
                path: "/",
                port: 4321,
              },
              initialDelaySeconds: 60, // Increase initial delay for health check
              periodSeconds: 30, // Increase period for health check
            },
          },
        ],
      },
    },
  },
  { dependsOn: [backendService] },
)

// Open the service to public unrestricted access
const openAstroService = new gcp.cloudrun.IamMember(
  `${astroServiceName}-everyone`,
  {
    service: astroService.name,
    location,
    role: "roles/run.invoker",
    member: "allUsers",
  },
)

export const astroUrl = astroService?.statuses[0]?.url

if (!astroUrl) {
  throw new Error(
    "astroUrl is undefined, did something go wrong with Pulumi or the deployment?",
  )
}

/* ########## Update the Backend Service with the PUBLIC_FRONTEND_URL ########## */
