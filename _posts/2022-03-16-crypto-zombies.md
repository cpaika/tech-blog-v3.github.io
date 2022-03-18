---
layout: post
title:  "Cryptozombies! Lesson One"
description: "Intro to Ethereum"
date:   2022-03-16 21:00:00 -0400
categories: blog
tags: cryptocurrency
---

After far too long watching crypto from afar and being fascinated, it's time to dive in.  A twitter friend recommended cryptozombies.io as a good learning platform so giving it a try!

Solidity is Ethereum's native language.  Code is encapsulated in contracts - all variables and functions belong to a contract.  File extension is `.sol`

Always start your code with the version prgram, a declaration of the Solidity compiler you are using.

Here's an bare bones contract:
```solidity
pragma solidity >=0.5.0 <0.6.0;

contract HelloWorld {

}
```

State variables are stored in contract storage, written to the blockchain.  So this is durable storage.

```solidity
contract Example {
  // Persistent storage
  uint unsignedInt = 100; // non negative obviously
}
```

Solidity has structs, which I'm surprised they don't have more complicated object system.  We'll see what more they have.

Type definitions are lower case, `string`, `uint`, etc.

Solidity has dynamic arrays built in to the language which is pretty great:
```solidity
//dynamic
uint[] dynamic;
uint[2] fixed;
```

You can make a variable public, which makes a getter function and allows other contracts to read but not write the data.  That feels very powerful, and is the whole point of crypto - data sharing!

Funny how the `public` keyword is after the type definition:

```scala
Zombie[] public zombies;
```

Functions looks normal, somewhat similar syntax to what I'm familiar with:

```solidity
function writeBlog(string memory _name, uint _amount) public {

}
```

Again we have the public syntax for exposing the function.  The `memory` keyword is necessary for types that pass by reference, to signify if something should be stored in memory or on the blockchain I assume.

It's convention to start function parameter variable names with an `_`.

Solidity has the concept of passing by value or reference.  

Structs are pretty straightforward to create and initialize:

```solidity
struct BlogArticle {
    uint id;
    string content;
}

BlogArticle[] public articles;

BlogArticle article = BlogArticle(1,"Hello World");

articles.push(article)
```

Functions are public by default in Solidity, which means other smart contracts can call your function and mutate your state.  It's best to mark functions are private therefore.

```solidity
function _test(uint _test) private {

}
```

It's convention to start private function names with a `_`.

Function return types are also pretty standard, if verbose:

```solidity
function sayHi() public view returns (string response) {
    return "What's up!";
}
```

We marked this as a `view` function because it's not mutating any state and is only viewing state - I assume that gives us some performance boosts or something. 

The above function could also be marked as `pure` since it doesn't even view state, it just accesses the function return parameters.  The Solidity compiler will tell you when to mark it - I'm surprised it doesn't just automatically figure it out so you don't need the keyword at all.

Apparently secure random number generators are a big problem which makes sense, there's a lot of attack vector's if you can compromise the RNG.

Solidity has typecasting - yay?  Always hate typecasting.

Solidity has `events`, which are published to the blockchain for front end apps to listen to:

```solidity
event Hello(string hello);
emit Hello("Hello World!")
```

Ethereum has a wrapper library for javascript, makes sense.

### Impressions
Initial impressions are they are really trying to gamify this site.  Perfectly fine, but doesn't work too well for me - it feels a little infantilizing.

Definetly focuses on hands on practical knowledge, without much theory.  Excited for a book to get some theory but this is great for stepping in.

It's definetly nice to see the reality of Ethereum - reading other people's opinions is great, but there's so much FUD in this space.  It's refreshing to find solid ground and build ideas for myself.