---
layout: post
title:  "How I deploy this WordPress Site on AWS"
date:   2018-12-01 12:00:00 -0400
categories: blog
---
**Editor's Note** *- this is a migrated post from a previous attempt at a blog.  This blog is currently using Jekyll and not Wordpress.*

To start off the blog I’d like to post about deploying WordPress to AWS.  While there are many hosted services that can run WordPress (and many that my company Endurance provides), they lack the control of running your own WordPress.  Most people don’t need that level of control, but for a blog about AWS it feels silly not to run it on EC2 myself.

When deciding how to run my server here were my requirements:

1.  Low Cost – Under 5$ a month
1.  Allows me to learn something as I build it
1.  Easy to manage

Notice how low cost was #1 here.   There’s obviously some tradeoffs when cost is what you are optimizing for, namely that you usually use your own time to make up for it.  But, since AWS is something I’m passionate about, as long as I’m spending time practicing using it I won’t mind!

So to start, I’m running an Amazon Linux EC2 instance (in the free tier!), with WordPress installed and mysql.  Super simple, and super cheap.

This is obviously super brittle, lets hope this instance doesn’t die!  Later Improvements:

1.  Migrate the database to RDS
1.  Externalize the WordPress configuration so I can handle an EC2 instance restarting.
1.  Put the infrastructure into Cloudformation or Terraform

So welcome!  Here’s to betting that my instance won’t crash, and that I can keep writing daily to publish here.

 

P.S. Here’s the wonderful tutorial I followed for anyone else interested in doing the same – [Setting up Wordpress on Amazon EC2 in 5 minutes](http://coenraets.org/blog/2012/01/setting-up-wordpress-on-amazon-ec2-in-5-minutes/)