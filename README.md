# OmniLog 
## Understand your LLM prompts, Empowered by Generative AI

<div align="center">
    <img src="./images/logo.png" alt="LLM-Ops-logo" width="50%"  style="border-radius: 50%; padding-bottom: 20px"/>
</div>

# Quickstart

Get started with OmniLog in five easy steps:

1. Ensure you have an AWS account with a user that has the necessary permissions to bootstrap our project into your AWS. [You can check & follow the steps here to do that](/docs/aws_setup.md).

2. Configure a Postgres database:
- We recommend [Neon](https://neon.tech/) for an simple setup with a very generous free tier. You will need the connection string later e.g:

<div align="center">
    <img src="./images/connection_details.avif" alt="LLM-Ops-logo" width="100%"/>
</div>

3. Third, clone our repository:

```bash
git clone https://github.com/Theodo-UK/OmniLog.git
```

4. Bootstrap the project onto your AWS:

```bash
./init.sh
```
And follow the prompts within the script.

5. Use the Python SDK inside your LLM project:
```python
from omnilog import init, log

...TBD
```
That's it! You should now be able to navigate to Navigate to the AWS uri given from `init.sh` and see your prompts via the log explorer.


# Developer Info
### Table of Contents
1. [Front docs](/front/README.md)
2. [Python SDK](/sdk-python/README.md)