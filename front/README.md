This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This project uses [sst](https://docs.sst.dev/what-is-sst), so we're using the SST local development flow [described here](https://docs.sst.dev/live-lambda-development).

SST is a tool that makes it easy for us to build, run and deploy our NextJS web app with AWS.

### 1. Get Next.js app running locally

If you are developing the website without the external resources, e.g using dummy data and don't want to setup the AWS stack, use this option.

- `yarn` to install dependencies.
- `yarn local` to start the next web app locally.

If you click the localhost URL in the console, you should see the Next.js app running.
### 2. Set up local AWS credentials

Having AWS credentials on your local machine is required to use SST.

- [Check that you have an access key and secret key in your ~/.aws/credentials file for the AWS account you are intending to deploy on](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file)
   ```
   e.g.
   [aws_iam_access_key_profile_name]
   aws_access_key_id=<SOME_KEY>
   aws_secret_access_key=<SOME_KEY>
   ```
  - If you do not have a credentials file, or if you are missing the keys for the account you want to deploy on,
    - [Go to AWS console and create an IAM user with permissions to deploy a lambda function](https://sst.dev/chapters/create-an-iam-user.html)
    - [and update your credentials file](https://sst.dev/chapters/configure-the-aws-cli.html)
  - If you have MFA installed, you will need an mfa profile in your credentials file
  ```
  e.g.
  [mfa]
  aws_access_key_id=<SOME_KEY>
  aws_secret_access_key=<SOME_KEY>
  aws_session_token=<SOME_KEY>
  ```
    - If you do not have an mfa profile, we recommend using Leapp
      - [Install Leapp](https://docs.leapp.cloud/latest/installation/install-leapp/)
      - [Follow video tutorial on adding AWS IAM User session](https://docs.leapp.cloud/latest/configuring-session/configure-aws-iam-user/)

If you completed this step correctly, you should be able to run `aws sts get-caller-identity --profile aws_iam_access_key_profile_name` and see your AWS account ID.
### 3. Build Next.js app into Lambdas and deploy them locally

- `npx sst dev --profile aws_iam_access_key_profile_name` to start the Live Lambda Development environment.
  - This command does the following:
    - Starts a local Lambda environment
    - Builds the Next.js app into lambda functions, 
    - and deploys them to the local Lambda environment

### 4. Bind Next.js app to local Lambda environment so that it can invoke AWS resources

- `yarn dev --profile aws_iam_access_key_profile_name` to bind the Next.js app to sst, which allows it to invoke AWS resources.
  - This command does the following:
    - Starts the Next.js app at localhost
    - Binds the Next.js app to the local Lambda environment (therefore allowing it to use AWS resources)

