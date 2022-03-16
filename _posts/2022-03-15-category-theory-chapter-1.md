---
layout: post
title:  "Category Theory For Programmers - Part One"
description: "Intro to Categories"
date:   2022-03-16 09:00:00 -0400
categories: blog
tags: category-theory
---
A category consists of objects and arrows that go between them.  Arrows are also called morphisms.  Arrows compose, so if you have a A->B and B->C, you can also A->C.

Composition is associative, it doesn't matter how you order the parenthesis (f∘g)∘h is equivalent to f∘(g∘h)

For every object there is an `identity` function, which takes a type and returns the same type.  This serves as the unit of composition:
```scala
def identity[A](a: A): A = a
```
I've seen this before in Scala, so interested in how this is functionaly useful!

If we have:
```scala
val f: A => B
```

Then `identity on A` is a function that returns the same arrow when it is composed with an arrow that start or ends on A - it's a no-op:
```scala
f compose identity[A] == f
identity[B] _ compose f == f
```

The author's claim is that the identity function is comparable to 0, and useful for working with higher level functions.  I'm sure that will become obvious as the book progresses.

He then has a higher level chapter, arguing the essense of programming is both decomposing large problems into smaller ones, and then composing them back together.  He argues the need for decomposition into small pieces is because our brain can only handle so much in our working memory, which does make intuitive sense.

#### Challenges
1.  Implement an identity function in your favorite language:
Well this is a bit unfair since the book has Scala examples:

```scala
def identity[A](a: A): A => a

val hello = identity[String]("Hello")
println(hello) // "Hello"
```

2. Implement the composition function in your favorite language
Well this is totally cheating:

```scala
def f(s: String): String = { 
  s + "f"  
}

def g(s: String): String = {
    s + "g"
}

val gComposeF = g _ compose f _
println(gComposeF("e")) // "efg" 
```

There's no way around it, that syntax is clunky.  Not sure the significance of the underscores yet.

3. Write a program that tries to test your composition function respects identity:

```scala
val sameFunction = f _ compose identity[String] _ 
println(sameFunction("e")) // "ef"
println(f("e")) // "ef"
```

4. Is the world wide web a category in some sense? Are links morphisms?
This is the definition of a leading question lol.  I know I'm supposed to say "yes" but I really don't see it.  Webpages are individual things, not a type.  Links don't convert you from one type to another, they just return a new webpage regardless of the origin. I don't believe this analogy stands, but I'm early on so maybe this will become clearer over time.

5. Is facebook a category, with people as objects and friendships as morphisms?
Again, this just seems like a directed graph.  I'm struggling to understand how it's a category.

6. When is a directed graph a category?
This is just too heavy on the math theory for me right now, I look forward to an explanation in the book!