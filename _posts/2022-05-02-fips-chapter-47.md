---
layout: post
title:  "FPS: Chapter 47”
description: “Making Sequence class work in a for comprehension”
date:   2022-05-02 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---
We can’t currently `for/yield` over the `Sequence` class from the last chapter.  We’ll have to add a `map` method to Sequence:
```scala
def map[B](f: A => B): Sequence[B] = {
  val abMap: ArrayBuffer[B] elems.map(f)
  Sequence(abMap: _*) //funky syntax
}
```
`_*` is an operator used to adapt a collection to a varargs input.

After adding a map, this for comprehension works:
```scala
val seq = Sequence(1,2,3)
for {
  i <- seq
} yield i*2
```

The above just gets converted into a map by the compiler.  The `foreach` we added to Sequence in the last chapter is used for a different `for`, a for loop.

Hands hurting today so I’m going to take it easy and stop here.
