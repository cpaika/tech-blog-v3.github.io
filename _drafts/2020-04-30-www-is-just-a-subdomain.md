---
layout: post
title:  "WWW is just a Subdomain"
date:   2020-04-30 21:00:00 -0400
categories: blog
---

When you begin your engineering career, there's so many things you have to take for granted. They work - and you don't think twice about them.  There's so much to internalize, you don't have time to question the things that 'just work'.

As your engineering abilities mature, you start to identify and question those assumptions.  It's always a fun experience when you realize you completely misunderstood something!  I really can't imagine a better way to keep yourself humble.

One of those humbling moments happened to me yesterday when I realized I had no idea what the "www" was.  I've seen it everywhere my whole life prepended on domain names, and had never stopped to consider what it *actually* was.


//TODO Move the conclusion down some to keep the story interesting
One night of digging into IETF RFC's later - turns out - `www` is just subdomain!  It has no technical meaning.[^1]

To understand, lets breakdown a URL.  In [RFC-1738](https://tools.ietf.org/html/rfc1738), they specify:

An HTTP URL takes the form:

      http://<host>:<port>/<path>?<searchpart>

So using that, lets breakdown `[https://www.paika.tech](https://www.paika.tech)`.  
The `https` is easy - that's the protocol we are are using - HTTP over TLS.

The :// seperates the protocol from the hostname - why `://` was chosen as a seperator is a whole different story we'll have to get to another time!

As per that RFC `www.paika.tech` is then host.  
The host is defined as:
host
        The fully qualified domain name of a network host, or its IP
        address

In this case, this is the fully qualified domain name.  Which means the TLD is tech, and the domain is paika, and the subdommain is `www`.

So all that `www` is is a subdomain of paika.tech - nothing more.

But if www is just a subdomain, and has no technical significance - why have I seen it my entire life?  Why is it the standard?

So I went through some more RFC's - and as I skimmed through I couldn't find a reference to the `www` subdomain being a standard or convention anywhere.

So what gives?  

Digging deeper, the first web page, the infamous 'TheProject' page, didn't even have www as a subdomain!  It URL was [http://info.cern.ch/hypertext/WWW/TheProject.html](http://info.cern.ch/hypertext/WWW/TheProject.html).

I was about to give up, when I found this gem on Wikipedia:

"the [[World Wide Web]] project page was intended to be published at [www.cern.ch](http://www.cern.ch/) while [info.cern.ch](http://info.cern.ch/) was intended to be the [[CERN]] home page, however the [[DNS]] records were never switched, and the practice of prepending www to an institution's website domain name was subsequently copied"

And that, is where the trail runs cold.  Wikipedia attributes the quote to a now defunct webpage, where it appeared to appear in a talk X gave at a conference in France.  The wayback machine has preserved the webpage, but not the video where the quote originated.  

Some googling leads to others who lay the same claim, but no conclusive source material to pull the quotation from.

So go figure - www, which I've heard, seen printed, and typed myself thousands of time isn't even a convention - its a copy and paste error!

If there's one thing I despise, it's code or patterns that have no meaning and is just copy and pasted endlessly.  It looks like I'm not alone either.  Sites like [no-www]([http://no-www.org/](http://no-www.org/)) have been fighting the good fight since 2003, arguing that:

"Succinctly, use of the www subdomain is redundant and time consuming to communicate. The internet, media, and society are all better off without it."

So there we have it.  Not only does www have no meaning, it's a dumb copy & paste artifact from the very beginning of the web.

---

[^1]: I highly recommend giving an IETF RFC a read.  Great way to gain perspective on how the Web was created.  [RFC-1738](https://tools.ietf.org/html/rfc1738) sets the standard for URLs, and while long is quite readable!