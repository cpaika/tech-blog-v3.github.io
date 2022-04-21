---
layout: post
title:  "FPS: Chapter 35 - 37"
description: "Recursion Continued"
date:   2022-04-21 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---
### Chapter 35: Thinking recursively
This seems to be an overview of recursive programming and base cases

Three things to consider writing a recursive function:
- What is the function signature
- What is the base case
- What is the actual algorithm (lol this is really one of them?)

With recursive functions always have a base case to avoid a StackOverflowException

There's something interesting about identity elements and base cases' but we're going to learn that later.  

Pretty boring chapter.

Chapter 36: JVM Stacks and Stack Frames

Yay! Something I'm less familiar with.  Functions need to be "tail recursive" to avoid blowing the stack when you are processing a lot of data.  

Default Java stack size is 1024 KB, so if your stack breaks that you will get a StackOverflowException.

Every programming language has a notion of a call stack.  Just going to recite the JVM Wikipedia definition:
> Every JVM thread has a private Java virtual machine stack, created at the same time as the thread.  A JVM stack stores frames, also called "stack frames".  A JVM stack is analogous to the stack of a conventional language such as C - it holds local variables and partial results, and plays a part in method invocation and return.

Each thread has its own stack, which has its own set of frames.

A Java stack stores a thread's state in discrete frames.  The JVM only does two operations on stacks, it pushes and pops frames.

The method being executed is the current method, which has a current frame.  The current constant variables of the class is the current constant pool.

When a method is invoked, the JVM creates and pushes a new stack frame.  What is a stack frame?  A stack frame has local variables, operand stack, and frame data.

The size of the local variables and operand stack depends upon the needs of the current method, determined at compile time.  This means the stack size changes based on the method.

Word size is a unit of measure, varies based on the JVM implementation but usually is 32 bits.

Operand stack is RAM that's used as a working area in a stack frame.  It's a stack inside of the frame that calculations add and remove from.

A constant pool contains static and runtime constants.

So:
* When a method is invoked, a new stack frame is created
* Stack frames can have different sizes
* Code only has access to the data in the topmost stack frame

The stack is for tracking method invocations and variables.  The heap is where the JVM creates variables and does computations.  The stack is usually much smaller than the heap, because most programs don't have deep call stacks.  But recursion can create deep call stacks, and create a stackoverflow error!  When you write recursively, keep track of the maximum depth of a recursive function.

### Chapter 37: A visual look at stack frames
This chapter seems like it will be useless.

It was a nice review, but skimmed it.  Next chapter is Tail-Recursive algorithms which should be great.
