---
layout: post
title:  "Lessons learned leading an internal team"
description: "Lessons learned taking on responsibility for the technical roadmap"
date:   2020-08-08 13:00:00 -0400
categories: blog
---

I recently made the transition from working on a customer facing product engineering team to building out a new team, to tackle internal tooling and infrastructure problems.  The new team has no external customers - our customers are the other product engineers at the organization.  While making this transition, I was continually confronted with the fact my organization is not built to support teams like ours.  I believe the challenges our team faces are common across the industry.

Normal organizational structures are designed to support teams that are building customer facing software.  The patterns aren't designed for internal teams and fall flat when applied.  For example, my company's customers use our product through a website.  Therefore we hire user experience designers who are focused on web or mobile design.  When it comes to product owners, we hire for people who are good at understanding our customers.  Since our customers are small businesses, our product owners we hire aren't technical.  They're job doesn't require it.  They are responsible for coordinating with marketing and visiting customers to see how they use the product, not engineering.

Starting an internal team, everything gets flipped on it's head.  You are delivering value to a completely new customer - product engineers!  You might as well be a separate company.  You can't leverage many of the resources you're used to as a product engineer - particularly the UX, Support or Product groups.  This makes it a challenge to start a new team.  In some ways your like a startup - just without having to handle any pesky venture capital fundraising!  

Here are some interesting features of the landscape I've discovered - some positive, and some negative.  As this is all from my personal experience, take it with a grain of salt.

### Tackling a lack of User Experience knowledge
A good organization will hire UX talent who are specialized in the company's primary interface with the customer.  It's one of the reasons organizations have a hard time switching platforms - if your teams are oriented for designing desktop web applications, they're going to have a hard time designing for mobile.  Likewise if you were to task a mobile UX designer with creating a voice interface with Alexa, it's going to be difficult.

This is one of the largest problems you face as a new internal team - while your organization might have UX competencies, your interface is completely different.  Your UX org can't help you.  As internal teams are often chronically underfunded, your team probably won't be able to hire a dedicated UX engineer to design your various tooling interfaces, such as Github automation, pipelines, CLI tools, etc.  

As you can't hire your way out of this problem, your only option is to distribute the UX responsibility to everyone on your team.  Make tickets for UX testing your tooling with engineers.  Drive architectural decisions based on the user need.  Read books on UX.

Your team has to treat the UX of your tooling and infrastructure as a core competency, that guides your day to day decision making.  It's challenging without a dedicated person, but it's a challenge you can't afford to ignore.

### Being a Team Lead and Product Owner
In most customer facing teams at a software organization, there are two roles that lead the team.  

First is the product owner.  They are responsible for driving the strategy and vision of the product that the team builds.  They answer the questions - Who is our customer?  What do they *really* want? What can we build to best deliver them value?  

Then there is the technical lead.  They're responsible for guiding the implementation of what the product owner wants to build.  They mentor junior engineers, guide architecture, and collaborate with the product owner to build the right thing on time.

This is completely different in an internal team.  Just like you probably won't have an engineer dedicated to UX, you probably won't have a dedicated product owner either.  If you're the team's technical lead, you're likely going to have to fill the role of the product owner as well.

This isn't easy.  These roles are handled by seperate people for a reason - both roles are a full time job.  You have to be disciplined - be strict with your time, delegate as much as you can, and help your team be as autonomous as possible.  

### Handling support for your products
While your organization probably has a dedicated support team, your internal team likely won't.  For every tool you offer to your customers, there's going to be questions and bugs.  Someone on the team will need to answer these questions, and that's going to take time away from engineering. 

Everytime someone comes to your chat room asking a question or looking for help is an opportunity to make a good impression.  While the truth is that your customers are often locked in and required to use the tools your team provides, the less you rely on that fact the better.  Provide exemplary support.  Be known as friendly and supportive.  

There's a balance however - if you handhold engineers too much, they will learn to rely on you.  For every support interaction, you should be asking yourself "How could we prevent this from being a problem in the future?"  A constant focus on making your tools self service will allow you to minimize this support work over time.

### High empathy with your customer
Being on an internal team is probably the closest you could ever get to a customer.  As you work for the same company, there's a basis level of understanding and trust.  Do everything you can to continually strengthen this trust.  A strong empathy and understanding of your customer is key to delivering an amazing product.  Take advantage of this strength.

### Having customer facing engineers rotate onto the team
My organization is lucky enough to have a formalized rotational process.  If your organization does - take advantage of it!  Having your customer join your team is an amazing opportunity - they already know which features are valuable to them and which aren't.  Getting them to temporarily join your internal team is a great way to bring in fresh ideas and make sure you are prioritizing the right things.

However don't be selfish, rotations go both ways.  Supporting one of your team members as they rotate onto a customer facing team has the same value.  When they come back, they're going to bring great insight into what's important and what's not.

### Conclusion

Internal teams are effectively completely different organizations than the product teams they support.  Running a succesful internal team is hard.  Spend time understanding the landscape, so you can help your team be the most successful it can be.  