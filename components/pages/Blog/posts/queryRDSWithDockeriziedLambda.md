---
title: "How to query an RDS instance using a containerized lambda (written in Typescript)"
description: "With the release of containerized lambdas, its now easier then ever to handle complex tasks!"
publishTime: "12-14-2020"
modifiedTime: "12-14-2020"
authors:
  - Phillip Maier
tags:
  - aws
  - Docker
  - aws lambda
  - Container
bannerPath: /PostBackgrounds/lambda.png
bannerPlaceholderPath: /PostBackgrounds/lambda-Placeholder.png
bannerCredit: Unknown
bannerDescription: A picture of the aws lambda logo
---

Hello friendly reader!

You may have been watching aws [re:Invent](https://reinvent.awsevents.com/) like I was this month (December 2020), and you may have seen that it is now possible to use a containerized docker image in place of a .zip file when creating lambdas!

This is a great change for a number of reasons, the two largest of which are:

- You can now upload containers with up to 10GB of size (zip only handles 50MB!)
- All the other benefits that come with using containers: customizability, reliability etc.

If you want to know more, take a look at the blog post [here](https://aws.amazon.com/blogs/aws/new-for-aws-lambda-container-image-support/).

Anyways lets get down to it shall we?

## The Code

In my case, I was connecting to a PostgresSQL database on RDS, but this example should be easily portable to another RDS database by changing which client library you use.

My file structure is as follows (my `.env` file is hidden at the root of the structure `./env`)

![File Structure](/PostImages/lambdaFileStructure.png)

### // app.ts

```ts
import { Client } from "pg" // replace this with another library if not using PostgresSQL

export const lambdaHandler = async (event: { query?: string }) => {
  // replace this query with any query, or pass it in as an event like above^
  const query = "SELECT * FROM public.tile"
  const client = new Client({
    user: process.env.RDS_USER,
    host: process.env.RDS_HOST,
    database: process.env.RDS_DATABASE,
    password: process.env.RDS_PASSWORD,
    port: parseInt(process.env.RDS_PORT, 10),
  })
  client.connect()
  try {
    const res = await client.query(query)
    return res
  } catch (err) {
    console.log(err)
  } finally {
    client.end()
  }
}

if (process?.argv?.indexOf("isTesting") !== -1) {
  try {
    ;(async () => {
      console.log(await lambdaHandler())
    })()
  } catch (err) {
    console.log("the Error", err)
    throw new Error(err)
  }
}
```

### // package.json

```json
{
  "name": "**NAME_OF_LAMBDA**",
  "version": "1.0.0",
  "description": "Run a SQL query on RDS",
  "author": "Phillip Maier",
  "license": "MIT",
  "dependencies": {
    "pg": "^8.5.1"
  },
  "config": {
    "env_path": "../../../../.env" // The path to your .env
  },
  "scripts": {
    "dev": "tsnd -r dotenv/config --respawn src/app.ts dotenv_config_path=${PWD}/$npm_package_config_env_path -- isTesting ",
    "build": "tsc",
    "docker:build": "docker build -t **DKR_NAME** .",
    "docker:dev": "docker run --rm --env-file=$npm_package_config_env_path --name **DKR_NAME** -p 9000:8080 **DKR_NAME**",
    "dev:docker": "npm run build && npm run docker:build && npm run docker:dev",
    "ecr:init": "dotenv -e $npm_package_config_env_path -- cross-var aws ecr get-login-password --region %AWS_REGION% | docker login --username AWS --password-stdin %AWS_ACCOUNT_NUMBER%.dkr.ecr.%AWS_REGION%.amazonaws.com && aws ecr create-repository --repository-name **DOCKER_IMAGE_NAME** --image-scanning-configuration scanOnPush=true --image-tag-mutability MUTABLE",
    "ecr:tag": "dotenv -e $npm_package_config_env_path -- cross-var docker tag **DKR_NAME**:latest %AWS_ACCOUNT_NUMBER%.dkr.ecr.%AWS_REGION%.amazonaws.com/**DKR_NAME**:latest",
    "ecr:push": "dotenv -e $npm_package_config_env_path -- cross-var docker push %AWS_ACCOUNT_NUMBER%.dkr.ecr.%AWS_REGION%.amazonaws.com/**DKR_NAME**:latest",
    "deploy": "npm run ecr:tag && npm run ecr:push"
  },
  "devDependencies": {
    "@types/aws-lambda": "^8.10.51",
    "@types/node": "^13.13.5",
    "@types/pg": "^7.14.7",
    "aws-sdk": "^2.655.0",
    "cross-var": "^1.1.0",
    "dotenv": "^8.2.0",
    "dotenv-cli": "^4.0.0",
    "ts-node-dev": "^1.1.1",
    "typescript": "^3.8.3"
  }
}
```

### // tsconfig.json

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES2017",
    "noImplicitAny": true,
    "preserveConstEnums": true,
    "outDir": "./build",
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

### // Dockerfile

```Dockerfile
FROM amazon/aws-lambda-nodejs:12

COPY build/app.js build/app.js.map package*.json ./

RUN npm install

CMD [ "app.lambdaHandler" ]
```

### // .env

```env
AWS_ACCOUNT_NUMBER=**YOUR_ACCOUNT_NUMBER**
AWS_REGION=**YOUR_REGION**
RDS_USER=**YOUR_USERNAME**
RDS_HOST=**YOUR_HOST_URL**
RDS_DATABASE=**YOUR_DB_NAME**
RDS_PASSWORD=**YOUR_DB_MASTER_PASSWORD**
RDS_PORT=**YOUR_DB_PORT**
```

Now follow these steps:

1. `cd aws/lambda/**YOUR_LAMBDA_NAME**`
2. `npm i` // install node_modules
3. `npm run build && npm run docker:build` // compile TS and build docker image
4. `npm run ecr:init` // this authorizes the docker cli to your AWS ECR registry and creates a ecr Repo
5. `npm run deploy` // tag and push the image to aws ecr
6. go to aws and use the container as the base for a lambda
7. don't forget to add the .env variables to the lambda as well!
8. All done!

If you have any questions about anything, feel free to email (pmaier983@gmail.com) or contact me in any way! I'm happy to help how I can!
