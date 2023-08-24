This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This project uses [sst](https://docs.sst.dev/what-is-sst), so we're using the SST local development flow [described here](https://docs.sst.dev/live-lambda-development).

SST is a tool that makes it easy for us to build, run and deploy our NextJS web app with AWS.

### 1. Get Next.js app running locally

If you are developing the website without the external resources, e.g using dummy data and don't want to setup the AWS stack, use this option.

-   `yarn` to install dependencies.
-   `yarn local` to start the next web app locally.

If you click the localhost URL in the console, you should see the Next.js app running.

### 2. Set up local AWS credentials

Having AWS credentials on your local machine is required to use SST.

You can see the [steps required to add AWS credentials here.](/docs/aws_setup.md)

If you completed these steps correctly, you should be able to run `aws sts get-caller-identity --profile <aws_iam_access_key_profile_name>` and see your AWS account ID.

### 3. Add database URI to .env

It should look like this, with `?pgbouncer=true` at the end ([see issue](https://github.com/prisma/prisma/issues/11643#issuecomment-1034078942)):
`DATABASE_URL=<your_database_uri>?pgbouncer=true`

### 4. Set up local database

Generate prisma types with `yarn generate`

### 5. Build Next.js app into Lambdas and deploy them locally

-   `yarn sst dev --profile <aws_iam_access_key_profile_name> --stage <your_name>-dev` to start the Live Lambda Development environment.
    -   This command does the following:
        -   Starts a local Lambda environment
        -   Builds the Next.js app into lambda functions,
        -   and deploys them to the local Lambda environment

### 6. Bind Next.js app to local Lambda environment so that it can invoke AWS resources

-   `yarn dev --profile <aws_iam_access_key_profile_name> --stage <your_name>-dev` to bind the Next.js app to sst, which allows it to invoke AWS resources.
    -   This command does the following:
        -   Starts the Next.js app at localhost
        -   Binds the Next.js app to the local Lambda environment (therefore allowing it to use AWS resources)

## Deploying to staging

-   `yarn sst deploy --profile <aws_iam_access_key_profile_name> --stage staging`
