This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This project uses [sst](https://docs.sst.dev/what-is-sst), so we're using the SST local development flow [described here](https://docs.sst.dev/live-lambda-development).

SST is a tool that makes it easy for us to run our nextJS web app via AWS lamdas.

### Setting Up AWS

Having an AWS account is a requirement for local development, as we want to proxy the lambda as much as we can!

Requirements:
- AWS account.
- Permissions with IAM setup to deploy a lambda function.

To do the above, [follow this tutorial](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file).

### Local development

`yarn` to install dependencies.

`npx sst dev` to start the Live Lambda Development environment.
> The first time you run this, it'll deploy your app to AWS. This can take a couple of minutes.

The starter deploys a Lambda function with an API endpoint. You'll see something like this in your terminal.

```
Outputs:
  ApiEndpoint: https://s8gecmmzxf.execute-api.us-east-1.amazonaws.com
```

If you head over to the endpoint, it'll invoke the Lambda function in packages/functions/src/lambda.js. You can try changing this file and hitting the endpoint again. You should see your changes reflected right away.

`yarn dev` to start the NextJS app locally. sst being started is a prerequisite.