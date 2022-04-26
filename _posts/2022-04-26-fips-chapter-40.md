---
layout: post
title:  "FPS: Chapter 40"
description: “A functional game”
date:   2022-04-26 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---

### Chapter 40: A Functional Game
This is an example of writing a game with immutable state, so It’s going to be a meh chapter.  Just going to get through it - had to open up [the code][1] on the book’s recommendation.  Looking at the code it’s pretty simple - there’s a case class for game state that he’s copying and overwriting fields on.

He’s not going to handle I/O in a functional way with monads so this chapter is going to be very boring.

The main game loop is recursive with a `@tailrec` annotation which is interesting.  Also the game extends `App` which I thought was an aka library thing but must be basically a Scala primitive.  He encouraged us to write it ourselves which usually I would do, but in this case I really don’t think is worthwhile.

Yeah, this chapter was pretty useless other than the fact that I get to see a recursive game loop which is interesting.  Funny the game was a heads/tail predictor.

### Chapter 41: Case Classes
A case class generates a lot of code for you:
* An `apply` method so you don’t need to use the `new` keyword on creation.  This is also why you still need to use `new` when instantiating a Java class
* Accessor methods for each constructor parameter, because they are `public val` by default so they get accessor’s
* An `unapply` method is generated which makes it easy to use case classes in `match` expressions.  This is a huge FP win apparently.
* `copy` method which you can use to make a new val of your variable with fields changed.
* `equals` and `hashCode` so you can use your objects as keys in a map or set, and also compare objects.  Really with Java had this auto-comparison, I used to hate generating that code!  I’ve heard of nasty bugs from hashCode methods that were missing a field.
* A default `toString` method is generated which is useful for debugging.  Also great, really hated generating that code in the past.

#### Code Examples
**No need for the `new` keyword:**
```scala
case class Person(name: String)

val chris = Person("Chris")
```

**Unapply method allows pattern matching and to expand the inner properties:**
```scala
chris match {
  case Person(name) => println(name)
}
```

Normal Scala classes do not compile in a `match`, only case classes.  Maybe if you had an unapply on the class and you extended a trait you could make it work however - I’m not sure.

**Copy Method:**
```scala
val chris = Person("Chris")

val jeff = chris.copy(name = "Jeff")
```

Useless here with one field in a case class, but normally allows you to update only one field on an object

**Equals and hashCode:**
```scala
val chris = Person("Chris")
val jeff = Person("Jeff")

if(chris == jeff) println("This will never happen")
```

**toString method:**
```scala
val chris = Person("Chris")
println(chris)
```

This will print helpful information.

So overall case classes are amazing - they reduce a ton of Java boilerplate that I used to have to write, which removes a bunch of code and potential avenue for bugs.  Also pattern matching is great, you always love to use it.  It’s just pretty.

Next chapter is on copying case classes, which should be great.

[1]:	https://github.dev/alvinj/FPCoinFlipGame