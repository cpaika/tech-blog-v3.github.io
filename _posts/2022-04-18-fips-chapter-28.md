---
layout: post
title:  "FPS: Chapter 28 - 30"
description: "Starting Recursion"
date:   2022-04-18 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---

This chapter starts us down the functional programming & recursion rabbit hole.  Not going to say I'm excited, but I'm willing to suspend some disbelief.

The author clearly had trouble learning recursion.  I'm going to take a guess and say he doesn't come from a traditional CS academic background?  Checked on it and the author comes from aerospace!  How cool.  I think a lot of this will be a refresher for me.

What is recursion?  A **recursive** function is a function that calls itself

Recursion is necessary in functional programming because otherwise you would have to for/while iterate over mutable state, which is a no-no.

Problem with an iterable for loop and mutable state:
1. It's a lot of stuff to keep in our head at once, brain only has so much RAM
2. Code doesn't look like algebra (IMO this is a dumb reason)
3. In pure FP there are no var fields, treat them like a crutch.

### Let's look at lists (chapter 30)
For a list in FP, head is the first element and tail is the rest of the elements of the list.

The default Scala list is a linked list.  The last value of a Linked List is a `Nil` value.  The object of a value and a pointer to the next object is called a `cons cell` in the Lisp world.

An empty list has one cell with a Nil element.

Side note:
`null` is an instance of `Null`, the type.  It extends all types by default.  `Nil` is an empty singleton of a `List` element.  The very last element of a list must be a `Nil` element.

```scala
val x = List(1,2,3)
val y = 1 :: 2 :: 2 :: Nil
// x == y in this case, isn't y weird syntax?
// And don't forget, the :: Nil is required by the Scala compiler.
```

These chapters were pretty basic, the next few will dig into the meat of recursion with functional programming
