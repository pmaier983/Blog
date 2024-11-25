/**
 * Tutorials & Docs followed for the setup of this file:
 * - https://www.pulumi.com/registry/packages/gcp/how-to-guides/gce-webserver/
 * - https://github.com/pulumi/templates/blob/master/vm-gcp-typescript/index.ts
 */

import * as gcp from "@pulumi/gcp"
import * as pulumi from "@pulumi/pulumi"

import { envSchema } from "./envSchema"

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

// Define a script to be run when the VM starts up.
const metadataStartupScript = `#!/bin/bash
    echo '<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Hello, world!</title>
    </head>
    <body>
        <h1>Hello, world! 👋</h1>
        <p>Deployed with 💜 by <a href="https://pulumi.com/">Pulumi</a>.</p>
    </body>
    </html>' > index.html
    sudo python3 -m http.server ${SERVICE_PORT} &`

// Create the virtual machine.
const instance = new gcp.compute.Instance(
  "instance",
  {
    name: env.INSTANCE_NAME,
    zone: env.ZONE,
    machineType: "e2-micro",
    bootDisk: {
      initializeParams: {
        image: "debian-11",
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
