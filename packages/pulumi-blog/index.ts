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

import { execSync } from "child_process"

const gcpConfig = new pulumi.Config("gcp")
const ZONE = gcpConfig.require("zone")

const config = new pulumi.Config()
const INSTANCE_NAME = config.require("instanceName")
const INSTANCE_TAG = config.require("instanceTag")

const stackReference = new pulumi.StackReference(
  // <organization>/<project>/<stack>
  `pmaier983/pulumi-blog-infra/dev`,
)

// TODO: is there a way to properly type these outputs?
const networkId = stackReference.getOutput("networkId")
const subnetId = stackReference.getOutput("subnetId")
const staticIpAddress = stackReference.getOutput("staticIpAddress")

// TODO: get the docker deploy working!

const envContent = Object.entries(process.env)
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

# Fetch the public IP address of the instance
PUBLIC_IP=$(curl -H "Metadata-Flavor: Google" \
    "http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip")

# Write the .env & .env.prod file
cat <<EOF > .env.prod
${envContent}
PUBLIC_FRONTEND_URL=http://\${PUBLIC_IP}:4321
PUBLIC_BACKEND_API_URL=http://\${PUBLIC_IP}:8080/trpc
EOF

cat <<EOF > .env
${envContent}
PUBLIC_FRONTEND_URL=http://\${PUBLIC_IP}:4321
PUBLIC_BACKEND_API_URL=http://\${PUBLIC_IP}:8080/trpc
EOF

# run docker-compose up in detached mode (in the background)
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock -v "$PWD:$PWD" -w="$PWD" docker/compose:1.27.4 up -d
`

// Create the virtual machine.
const instance = new gcp.compute.Instance("instance", {
  name: INSTANCE_NAME,
  zone: ZONE,
  // TODO: change to an e2 machine after dev (e2-micro does not work, e2-small does)
  // Use n2-standard-2 for standard dev work (its a bit faster and worth the cost)
  // https://cloud.google.com/compute/all-pricing
  machineType: "n2-standard-2",
  bootDisk: {
    initializeParams: {
      image: "cos-cloud/cos-117-18613-75-37",
    },
  },
  networkInterfaces: [
    {
      network: networkId,
      subnetwork: subnetId,
      accessConfigs: [
        {
          natIp: staticIpAddress, // Use the reserved static IP
        },
      ],
    },
  ],
  serviceAccount: {
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  },
  allowStoppingForUpdate: true,
  metadataStartupScript,
  tags: [INSTANCE_TAG],
})

const instanceIP = instance.networkInterfaces.apply((interfaces) => {
  return interfaces?.[0]?.accessConfigs?.[0]?.natIp
})

// Export the instance's name, public IP address, and HTTP URL.
export const name = instance.name
export const ip = instanceIP
export const httpUrl = pulumi.interpolate`http://${instanceIP}:4321`
