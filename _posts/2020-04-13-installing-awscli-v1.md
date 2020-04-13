---
layout: post
title:  "Installing the AWS CLI Version 1 on Mac OS with Homebrew"
date:   2020-04-13 19:33:00 -0400
categories: blog
---

Ah, nothing like a breaking change.  On February 10th, 2020 the AWS CLI v2 become [generally available](https://aws.amazon.com/blogs/developer/aws-cli-v2-is-now-generally-available/).  While there are many improvements, there are changes that hapened to break a critical development worflow at my company.  This required new engineers to install v1 of the AWS CLI while waiting on the workflow to be updated.  

This meant we had to find a way to install the older AWS CLI version.  I encourage every engineer to manage their Mac with [Homebrew](https://brew.sh/) - it's the best way to install programs on Mac.  Unfortunately in this situation, the [AWS CLI was updated in Homebrew](https://github.com/Homebrew/homebrew-core/commit/ff55e19b8d6093076957c9d56deab4bc873ed4d8) to default to v2.  And curiously, the AWS instructions for [downgrading your AWS CLI to v1](https://aws.amazon.com/blogs/developer/aws-cli-v2-is-now-generally-available/) are missing any Homebrew installation instructions.  So here are the missing instructions.

### Getting Homebrew Ready
First, check if you have Homebrew installed:
```bash
brew --version
```
If you get a version number, you have Homebrew installed and you can skip this section.  Otherwise if you see `-bash: brew: command not found`, Homebrew is not installed and we need to install it.

To Install Homebrew, paste the below snippet into your terminal and run it:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
If you run into any issue during the above installation, please refer to the [Homebrew troubleshooting guide](https://docs.brew.sh/Troubleshooting).

### Installing the AWS CLI v1
Once Homebrew is installed we can use it to install the AWS CLI.

We can install the v1 version of the AWS CLI by locking the version with `@1`.  [This StackOverflow post](https://stackoverflow.com/questions/3987683/homebrew-install-specific-version-of-formula/4158763#4158763) has more information about Homebrew versioning.
```bash
brew install awscli@1
```
In case you've previously installed a different version of the AWS CLI, explicitly set Homebrew to use v1:
```bash
brew link awscli@1 --force
```
Small disclaimer - if you have other local tool which depend on the AWS CLI (which is unlikely), this may cause problems for you.

Now to verify it's working, run the following:
```bash
aws --version
```
If everything worked correctly, you should see `aws-cli/1.18.20` in the response.

Then you're good to go!  As always, feel free to [drop me an email]({% link standing-invitation.md %}) if you have a problem.