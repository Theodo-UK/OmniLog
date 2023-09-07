This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This project uses [sst](https://docs.sst.dev/what-is-sst), so we're using the SST local development flow [described here](https://docs.sst.dev/live-lambda-development).

These steps are for devs who want to contribute to Omnilog, if you want to use Omnilog, follow the instructions [here](https://github.com/Theodo-UK/OmniLog#quickstart).

### 1. Get Next.js app running locally

If you are developing the website without the external resources, e.g using dummy data and don't want to setup the AWS stack, use this option.

-   `yarn` to install dependencies.
-   `yarn local` to start the next web app locally.

If you click the localhost URL in the console, you should see the Next.js app running. If you are on a route which relies on external resources, you will encounter errors because it is not hooked up to your AWS lambdas; follow the next steps to get that set up!

### 2. Set up local AWS credentials

Having AWS credentials on your local machine is required to use SST.

You can see the [steps required to add AWS credentials here.](/docs/aws_setup.md)

### 3. Add database URI to .env

Create the following env files:
```
// .env (used for yarn seed)
DATABASE_URL=<your_database_uri>?pgbouncer=true
NEXTAUTH_SECRET=secret
NEXTAUTH_URL=http://localhost:3000
```
```
// .env.development (used for yarn sst dev)
AWS_PROFILE_NAME=<your_aws_profile_name>
SST_STAGE_NAME=<your_name>-dev
DATABASE_URL=<your_database_uri>?pgbouncer=true
NEXTAUTH_SECRET=secret
NEXTAUTH_URL=http://localhost:3000
```
```
// .env.production (used for yarn sst deploy)
AWS_PROFILE_NAME=<your_aws_profile_name>
SST_STAGE_NAME=staging
DATABASE_URL=<your_database_uri>?pgbouncer=true
NEXTAUTH_SECRET=<>
NEXTAUTH_URL=<>
```

Note that `?pgbouncer=true` is required at the end of DATABASE_URL ([see issue](https://github.com/prisma/prisma/issues/11643#issuecomment-1034078942)):

### 4. Build Next.js app into Lambdas and deploy them locally

-   `yarn dev_sst` to start the Live Lambda Development environment.
    -   This command does the following:
        -   Starts a local Lambda environment
        -   Builds the Next.js app into lambda functions,
        -   and deploys them to the local Lambda environment

### 6. Bind Next.js app to local Lambda environment so that it can invoke AWS resources

-   `yarn dev` to bind the Next.js app to sst, which allows it to invoke AWS resources.
    -   This command does the following:
        -   Starts the Next.js app at localhost
        -   Binds the Next.js app to the local Lambda environment (therefore allowing it to use AWS resources)

## Deploying to staging

-   `yarn sst deploy --profile <aws_iam_access_key_profile_name> --stage staging`
