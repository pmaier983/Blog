/**
 * Tutorial's followed for the setup of this file:
 * - https://www.pulumi.com/registry/packages/gcp/how-to-guides/gce-webserver/
 */

import * as gcp from "@pulumi/gcp"
import { envSchema } from "./envSchema"

const env = envSchema.parse(process.env)

// Create a network
const network = new gcp.compute.Network("network")

const computeFirewall = new gcp.compute.Firewall("firewall", {
  network: network.id,
  allows: [
    {
      protocol: "tcp",
      ports: ["22"],
    },
  ],
  sourceServiceAccounts: [env.SERVICE_ACCOUNT],
})

// Create a Virtual Machine Instance
const computeInstance = new gcp.compute.Instance("instance", {
  machineType: "e2-micro",
  zone: "us-west2-a",
  bootDisk: {
    initializeParams: {
      image: "debian-11-bullseye-v20241112",
    },
  },
  networkInterfaces: [
    {
      network: network.id,
      // accessConfigs must include a single empty config to request an ephemeral IP
      accessConfigs: [{}],
    },
  ],
})

// Export the name and IP address of the Instance
exports.instanceName = computeInstance.name
exports.instanceIP = computeInstance.networkInterfaces.apply(
  (ni) => ni?.at(0)?.accessConfigs?.at(0)?.natIp,
)
