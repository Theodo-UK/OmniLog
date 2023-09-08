# OmniLog 

## Understand your LLM prompts, Empowered by Generative AI

<div align="center">
    <img src="./images/logo.png" alt="LLM-Ops-logo" width="50%"  style="border-radius: 50%; padding-bottom: 20px"/>
</div>

# Overview

Omnilog allows you to easily monitor your LLM project! 
1. Simply run our initialisation script on your AWS account
2. Start our listener in our python project, 
3. View your logs and analytics in your privately deployed web app! 

![image](https://github.com/Theodo-UK/OmniLog/assets/57725347/a494d81d-dab1-4836-8922-efec380c5812)

# Quickstart

Get started with OmniLog in five easy steps:

1. Ensure you have an AWS account with a user that has the necessary permissions to bootstrap our project into your AWS. [You can check & follow the steps here to do that](/docs/aws_setup.md).

2. Configure a Postgres database:
- We recommend [Neon](https://neon.tech/) for an simple setup with a very generous free tier. You will need the connection string later (This can be found on the homepage after creating your Neon project) e.g:

<div align="center">
    <img src="./images/connection_details.avif" alt="LLM-Ops-logo" width="100%"/>
</div>

3. Third, clone our repository:

```bash
git clone https://github.com/Theodo-UK/OmniLog.git
```

4. Bootstrap the project onto your AWS by running the following script:
```bash
bash ./init.sh
```

5. Once finished, you should see a `SiteUrl` in your terminal. Copy it, navigate to ./front/.env.production and paste it in the NEXTAUTH_URL property.

6. Run the `init.sh` script again, and skip the configuring of the .env files to deploy your web app properly.

7. Use the Python SDK inside your LLM project:
```python
from omnilog import init, log

...TBD
```
That's it! You should now be able to see your logs at the AWS URI given from `init.sh`.

# Removing the AWS resources

If you want to remove the AWS resources, then you simply have to call this script:
```bash
./teardown.sh
```

>⚠️ REMOVAL POLICY:
By default, AWS does not remove resources like S3 buckets or DynamoDB tables. You will need to modify these manually via the AWS console.

# Developer Info
### Table of Contents
1. [Front docs](/front/README.md)
2. [Python SDK](/sdk-python/README.md)
3. [Adding new users](/docs/create_user.md)
