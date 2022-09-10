---
layout: post
title:  "FPS: Chapter 45"
description: “Creating a class for for comprehensions”
date:   2022-04-29 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---
### Chapter 45
We’re going to create a `Sequence` class that’s basically just a list:
```scala
val strings = Sequence("one", "two")
val numbers = Sequence(1,2)
```

* Sequence needs to be a case class or it needs a companion object with an `apply` method so you can create new ones without using the `new` keyword.
* It’ll also have to take a generic type since it can accept multiple types of objects.
* Since the apply method takes variable number of arguments, it’ll need to use `varargs`

```scala
case class Sequence[A](elems: A*) {  // * is varargs
  private val elements = scala.collection.mutable.ArrayBuffer[A]()
  elements ++= elems // why is this state mutable in an FP book?
}
```

Important to note everything inside the body of a class that isn’t a method is called when the class is instantiated.

`++=` works just like a for-comprehension:
```scala
for {
  e <- elems
} elements += e
```

### Chapter 46
Our first job is to modify it so it works in a for-loop.
```scala
case class Sequence[A](elems: A*) {  // * is varargs
  private val elements = scala.collection.mutable.ArrayBuffer[A]()
  elements ++= elems // why is this state mutable in an FP book?
  
  def foreach(block: A => Unit): Unit = {
    elems.foreach(block)
  }
}
```

The next chapters are still for-comprehensions, but I’ll leave those for Monday morning. 