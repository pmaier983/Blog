import * as gcp from "@pulumi/gcp"
import * as pulumi from "@pulumi/pulumi"

const config = new pulumi.Config()

const REGION = config.require("region")
const ZONE_NAME = config.require("zoneName")

const INSTANCE_TAG = "blog"

const staticIP = new gcp.compute.Address("static-ip", {
  name: "blog-static-ip",
  region: REGION,
})

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
       * 443 - HTTPS port
       * 8080 - backend API port
       * 4321 - astro frontend port
       */
      ports: ["22", "80", "443", "8080", "4321"],
    },
  ],
  direction: "INGRESS",
  sourceRanges: ["0.0.0.0/0"],
  targetTags: [INSTANCE_TAG],
})

export const staticIpAddress = staticIP.address

export const networkId = network.id

export const subnetId = subnet.id

export const firewallId = firewall.id

const aRecord = new gcp.dns.RecordSet("gaulish-root-record", {
  name: "gaulish.io.",
  type: "A",
  ttl: 300,
  managedZone: ZONE_NAME,
  rrdatas: [staticIpAddress],
})

const wwwCnameRecord = new gcp.dns.RecordSet("gaulish-www-record", {
  name: "www.gaulish.io.",
  type: "CNAME",
  ttl: 300,
  managedZone: ZONE_NAME,
  rrdatas: ["gaulish.io."],
})