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

const imageName = "astro-blog"

/* ########## Upload the docker images to Google Cloud Registry. ########## */

const astroBlogImage = new docker.Image(imageName, {
  imageName: pulumi.interpolate`gcr.io/${gcp.config.project}/${imageName}:latest`,
  build: {
    context: "../../",
    dockerfile: "../../apps/astro-blog/Dockerfile",
    platform: "linux/amd64",
    args: env,
  },
})

// add a unique ID to ensure the service updates
const serviceName = `${imageName}-service`
const location = "us-west2"

/* ########## Deploy the Docker image to Google Cloud Run. ########## */

// Deploy to Cloud Run if there is a difference in the sha, denoted above.
const astroService = new gcp.cloudrun.Service(serviceName, {
  location,
  name: serviceName,
  template: {
    spec: {
      containers: [
        {
          image: astroBlogImage.imageName,
          ports: [{ containerPort: 4321 }],
          resources: {
            limits: {
              memory: "1Gi",
            },
          },
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
})

// Open the service to public unrestricted access
const openAstroService = new gcp.cloudrun.IamMember(`${imageName}-everyone`, {
  service: astroService.name,
  location,
  role: "roles/run.invoker",
  member: "allUsers",
})

export const astroUrl = astroService?.statuses[0]?.url
