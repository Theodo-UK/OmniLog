To test the end-to-end flow of the set up process for a new user, follow these steps on a fresh AWS account:

1. In a temporary folder, run the following commands to get the latest code with no environment config
```
rm -rf OmniLog/
git clone https://github.com/Theodo-UK/OmniLog.git
cd OmniLog/
```
2. Then init the project
```
bash init.sh
```
3. Perform your functional review or validation.

4. Teardown the resources to ensure the next person has a clean AWS account to test on
```
bash teardown.sh
```
