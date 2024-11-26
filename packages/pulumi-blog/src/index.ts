/**
 * Tutorials & Docs followed for the setup of this file:
 * - https://www.pulumi.com/registry/packages/gcp/how-to-guides/gce-webserver/
 * - https://github.com/pulumi/templates/blob/master/vm-gcp-typescript/index.ts
 */

import * as gcp from "@pulumi/gcp"
import * as pulumi from "@pulumi/pulumi"

import { envSchema } from "./envSchema"
import { execSync } from "child_process"

const env = envSchema.parse(process.env)

const instanceTag = "webserver"
const SERVICE_PORT = "80"

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
      ports: ["22", SERVICE_PORT, "8080", "4321"],
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

# Write the .env file
cat <<EOF > .env
${envContent}
EOF

# run docker compose up
# docker run --rm -v "$PWD:$PWD" -w "$PWD" docker/compose:latest up
`

// Create the virtual machine.
const instance = new gcp.compute.Instance(
  "instance",
  {
    name: env.INSTANCE_NAME,
    zone: env.ZONE,
    machineType: "e2-micro",
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
export const url = pulumi.interpolate`http://${instanceIP}:${SERVICE_PORT}`
