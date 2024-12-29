# Phillip Maier's Blog V4

Tech/Tools I'm interested in using for this one:

- [FAILED][Bun](https://bun.sh/)
  - Along with [Deno](https://deno.com/) this project attempts to bring speed and coherence to the javascript ecosystem. I chose it over Deno due to its faster speed, and the clarity of vision its [founders brings](https://github.com/Jarred-Sumner).
  - It turns out [bun does not play well with turborepo](https://github.com/vercel/turbo/issues/5982). I transitioned over to [pnpm](https://pnpm.io/) instead.
- [Astro](https://astro.build/)
  - Astro follows in the footsteps of Static site generators such as Gatsby in the same way school children sometimes step in a T-rex footprint at a museum. I also considered using bare bones [Vite](https://vitejs.dev/), but Astro has an [abundance of features](https://docs.astro.build/en/concepts/why-astro/) that I would have had to hook up myself if using Vite, and as I have gotten older I tend to reach for the more complete solutions first, only reaching for more minute control when truly needed.
- [Tailwind](https://tailwindcss.com/)
  - For something small and self contained, such as a personal blog, tailwind is the perfect fit. For anything heavier (anything needing a design system or even a component library) I would start reaching for [Stylex](https://github.com/facebook/stylex).
- [FAILED][PostHog](https://posthog.com/)
  - I needed an alternative to google analytics, and this seemed like the best option!
  - Was unable to get the reverse proxy working and its tagging system is blocked by uBlock Origin.
- [Font - Open Sans](https://fonts.google.com/specimen/Open+Sans)
  - I love [variable fonts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide) that are also very accessible!

## How to Update the site

Change the code and then run `pnpm run destroy-prod` and `pnpm run deploy-prod` in the pulumi-blog package!

## Learnings

Setting up a nice flow from Docker -> ECS -> https Route53 endpoint is annoyingly hard, specifically when it comes to setting up a proper https ssl backend.

ECS is expensive. A simple Docker Cluster ends up costing ~40$/month. 9$ Cloudwatch, 11$ VPC, 17$ ELB.

## TODO

- [x] Add an interactive counter button that increments an "I was here" button, and connects to my db
  - [x] Convert from my custom blog api -> supabase default api
  - [x] Consider switching back to custom blog api if possible
- [x] Setup all infrastructure in Pulumi https://www.pulumi.com/
  - [x] Cleanup the whole DOMAIN and backend env + Pulumi
  - [ ] Properly configure gaulish.io as the dev domain (and make deploying it easy)
  - [ ] Switch to Hetzner when this is fixed: (https://github.com/pulumi/pulumi-hcloud/issues/671)
  - [ ] Switch to use only Ipv6
- [x] How to host? (section below)
- [x] Setup a way to auto build & deploy each app/route
- [ ] Separate deps into required and devDeps
- [x] Build a home page based on some Dalle Mocks
- [x] Properly Configure docker .env
- [x] Create a page that just lists projects
- [x] Create a page that has a bunch of cool links & descriptions
- [ ] Properly configure RLS for supabase (https://supabase.com/docs/guides/database/postgres/row-level-security#row-level-security-in-supabase)
- [ ] Transition to use @total-typescript/tsconfig (https://github.com/total-typescript/tsconfig)
- [ ] Look into keeping deps on the same version (https://turbo.build/repo/docs/crafting-your-repository/managing-dependencies#keeping-dependencies-on-the-same-version)
- [ ] How to avoid adding the ugly `.js` to my file imports in backend-core? (how deep down the build rabbit hole do i want to go)
- [ ] look into using tsup (https://github.com/egoist/tsup) along with tsc.
- [ ] Fill out the Schema's in the astro blog a bit better
- [ ] Update the images used in MainPageLayout (the ones that will also appear in OpenGraph & twitter)
- [ ] Setup posthog
- [ ] Fix the font flicker

### How to host

The goal: host a bunch of docker containers to run each of my blogs web apps.

#### Options:

##### Option 1 - VM:

Host a docker compose cluster on a VM (Heroku, EC2, Droplet, Linode). There is probably a bunch of configuration needed to make all the security and porting work, but this would probably be the cheapest option.

Also I could use something like pulumi as Infrastructure as code?

Negatives

- Expensive at the lowest end (~5-11$/month for really small weak VM's)

Positives

- No cold start problem
- Consistent known price

##### (Rejected) Option 2 - Serverless (A bunch of Separate Docker Containers):

The cold start problem was crazy. Way too slow for any user facing functionality.

Just deploy a bunch of these containers separately? This can be done on any of the big cloud providers: (Digital Ocean App Platform, Google Cloud Run etc?)

Negatives

- Very cheap (On-Demand mode GCP)
- Slightly annoying config possibly
- Slow cold start problem (lead to bad-ish UX)

Positives

- More Expensive if there is actually a ton of traffic (~50$/month/container max)
- Slightly more "modern" then a simple VM

##### (Rejected) Option 3 (K8's):

I can't do it. A personal blog is not a good reason to learn k8's...

##### (Rejected) Option 4 (AWS & ECS):

This worked but ended up costing me 40$ per month. Just not worth it for a blog, I mean really

### How to handle SSL/TLS traffic

So to actually get an https domain I need to have a certificate or something that provides me the certificate through one or another route

#### Option 1 (Nginx):

Most custom option, probably also requiring the most setup. Nginx is the go to reverse proxy, and probably lives under the hood of the other two options in some form.

#### (Rejected) Option 2 (GCP LB):

A LB for a single VM is overkill, but it seems like GCP charges based on use. Probably the most expensive of the options.

#### (Rejected) Option 3 (Cloudflare):

Also a bit overkill, but I get things like DDoS protection and its free! Also works as a CDN, which could speedup interactions with users.

### Transition from gaulish.io -> phillipmaier.com

- [x] Point astro-blog towards phillipmaier.com not gaulish.io

Consider Also building the blog using (as an experiment):

- Remix
- Svelte
- Vue
- SolidJS
- HTMX
- Quick 2

# OLD info from when this site was hosted on ECS

## How to Update the site

1. Make local changes to the codebase

2. run `docker:build:push` (\*this pushes the changes to the ECR images on aws)

3. Go to [this link](https://us-east-1.console.aws.amazon.com/ecs/v2/task-definitions/blog-services/9/containers?region=us-east-1) and click `Create new revision` (\*no changes are needed)

4. Then click `Deploy` and `update service` on the same page.

## Push a single Docker image to ECR (This assumes I'm use us-east-1)

1. Login aws ECR (Elastic Container Registry)

- https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html
- `aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin __INPUT_AWS_ACCOUNT_ID__.dkr.ecr.us-east-1.amazonaws.com`

2. Tag the specific image to be uploaded to ECR

- `docker tag __IMAGE_ID__ __INPUT_AWS_ACCOUNT_ID__.dkr.ecr.us-east-1.amazonaws.com/private-docker-images:__TAG__`

3. Push the image to the private ECR repo

- `docker push __INPUT_AWS_ACCOUNT_ID__.dkr.ecr.us-east-1.amazonaws.com/private-docker-images:__TAG__`
