---
layout: post
title:  "FPS: Chapter 38 - 39"
description: "Tail Recursive Algorithms"
date:   2022-04-21 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---

### Chapter 38
We're going to learn tail recursion, which prevents us from overflowing the stack when you have algorithms that use heavy recursion.

With tail recursive functions, the compiler can optimize it so it only takes on stack frame - you do so by writing a function which calls itself as the final action.

The `sum` function previously written in other chapters is not tail recursive:
```scala
private def sum(list: List[Int]): Int = list match {
  case Nil => 0
  case x :: xs => x + sum(xs)
}
```
The last action here is that we add `sum(xs)` to x.  The last action is not `sum(xs)`, so it's not tail recursive - that's just order of operations.

The `@tailrec` annotation makes it so scalac will fail compilation if the method is not tail-recursive.

So how do we write a tail recursive function?

Here's my try without looking:
```scala
private def sum(list: List[Int]): Int = list match {
  case x :: Nil => x
  case x :: xs => ???
}
```

I wasn't very successful.  The answer is:
1. Leave the function signature alone
2. Create a second private function thats a duplicate of the original except it's `@tailrec`
3. Modify the second function so it uses an "accumalator"
4. Call the second function from first

Example with sum:
```scala
def sum(list: List[Int]): Int = list match {
  sumWithAccumulator(list, 0) // seed value aka accumulator
}

@tailrec
private def sumWithAccumulator(list: List[Int], accumulator: Int): Int = list match {
  case Nil => accumulator
  case x :: xs => sumWithAccumulator(xs, accumulator + x)
} 
```

So the accumulator acts as a form of global state to allow the tail recursion to happen.  We still have the original `sum` signature to hide the implementation details from someone calling this.

The final difference is to put the `sumWithAccumulator` function within the `sum` function, so it's not calleable outside of that function at all.

Usually you want to write your algorithm with normal recursion, and then adapt it to be tail-recursive.  This was a hard chapter, well done!

### Chapter 39: State

This seems like it'll be a bad chapter.  State is the state of a system, yeah okay I agree.  Every application maintains state - yes totally.  Next chapter will show how we can use state in a functional language, where we can't mutate variables and I/O itself is considered impure.


