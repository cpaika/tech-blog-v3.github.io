---
layout: post
title:  "FPS: Chapter 43"
description: “Updating state as you copy”
date:   2022-04-28 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---
### Chapter 43: For Comprehensions
This lesson is going to explain for-expressions.  Very excited - these have been a challenging part of the language specification for me to understand in day to day work.

The author starts by mentioning that a for-comprehension is another way to use a for loop.  Yeah, this has been confusing me - I know:
```scala
def stackManip: State[Stack, Int] = for {
  _ <- push(3)
  a <- pop
  b <- pop
} yield(b)
```

Terminology why, let’ no longer refer to this as a for-loop - it’s not a `for-comprehension`.  It’s still doing a loop but its actually an iteration. (lol, what’s the difference).

For comprehensions have the form for (enumerators) yield x where the enumerators either introduce new variables or are a filter.  This is similar to a set-comprehension, and gives you a way to filter, transform, and combine lists.

A for-comprehension can contain the following expressions:
* Generators
* Filters
* Definitions
Example:
```scala
for {
  p <- persons //generator
  n = p.name // definition
  if(n startsWith "What?") //filter
} yield
```

#### Generators
General form of `pattern <- expression`.  Where pattern iterates all of the results from expression.  for-comprehension begins with a generator.

#### Definitions
General form of `pattern = expression`.  Binds pattern to the value returned from expression.  Same effect as writing `val pattern = expression` out of the for comprehension.

#### Filters
General form `if (expression)`, which drops all elements from the iteration which the expression returns false.

Long Example:
```scala
case class Person(firstName: String, lastName: String)

val people = List(
  Person("Chris", "Paika")
  Person("Chris2", "Paika")
)

val namesStartingWithC = for {
  person <- people
  name = person.firstName
  if(name startsWith "C")  
} yield name.toUpperCase
```

I promise - I wrote that without peaking at the solution!

#### Chapter 44: Writing a class for a for-comprehension
This chapter’s short so I’m going to stick with it.

For-Comprehensions get converted by the compiler into a sequence of:
* `map`
* `flatMap`
* `foreach`
* `withFilter`

So as long as you have a class that implements those four methods, it can be used inside of a for comprehension.  Technically you can implement a subset of them and have an access to a subset of a for-comprehensions ability, but that’s just complicated.