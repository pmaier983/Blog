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
import { execSync } from "child_process"

const env = envSchema.parse(process.env)

const instanceTag = "blog"

const astroImageName = `astro-blog`
const backendImageName = `blog-backend`

/* ############### Deploy both docker images ###############*/

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

export const backendImageUrn = backendImage.urn

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

export const astroImageUrn = astroImage.urn

// Create a new network for the virtual machine.
const network = new gcp.compute.Network("network", {
  autoCreateSubnetworks: false,
})

// Create a subnet on the network.
const subnet = new gcp.compute.Subnetwork("subnet", {
  ipCidrRange: "10.0.1.0/24",
  network: network.id,
})

// Create a firewall allowing inbound access over ports 80 (for HTTP) and 22 (for SSH).
const firewall = new gcp.compute.Firewall("firewall", {
  network: network.selfLink,
  allows: [
    {
      protocol: "tcp",
      /**
       * 22 - ssh port
       * 80 - http port (service port?)
       * 8080 - backend API port
       * 4321 - astro frontend port
       */
      ports: ["22", "80", "8080", "4321"],
    },
  ],
  direction: "INGRESS",
  sourceRanges: ["0.0.0.0/0"],
  targetTags: [instanceTag],
})

const envContent = Object.entries(env)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n")

// Function to get the current Git branch
const currentGitBranch = (() => {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD").toString().trim()
  } catch (error) {
    throw new Error(
      "Failed to detect Git branch. Make sure you are in a valid Git repository.",
    )
  }
})()

// TODO: ensure this clone works after merging in to main!
// Define a script to be run when the VM starts up.
const metadataStartupScript = `#!/bin/bash
set -e

WORK_DIR="/home/phillipmaier"
mkdir -p $WORK_DIR
cd $WORK_DIR

# Clone the repository
git clone --branch ${currentGitBranch} https://github.com/pmaier983/Blog.git
cd Blog

PUBLIC_FRONTEND_URL=$(curl -H "Metadata-Flavor: Google" \
    "http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip")

# Write the .env & .env.prod file
cat <<EOF > .env.prod
${envContent}
PUBLIC_FRONTEND_URL=\${PUBLIC_FRONTEND_URL}
EOF

cat <<EOF > .env
${envContent}
PUBLIC_FRONTEND_URL=\${PUBLIC_FRONTEND_URL}
EOF

# Add an alias for Docker Compose
echo alias docker-compose="'"'docker run --rm \\
    -v /var/run/docker.sock:/var/run/docker.sock \\
    -v "$PWD:$PWD" \\
    -w="$PWD" \\
    docker/compose:latest'"'" >> ~/.bashrc

# Pull Docker Compose container image
docker pull docker/compose:latest

# Source the updated bashrc to enable the alias
source ~/.bashrc
`

// Create the virtual machine.
const instance = new gcp.compute.Instance(
  "instance",
  {
    name: env.INSTANCE_NAME,
    zone: env.ZONE,
    // TODO: change to an e2 machine after dev
    // https://cloud.google.com/compute/all-pricing
    machineType: "n2-standard-2",
    bootDisk: {
      initializeParams: {
        image: "cos-cloud/cos-117-18613-75-37",
      },
    },
    networkInterfaces: [
      {
        network: network.id,
        subnetwork: subnet.id,
        accessConfigs: [{}],
      },
    ],
    serviceAccount: {
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    },
    allowStoppingForUpdate: true,
    metadataStartupScript,
    tags: [instanceTag],
  },
  { dependsOn: firewall },
)

const instanceIP = instance.networkInterfaces.apply((interfaces) => {
  return interfaces?.[0]?.accessConfigs?.[0]?.natIp
})

// Export the instance's name, public IP address, and HTTP URL.
export const name = instance.name
export const ip = instanceIP
