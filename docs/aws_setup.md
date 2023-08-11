# AWS setup

Having AWS credentials on your local machine is required to bootstrap the project onto your AWS organisation.

- [Check that you have an access key and secret key in your ~/.aws/credentials file for the AWS account you are intending to deploy on](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file)
   ```
   e.g.
   [aws_iam_access_key_profile_name]
   aws_access_key_id=<SOME_KEY>
   aws_secret_access_key=<SOME_KEY>
   ```
  - If you do not have a credentials file, or if you are missing the keys for the account you want to deploy on,
    1) [Go to AWS console and create an IAM user with permissions to deploy a lambda function](https://sst.dev/chapters/create-an-iam-user.html) (This will need to be done by an admin inside your AWS organisation.)
    2) [Update or create your credentials file locally](https://sst.dev/chapters/configure-the-aws-cli.html)

- If you are using MFA (Multi Factor Authentication) policies, you will need an mfa profile in your credentials file, e.g:
  ```js
  [mfa]
  aws_access_key_id=<SOME_KEY>
  aws_secret_access_key=<SOME_KEY>
  aws_session_token=<SOME_KEY>
  ```
    - While MFA isn't compulsory, we strongly recommend it is setup for any accounts with permissions to deploy this infrastructure.
    - We recommend using Leapp, a GUI to handle AWS profile switching
      - [Install Leapp](https://docs.leapp.cloud/latest/installation/install-leapp/)
      - [Follow video tutorial on adding AWS IAM User session](https://docs.leapp.cloud/latest/configuring-session/configure-aws-iam-user/)

If you completed this step correctly, you should be able to run `aws sts get-caller-identity --profile aws_iam_access_key_profile_name` and see your AWS account ID.