---
layout: post
title:  "Building a hello world Cobol Lambda"
description: ""
date:   2020-09-19 15:05:00 -0400
categories: blog
tags: aws lambda cobol
---

Let's walk through the process of building a Hello World COBOL Lambda on AWS.  Why?  Because it's fun!  Also, the blog needs content as always.

COBOL stands for 'Common Business Oriented Language'.  It was standardized in 1968, inspired by Grace Hopper's work on FLOW-MATIC and IBM's COMTRAN.  It was designed primarily for business uses (hence the acronym), and focused on having an english like syntax.  

Even though its over 50 years old, COBOL is still heavily used in banking and government.  In fact during the pandemic several state unemployment systems had to put their COBOL migrations on hold to focus on the legacy systems dealing with the surge in requests.  Every year another 'The COBOL crises' article comes out, but COBOL code keeps going.

At RE:Invent 2018, AWS released the Lambda Runtime API.  This allowed developers to bring any runtime they wanted to AWS Lambda.  **Any Runtime**.  When they announced support for COBOL lambdas, I laughed like most people.  Putting a 50 year old language into a serverless execution environment??  Please.  

We're going to try to implement a COBOL rest api that returns 'Hello World' to the user from a COBOL lambda.  Let's see how it goes.

### Getting it running locally

First, let's get ourselves running a COBOL Hello World application locally.

First things first, we can install the COBOL interpreter with Homebrew.  As COBOL is an enterprise language, most of the compilers come at an enterprise cost.  Luckily there is GnuCOBOL - a free implementeation of a COBOL compiler that is up to date with the COBOL 2014 specification.  Yes, COBOL was updated in 2014! 

GnuCOBOL translates the source code to a C program, where it is then compiled to machine code using gcc.

We can install it on MacOS with Homebrew by running `brew install gnu-cobol`.

For those who don't want to get the toolchain working, there is an [online IDE](https://www.tutorialspoint.com/compile_cobol_online.php) for developing COBOL code online.

### Hello World
Now its time to write our Hello World code.  The [GnuCOBOL docs](https://gnucobol.sourceforge.io/historical/open-cobol/Hello-World-.html) have a hello world tutorial that I've followed here.
hello.cob TODO how to do line endings in jekyll.  embed github directly?
```COBOL
	IDENTIFICATION DIVISION.
	PROGRAM-ID. hello.
	PROCEDURE DIVISION.
	DISPLAY "Hello World from COBOL!".
	STOP RUN.
```

The basics of this are that we have:
* An IDENTIFICATION DIVISION which contains information for the programmer.  They are treated as comments except for the PROGRAM-ID which is required.
* A PROCEDURE DIVISION contains code to manipulate data.  This is where the algorithm is described.

There are also ENVIRONMENT and DATA divisions but we don't need those so will skip over them.

We can then run a `cobc -x hello.cob` to compile and the execute the program with `./hello` to see the results:

![Compiling and running the Cobol program where it prints hello world](/assets/cobol-lambda/hello-cobol.png)

Awesome!  So far so good. 

### Putting it into a Lambda function
To run out COBOL in an AWS Lambda function, we're going to take advantage of [custom lambda runtimes](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html).

We'll need to use GnuCOBOL to compile `hello.cob` down to an executable on Amazon Linux 2, AWS Lambda's runtime.  Then we'll need to create a bootstrap script to run the program when the Lambda function initializes.

#### Compiling on Amazon Linux 2
The easiest way to compile 	hello.cob` on Amazon Linux 2 is to create a Dockerfile that uses Amazon Linux 2, installs GnuCOBOL, and compiles the application.

Here is the Dockerfile:
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
We can then build the Dockerfile with `docker build .`.

Now that our Dockerfile can build succesfully, we need to create a build script that will copy the built binary to the local filesystem for deploying to AWS:
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

Awesome! We now have a `hello` executable that can run in AWS Lambda, along with a `lib` folder with our dynamically linked libraries.

### Creating a custom Lambda runtime
Now that we have a binary that will run on AWS Lambda, we need a `bootstrap` script.  This is required by AWS Lambda if you bring your own runtime and is responsible for bootstrapping the runtime environment, handle events, responses, and loops over any new incoming events.

The bootstrap file can be more complex, however in this case we will make a simple bash script following an [example AWS tutorial](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-walkthrough.html):

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

### Setting up our Lambda and API Gateway
We're going to use [Serverless](https://www.serverless.com/) to setup our API Gateway to call our Lambda function.  Why?  I haven't used it before and I want to try it!

First, we need to install serverless by running: 
`brew install serverless`

Once installed, we can create our `serverless.yaml` that defines our Lambda function and API Gateway:
```yaml
service: cobol-lambda
frameworkVersion: '2'

provider:
  name: aws
  # We provide our own runtime in the bootstrap file
  runtime: provided

package:
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

This is a pretty straightforward configuration file - the `hello` executable is our funtion handler, which gets called when you make a GET request to the root of the API Gateway.

### Let's run this thing!
So, we have all the pieces in place to actually deploy and run this lambda :fingerscrossed:

First we need to run the `build.sh` script to generate the deploy artifacts:
![Building the artifacts with the build script](/assets/cobol-lambda/build-script-run.png)

I've already configured my local AWS credentials, so I can deploy the Lambda and API Gateway with a simple `sls deploy`:
![Deploying the Lambda and API Gateway with sls deploy](/assets/cobol-lambda/sls-deploy.png)

Now that it's deployed, I navigated to the API Gateway console to grab the autogenerated domain name.  Hit the endpoint in a browser and:
![Getting a response from the Lambda in the browser](/assets/cobol-lambda/its-working.png)

It's working! Yay!  The GET request hits our API Gateway, which forwards the request to the Lambda.  The `bootstrap` script calls the `./hello` command which is our compiled COBOL executable and prints a response.  The `bootstrap` script then takes the response and returns it as the Lambda output, which the API Gateway sends back to the browser.

In Summary:
Can you do this? Yes.  Should you do this? Probably not.

What was most surprising to me was how easy creating a custom runtime is.  While it's missing some use cases like error handling and passing events to the handler function, the bootstrap script gets the job done and is only 18 lines of code.  The hardest part was just compiling the COBOL to an executable for Amazon Linux 2.

Happy hacking!

#### Resources:

* [The Wikipedia entry for COBOL](https://en.wikipedia.org/wiki/COBOL)
* [Guide to installing GnuCOBOL on Mac OS X](http://www.globalnerdy.com/2020/04/15/a-quick-and-dirty-guide-to-installing-a-cobol-compiler-and-ide-on-macos-and-get-a-cobol-book-at-a-discount/comment-page-1/)
* [AWS custom runtime announcement](https://aws.amazon.com/blogs/aws/new-for-aws-lambda-use-any-programming-language-and-share-common-components/)
* [GNUCobol hello world tutorial](https://gnucobol.sourceforge.io/historical/open-cobol/Hello-World-.html)
* [COBOL intro course](http://www.csis.ul.ie/cobol/course/COBOLIntro.htm)
* [Custom Lambda runtime tutorial](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-walkthrough.html)
* [Example of installing GnuCOBOL in a container](https://github.com/TW5860/cobol-in-a-box/blob/ba6c1a38483ac29c49351f33309c37d57a523761/docker/cobol/Dockerfile)
* [Example code for copying over dynamically linked libraries](https://github.com/ktsmy/aws-lambda-cobol-sample/blob/master/bootstrap#L15)
