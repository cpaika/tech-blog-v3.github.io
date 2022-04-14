---
layout: post
title:  "Functional Programming Simplified: Chapter 26"
description: "Multiple Parameter Groups"
date:   2022-04-14 10:00:00 -0400
categories: blog
tags: functional-programming-simplified
---

I had a great day at work yesterday, that I believe was all due to purposefully learning Scala in the morning.  Going to keep doing this until I finish the book!

Scala functions can have multiple parameter groups, I knew that:
```scala
def sayHello(firstName: String)(lastName: String) = ???
```

This gives the benefit of:
* Have implicit and non-implicit parameters (this I already knew)
* Facilitates type inference (don't understand this yet)
* A parameter in one group can use a parameter in the other as a default value (sounds complicated as hell)

Example:
```scala
def sum(a: Int)(b: Int)(c: Int) = a + b + c

sum(1)(2)(3) // 6
```

### Making your own control structures:
This gives us the wacky ability to do that, for example with a custom `whilst` loop:
```scala
var i = 0
whilst (i < 5) {
  i++
}
```

Notice how the while loop is two parameters - (i < 5) that returns a Boolean, and the `{}` block

The second parameter in this case is a by-name parameter that gets evaluated every time it's called

Example function signature:
```scala
def whilst(testCondition: => Boolean)(codeBlock: => Unit) = ???
```

`testCondition:` is a by name parameter because if it wasn't, it would be evaluated only once at the beginning of the function execution to 0 < 5, and be summarized to true.  By-name means it is evaluated new every time.

`codeBlock:` being by-name is because that's what allows you to pass a code block.

Important to note by-name parameters do not have types, they are like a `def` method.

Example of a double if statement:
```scala
ifBothTrue(first: => Boolean)(second: => Boolean)(code: => Unit): Unit = {
  if(first && second) {
    code
  }
}
```

Notice how you can call by-name parameters like that `code`


### Implicits
Implicits in a function definition will automatically be passed if they are in scope when the function is called.  I knew that already, but what I didn't conciouslly understand was that the second parameter group is key - the implicit needs to be defined in the second parameter group to be automatically passed.  The Scala compiler needs the implicit to be in a second parameter group to be able to either autofill it or throw a compiler error that the implicit hasn't been passed.

Don't overuse implicits, they are nice for shared context that needs to be passed around.  Think of them as an alternative to dependency injection.

For example, an `ActorSystem` creates an `ExecutionContext` that gets passed around via implicits to most Akka functions.  Much easier than manually passing it yourself.

For implicits, a method can only have one implicit parameter list and it has the be the last parameter list

### Default Values

You can always specify default values:
```scala
def f2(a: Int= 1)(b: Int = 2) = {a + b}

// You need the parenthesis to get the default values:
f2()()
```

Next up is partially applied functions!

