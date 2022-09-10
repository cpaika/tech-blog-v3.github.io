---
layout: post
title:  "FPS: Chapter 42"
description: “Updating state as you copy”
date:   2022-04-27 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---
### Chapter 42: Update as you copy
In functional programming you don’t mutate existing objects, you create a new object with updated fields based on existing objects.  This is a key component of functional programming.

The way to do this in Scala is with the `copy` method on case classes:
```scala
case class Person(firstName: String, lastName: String, age: Int)

val chris = Person("Chris", "Paika", 28)
val krista = chris.copy(firstName = "Krista")
```

With `copy` you just specify the name of the field(s) to be overridden as you copy.  Pretty simple.  What’s key is the original instance, `chris` is unchanged.    Usually the old object is discarded so you don’t deal with it, but sometimes it stays around.  

You can also use copy to update multiple fields:
```scala
val kristaNextYear = chris.copy(firstName = "Krista", age = 26)
```

Nested copying is just a pain, no way around it.  Lenses libraries make it easier apparently, we’ll get to that later.  

Case classes give you that copy method which makes it easy to copy and update state.  

Next chapter is for comprehensions, which I’ve been trying to learn.  It’s definitely a meaty concept though so I’ll leave it for tomorrow. 