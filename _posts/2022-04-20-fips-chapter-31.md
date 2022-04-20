---
layout: post
title:  "FPS: Chapter 31 - 34"
description: "Recursion"
date:   2022-04-20 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---

### Chapter 31

Let's write a `sum` function using recursion!

```scala
def sum(x: List[Int]): Int = {
  if (x.isEmpty) {
    0
  } else {
    x.head + sum(x)
  }
}

// alternative
def sum(x: List[Int]): Int = {
  x match {
    case Nil => 0
    case head :: tail => head + sum(tail)
  }
}
```

In the case example, you could obviously use any variable name, for example `h :: t`, it doesn't matter.  In recursion, `x` is usually a single element and `xs` is usually multiple elements.

### Chapter 32
My lucky number!  This chapter is a descrpiption of how a recursive function works - I already know this, but will summarize basics.

`Nil` is the base case of a recursive function on a `List` in scala.  Makes sense. `case Nil => ???` should be your recursive functions base case.

The author mentions that recursive calls unwind, as a function returns and the call stack gets rewound.

### Chapter 33 Visualizing the recursive sum function
The author uses a UML diagram to show the function execution, it works pretty well.  Pretty useless chapter though.

### Chapter 34: Recursion - A conversation between two developers
Didn't learn anything from the chapter, but did enjoy the question -> answer format.  Eliezer Yudkowsky uses a similar format to write, I might copy it to further develop my arguments.


