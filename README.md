# OmniLog

## Understand your LLM prompts, Empowered by Generative AI

<div align="center">
    <img src="./images/logo.png" alt="LLM-Ops-logo" width="50%"  style="border-radius: 50%; padding-bottom: 20px"/>
</div>

# Overview

[![GitHub last commit](https://img.shields.io/github/last-commit/Theodo-UK/OmniLog)](https://github.com/Theodo-UK/OmniLog/commits)
[![Downloads](https://static.pepy.tech/badge/omnilogger)](https://www.pepy.tech/projects/omnilogger)

Omnilog allows you to easily monitor your LLM project!

1. Simply run our initialisation script on your AWS account
2. Start our listener in your python project,
3. View your logs and analytics in your privately deployed web app!

![image](https://github.com/Theodo-UK/OmniLog/assets/57725347/a494d81d-dab1-4836-8922-efec380c5812)

(For developer setup information, refer to the [Developer Info](#developer-info) section at the bottom of the page)

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
from omnilogger import start_openai_listener

start_openai_listener()

# write your code after calling the listener
...

```

That's it! You should now be able to see your logs at the AWS URI given from `init.sh`. See the [sdk-python docs](/sdk-python/README.md) for more details. To share your project with others, see the [Adding new users](/docs/create_user.md) guide.

# Removing the AWS resources

If you want to remove the AWS resources, then you simply have to call this script:

```bash
./teardown.sh
```

> ⚠️ REMOVAL POLICY:
> By default, AWS does not remove resources like S3 buckets or DynamoDB tables. You will need to modify these manually via the AWS console.

# Help us by contributing

[![Build Status](https://github.com/Theodo-UK/OmniLog/workflows/app-cd/badge.svg)](https://github.com/Theodo-UK/OmniLog/actions)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/YourUsername/YourRepo)

We welcome contributions from the community to help improve OmniLog. You can contribute in the following ways:

Contribute to the Web App by setting up a development environment as outlined in the [Dev-setup](/front/README.md) guide.

Contribute to the Omnilogger pip package by following the guidelines provided in the [Python SDK](/sdk-python/README.md#contributing) documentation.

Your contributions are valuable and greatly appreciated! If you have ideas for improvements, feature requests, or bug reports, please don't hesitate to open an issue or create a pull request.

Thank you for your support in making OmniLog even better!
