---
layout: post
title: "Distributed S3 LLM Eval"
date: 2026-01-12 21:00:00
categories: blog
tags: machine-learning
---

Building on my [LLM eval framework](https://paika.tech/blog/2026/01/11/anode-evals.html), I added a much harder test - build a three node distributed S3 cluster. The eval would run the binaries, and do chaos testing - killing nodes, recovering them, etc.

This is a really hard problem - it requires the LLM to implement a RAFT layer (even using a raft rust library, this isn't trivial), the full S3 API, and storage redundancy.

By default, Haiku/Sonnet/Opus were middling - succeeding between 20-80% of the test cases.  Occasionally scoring 100% depending on luck.  I can't control the temperature of Claude Code so unfortunately would have to run the evals many times to get statistically sound results (and that would cost hundreds of dollars). 

What's interesting is when you add in [Ralph Wiggum](https://github.com/frankbria/ralph-claude-code) this got much better - Ralph basically got it 100% of the time, even with Haiku. Building a distributed S3 is a hard problem! I didn't expect haiku to solve it..

Have I been using LLM agents completely wrong? I've usually told Claude to implement a feature, following TDD. It seems like it would be much more efficient to instead have Claude build an eval framework for the feature, and then run a Ralph loop that doesn't let the agent stop until the eval tests are 100% passing.
