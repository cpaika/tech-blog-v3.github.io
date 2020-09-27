---
layout: post
title:  "Running COBOL on AWS Lambda"
description: "Walkthrough of running a 60 year old programming language on AWS Lambda and returning the response via an API"
date:   2020-09-27 12:05:00 -0400
categories: blog
tags: aws lambda cobol api-gateway serverless
---

Today let's walk through the process of running COBOL code on AWS Lambda.  While it may seem strange, it's a great way to pull back the curtains and see how AWS Lambda works.  All the code in this walkthrough is available [here](https://github.com/cpaika/hello-world-cobol-lambda) on Github.

COBOL stands for 'Common Business Oriented Language'.  It was designed in 1959, inspired by Grace Hopper's work on FLOW-MATIC and IBM's COMTRAN.  It was created primarily for business use cases and is focused on having an English like syntax.  

Even 60 years after its creation, COBOL is still heavily used in banking and government.  That's a huge success for a programming language!  In fact during the pandemic several states have been recruiting engineers experienced with COBOL to maintain their legacy unemployment systems dealing with the surge in traffic.  While it can be easy to ignore as it's not considered modern, COBOL remains an incredibly important programming language. 

Where this gets interesting is at AWS re:Invent 2018, when AWS released the Lambda Runtime API.  This allows developers to bring any language runtime they want to run on AWS Lambda.  Curiously, they released day one support for running COBOL Lambda functions.

While running a 60 year old language in Lambda functions feels like the world's largest antipattern, let's give it a try.  I'm going to cover implementing an AWS API Gateway that invokes a Lambda function on a GET request.  The Lambda function then runs COBOL code to return 'Hello World' to the user.  Let's see how it goes! 

### Getting it Running Locally

First, let's get a 'Hello World' COBOL application running on our local machine.

To start, we need to install a COBOL compiler.  As COBOL is an enterprise language, most of the compilers come at an 'enterprise cost'.  Far outside of my budget.  Luckily there is GnuCOBOL - a free implementation of a COBOL compiler that is up to date with the COBOL 2014 specification.  Yes, COBOL was updated in 2014! 

GnuCOBOL works by translating the COBOL source code to a C program, where it is then compiled to machine code using gcc.

We can install it on MacOS with Homebrew by running `brew install gnu-cobol`.  For those who don't want to setup a local toolchain, there is an [online IDE](https://www.tutorialspoint.com/compile_cobol_online.php) for developing COBOL code online.

### Hello World
Now it's time to write our 'Hello World' code.  The [GnuCOBOL docs](https://gnucobol.sourceforge.io/historical/open-cobol/Hello-World-.html) have a tutorial that I've followed here to create a `hello.cob` file:
```COBOL
	IDENTIFICATION DIVISION.
	PROGRAM-ID. hello.
	PROCEDURE DIVISION.
	DISPLAY "Hello World from COBOL!".
	STOP RUN.
```

This shows the basics of a COBOL program:
* An IDENTIFICATION DIVISION which contains information for the programmer.  The compiler treats fields here as comments, except for PROGRAM-ID which it requires.
* A PROCEDURE DIVISION that contains the code to manipulate data.  This is where the algorithm is described.

There are also ENVIRONMENT and DATA divisions that aren't required in this example so we will skip over them.

We can then run a `cobc -x hello.cob` to compile and the execute the program with `./hello` to see the results:

![Compiling and running the Cobol program where it prints hello world](/assets/cobol-lambda/hello-cobol.png)

Awesome!  So far so good. 

### Putting it into a Lambda function
To run our COBOL in an AWS Lambda function, we're going to take advantage of the [Custom Lambda Runtimes](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html) framework.  We'll use it to create our own COBOL runtime.

We'll need to use GnuCOBOL to compile `hello.cob` down to an executable on Amazon Linux 2, AWS Lambda's execution environment.  Then we'll need to create a bootstrap script that runs the executable when the Lambda function initializes.

#### Compiling on Amazon Linux 2
The easiest way to compile 	`hello.cob` for Amazon Linux 2 is in a Docker image.  We'll create a Dockerfile that runs Amazon Linux 2, installs GnuCOBOL, and compiles the application:

```Dockerfile
FROM amazonlinux:2
# Install GNUCobol dependencies
RUN yum install tar gzip wget gcc make libdb-dev libncurses5-dev libgmp-dev gmp gmp-devel autoconf -y

# Install GNUCobol
RUN wget -O gnu-cobol.tar.gz https://sourceforge.net/projects/gnucobol/files/gnucobol/2.2/gnucobol-2.2.tar.gz/download
RUN tar zxf gnu-cobol.tar.gz
WORKDIR gnucobol-2.2
RUN ./configure --without-db
RUN make
RUN make install

WORKDIR /app
RUN mkdir /app/lib

# Need to copy the dynamically linked library
RUN cp /usr/local/lib/libcob.so.4 \
       /app/lib

# Copy and compile the COBOL program
COPY hello.cob .
RUN cobc -x hello.cob
RUN rm hello.cob
```
We can then build the Dockerfile with `docker build .`:

![Compiling the COBOL program in a Dockerfile for Amazon Linux 2](/assets/cobol-lambda/docker-build.png)

Now that we built our Dockerfile, we need to create a build script. This will copy the  executable out of the container to the local filesystem for deploying to AWS:
```bash
#!/bin/bash
# Reset any local files
rm -rf lib
rm hello
# Build the binary in the amazon linux 2 container
docker build -t cobol-builder .
docker create --name cobol cobol-builder:latest
# Copy the built binary and library
docker cp cobol:/app/hello .
docker cp cobol:/app/lib .
docker rm cobol
```

Awesome! When we run `./build.sh` we now have a `hello` executable that can run in AWS Lambda.  We also have a `lib` folder with the linked libraries required at runtime.

#### Creating a Custom Lambda Runtime
Now that we have an executable that will run on AWS Lambda, we need to create a `bootstrap` script.  AWS requires a `bootstrap` script to initialize the custom runtime in a Lambda function. It's responsible for bootstrapping the runtime environment,  iterating over invocation events, and sending the response to the Lambda API.

In this case we will make a simple bash script following an [example AWS tutorial](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-walkthrough.html):

```bash
#!/bin/sh

set -euo pipefail

# Processing Loop
while true
do
  echo "looping"
  HEADERS="$(mktemp)"
  # Get an event. The HTTP request will block until one is received
  EVENT_DATA=$(curl -sS -LD "$HEADERS" -X GET "http://${AWS_LAMBDA_RUNTIME_API}/2018-06-01/runtime/invocation/next")

  # Extract request ID by scraping response headers received above
  REQUEST_ID=$(grep -Fi Lambda-Runtime-Aws-Request-Id "$HEADERS" | tr -d '[:space:]' | cut -d: -f2)

  # Execute the handler function from the script
  export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$LAMBDA_TASK_ROOT/lib
  RESPONSE=$($_HANDLER)
  
  # Necessary API Gateway response format
  JSON_RESPONSE='
  {
    "isBase64Encoded": false,
    "statusCode": 200, 
    "body": "'"$RESPONSE"'" 
  }'

  # Send the response
  curl -X POST "http://${AWS_LAMBDA_RUNTIME_API}/2018-06-01/runtime/invocation/$REQUEST_ID/response"  -d "${JSON_RESPONSE}"
done
```

While there are things to improve in this script, like the hardcoded HTTP 200 response code, this works well as a minimal example.

### Setting up our Lambda and API Gateway
Now that we have our Lambda runtime and logic, we need to create the Lambda function and API Gateway to run it.  We're going to use the [Serverless ⚡ Framework](https://www.serverless.com/) to setup our infrastructure.  It's more lightweight than Cloudformation and I've been meaning to give a try.

First, we need to install Serverless by running `brew install serverless`

We can then create our `serverless.yaml` that defines our Lambda function and API Gateway:
```yaml
service: cobol-lambda
frameworkVersion: '2'

provider:
  name: aws
  # We provide our own runtime in the bootstrap file
  runtime: provided

package:
  # Files to deploy to AWS
  include:
    - lib/**
    - hello
    - bootstrap

functions:
  hello:
    handler: ./hello
    events:
      - http: GET /

```

This configuration file defines all our infrastructure.  The `./hello` executable is our COBOL function, which gets called when you make a GET request to the root of the API Gateway. 

### Let's run this thing!
So, we have all the pieces in place to actually deploy and run this Lambda 🤞

First we need to run the `build.sh` script to generate the deploy artifacts:
![Building the artifacts with the build script](/assets/cobol-lambda/build-script-run.png)

I've already configured my [local AWS credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/), so I can deploy the Lambda and API Gateway with a simple `sls deploy`:
![Deploying the Lambda and API Gateway with sls deploy](/assets/cobol-lambda/sls-deploy.png)

Once it's deployed, navigate to API Gateway in the AWS Console to grab the autogenerated domain name.  Hit the endpoint in a browser and:
![Getting a response from the Lambda in the browser](/assets/cobol-lambda/its-working.png)

It's working! Yay! 🎉  

How is this all working?  The GET request from the browser hits the API Gateway, which forwards the request to the Lambda function.  The `bootstrap` script runs and calls the `./hello` command.  The COBOL executable then executes and prints a response.  The `bootstrap` script then takes the response and returns it by sending an HTTP request to the Lambda API. The API Gateway receives the response and finally sends it back to the browser.

Once done testing, running an `sls remove` will clean up your AWS resources.

### Wrap Up
This walkthrough shows how little magic there is in serverless computing.  AWS Lambda is just an Amazon Linux 2 instance that loops through incoming events, with a great integration into the AWS ecosystem.

Particularly surprising to me was how easy creating a custom runtime is.  While it's missing some use cases, the bootstrap script is only 18 lines of code and gets the job done.  The hardest part of this project was compiling the COBOL to an executable for Amazon Linux 2.

So - can you run a 60 year old programming language in a serverless environment? Yes!  Should you do this? Definetly not 😁 .  But it's a good way to learn.  Happy hacking!

#### Resources:
* [COBOL cownboys aim to rescue sluggish state unemployment systems](https://www.npr.org/2020/04/22/841682627/cobol-cowboys-aim-to-rescue-sluggish-state-unemployment-systems)
* [The Wikipedia entry for COBOL](https://en.wikipedia.org/wiki/COBOL)
* [Guide to installing GnuCOBOL on Mac OS X](http://www.globalnerdy.com/2020/04/15/a-quick-and-dirty-guide-to-installing-a-cobol-compiler-and-ide-on-macos-and-get-a-cobol-book-at-a-discount/comment-page-1/)
* [AWS custom runtime announcement](https://aws.amazon.com/blogs/aws/new-for-aws-lambda-use-any-programming-language-and-share-common-components/)
* [GnuCobol hello world tutorial](https://gnucobol.sourceforge.io/historical/open-cobol/Hello-World-.html)
* [COBOL intro course](http://www.csis.ul.ie/cobol/course/COBOLIntro.htm)
* [Custom Lambda runtime tutorial](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-walkthrough.html)
* [Example of installing GnuCOBOL in a container](https://github.com/TW5860/cobol-in-a-box/blob/ba6c1a38483ac29c49351f33309c37d57a523761/docker/cobol/Dockerfile)
* [Example code for copying over dynamically linked libraries](https://github.com/ktsmy/aws-lambda-cobol-sample/blob/master/bootstrap#L15)
