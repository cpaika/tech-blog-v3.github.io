---
layout: post
title:  "Functional Programming Simplified: Chapter 27"
description: "Partially applied functions and currying"
date:   2022-04-14 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---

This chapter will obviously talk about currying and partially applied functions.

`Currying` means that a function that takes multiple input parameters can be transformed to a series of functions that each take a single argument.

`Partially applied functions` are when a function is applied to some of it's arguments.  A function that takes a function and returns the same function with fewer parameters (although this definition is confusing)

```scala
def plus(a: Int)(b: Int) = a + b

def plus2 = plus(2)(_) //Underscore acts as a placeholder
println(plus2(4)) // 6
```

PAF's allow you to create specialized functions from more generic ones.  You partially apply parameters to the general function to create a specific one.

```scala
# Can create a instance of a function:
def add(x: Int, y: Int) = x + y
val addFunction = add _

val addCurried = (add _).curried
addCurried(1)(2)
```

Calling `curried` created a function with two parameter groups

Can also make PAF's without multiple parameter groups:
```scala
def add(x: Int, y: Int) = x + y
val add2 = add(2, _: Int)
add2(2) // 4
```
Currying a function is translating a function taking multiple arguments, into a series of functions that each take a single argument (aka multiple parameter groups).  PAF's are a function you manually create by supplying fewer parameters then the initial function define. I'm going to be honest, this wasn't a great definition of function currying!

Next chapter is about recursion, can't say I'm super excited but I'm going to get it done.
