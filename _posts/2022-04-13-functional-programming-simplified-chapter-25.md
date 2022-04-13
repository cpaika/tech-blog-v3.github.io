---
layout: post
title:  "Functional Programming Simplified: Chapter 25"
description: "How to use by-name parameters"
date:   2022-04-13 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---

I've been taking a break from **Functional Programming Simplified** by Alvin Alexander, but coming back to it and putting down some notes.

Call by value in computer science is when you call a function with a parameter, and the function receives a pointer to that object that's passed in.  THis allows you to mutate the shared state (data at the pointer's memory location) which can be confusing.

In Scala call-by-value means the value is either:
* The value is a primitive like Int that is immutable
* A pointer to an object

By-name parameters on the other hand, are evaluated only when they are referenced within the function.

If you had to write a timer function, that timed a Scala function call how would you do it?
```scala
val results = timer(someFunction)
```

```scala
def timer[A](blockOfCode: => A) = ???
```

`blockOfCode:` is the by-name syntax here.  It's executed seperately each time it's called

By-name parameters were added to Scala because it makes the syntax around assertions easier.
