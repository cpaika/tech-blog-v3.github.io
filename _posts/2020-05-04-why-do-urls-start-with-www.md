---
layout: post
title: Why do URLs start with www?
description: Exploring the origins of the www. prefix in web URL's
image: /assets/www-questions.jpg
date:   2020-05-04 8:00:00 -0400
categories: blog
---

When you begin your engineering career, there's concepts you have to take for granted. They work - and you don't think twice about them.  There's so much you have to internalize, you can't question everything.

As your engineering abilities mature, you start to identify and question those assumptions.  It's always a fun experience when you realize you completely misunderstood something!  There's no better way to keep yourself humble.

One of those humbling moments happened to me recently when I realized I had no idea what `www` meant.  Obviously it's an acronym for the 'World Wide Web', but what's its technical significance?  I've seen it everywhere my whole life prefixed on web URLs, and had never stopped to consider what it *actually is*.

![Various website URL's with the www portion highlighted surrounding a question mark](/assets/www-questions.jpg)

So I decided to do some digging.  Rather than read someone else's interpretations, I chose to figure this mystery out by reading the sources directly.  The standards for the web were created by the IETF - the Internet Engineering Task Force.  They were documented in the late 80's and 90's in numerous technical whitepapers, called RFC's - Request For Comments.  They are all still hosted on the [IETF website](https://www.rfc-editor.org/rfc-index.html).  Turns out RFC's are surprisingly easy to read![^1]

### Breaking Down a URL
To begin the investigation, lets breakdown a URL.  In [RFC-1738](https://tools.ietf.org/html/rfc1738), they specify an HTTP URL takes the form:
      
      http://<host>:<port>/<path>?<searchpart>

So using that specification lets analyze [https://www.paika.tech](https://www.paika.tech).  

<pre>
<b>https</b>://www.paika.tech
</pre>

The `https` is easy - that's the protocol we are are using, HTTP over TLS.[^2]

<pre>
https<b>://</b>www.paika.tech
</pre>

The `://` seperates the protocol from the hostname.  Why `://` was chosen as a seperator is a whole different story [you can read here](https://www.w3.org/People/Berners-Lee/FAQ.html#etc).

<pre>
https://<b>www.paika.tech</b>
</pre>

We don't have a `:<port>` in this URL, or a `/<path>`, therefore `www.paika.tech` is the host.  But what's a host?

### Hosts

[RFC-1738](https://tools.ietf.org/html/rfc1738) defines a host as "The fully qualified domain name of a network host, or its IP address..."

Since its clearly not an IP address, `www.paika.tech` is the fully qualified domain name.  A fully qualified domain name is a long, fancy phrase for a full URL, that includes the top level domain (.com, .org, .tech, etc).  So `www.google.com` is a fully qualified domain name, but `google` is not.

Now let's breakdown the domain:

<pre>
https://www.paika.<b>tech</b>
</pre>

This is the top level domain name (TLD).  Top level domains are the last part in a URL.  They are at the highest level in the DNS tree, and are registered in the DNS Root Zone by ICANN.

<pre>
https://www.<b>paika</b>.tech
</pre>

This is the name of my website, which is a subdomain of .tech.

<pre>
https://<b>www</b>.paika.tech
</pre>

This is just a subdomain of paika.tech!

So there we have it - `www` is a subdomain - nothing more.

But if www is just a subdomain and has no technical purpose, why have I seen it my entire life?  Why does everyone use it?

### Finding the source

Looking for an answer I went through some more RFC's - and as I skimmed through I couldn't find a single reference to the `www` subdomain being a standard or convention.

So it has no technical significance, and it's not a documented standard - which pointed to it being a cultural artifact. 

So I searched more.  Finally, after almost giving up I found this gem on Wikipedia:

> "...the World Wide Web project page was intended to be published at [www.cern.ch](http://www.cern.ch/) while [info.cern.ch](http://info.cern.ch/) was intended to be the CERN home page, however the DNS records were never switched, and the practice of prepending www to an institution's website domain name was subsequently copied"[^3]

The first web page was published by Tim Berners-Lee, the web's creator.  It was called the World Wide Web Project Page and was located at [info.cern.ch/hypertext/WWW/TheProject.html](http://info.cern.ch/hypertext/WWW/TheProject.html).  

It seems that [info.cern.ch](http://info.cern.ch) was intended to be the CERN homepage, while [www.cern.ch](http://www.cern.ch) would be the World Wide Web Project Page.  However, the CERN team never got around to switching the domains.  The next person to make a webpage must of assumed that since CERN's homepage was [www.cern.ch](http://www.cern.ch) that using `www` as a subdomain was the standard.  They copied the pattern, as did others, and that was that.  From then on it had a life of its own and continues being copied to this day.

So go figure - `www`, which I've heard, read, and typed myself thousands of time isn't even a convention - its a copy and paste artifact!  

If there's one thing I hate, it's code or patterns that have no meaning and are just copied endlessly.  It looks like I'm not alone either.  Websites like [no-www](http://no-www.org/) have been fighting the good fight since 2003, arguing that:

> Succinctly, use of the www subdomain is redundant and time consuming to communicate. The internet, media, and society are all better off without it.

There's no better way to put it.  So next time you are making a project, and you decide to put off a small task to clean things up - remember this story.  Things you don't get around to fixing can have a life of their own.


---
For the sources and research for this post, please check out my [Roam Research Graph](https://roamresearch.com/#/app/ChrisPaika/graph)

[^1]: I highly recommend giving an IETF RFC a read.  It's a great way to gain perspective on how the Web was created.  [RFC-1738](https://tools.ietf.org/html/rfc1738) sets the standard for URLs, and while long is quite readable!

[^2]: Fun fact, if you notice in the HTTP URL specification they only define http as the protocol `http://<host>:<port>/<path>?<searchpart>`, and not https.  At the time of RFC-1738 being published, Netscape had just created https - the IETF didn't take over the standard until 1996, so it wasn't present in any standards documentation.

[^3]:  This quote is where the trail runs cold.  Wikipedia attributes the quote to a keynote by Paolo Palazzi, hosted by a now defunct website.  Paolo was a coworker of Tim Berners-Lee at CERN.  While the Wayback Machine has preserved the webpage, it hasn't preserved the video where the quote originated.  Other websites have copied the same quote from Wikipedia, but it appears theres longer any source material to pull the quotation from.