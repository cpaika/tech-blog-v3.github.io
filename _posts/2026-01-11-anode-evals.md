---
layout: post
title: "Making my own LLM Agent Eval Framwork"
date: 2026-01-11 19:00:00
categories: blog
tags: machine-learning
---

Recently I've been interested in Reinforcement Learning, particularly in evals - how do we measure language models' effectiveness as agents?

It used to be easy to evaluate the effectiveness of the most recent models - I had an informal list of problems in my head, and when a new model came out I would give them one of those problems and see how it did. But recently the models have gotten very good and my informal benchmarks got saturated.

So I wanted to create a system for evaluating agents that was more scientific. The basic flow is quite simple! Create a framework that:
1) Takes a prompt and a set of agents to run it on (a tuple of agent harness and model, ie: claude code with opus 4.5)
2) Spins up a container on kubernetes configured with the agent harness, the prompt, and the eval tests
3) Polls the container to make sure the agent doesn't stop or crash, and has a timeout if the agents get stuck
4) When the agent is done, run the evaluation tests and record how many tests pass and how many tokens the agent used, and the total cost via the token cost for that model.

I whipped it up with claude code and it actually came out really good: [github/anode-evals](https://github.com/exo-anode/anode-evals). The agents running in Kubernetes (locally via [kind](https://kind.sigs.k8s.io/)) is a nice abstraction - easy to spin up agents and gather their logs.

My first eval to get the system working was basic - having Claude Haiku, Sonnet, and Opus all try to write a hello world function. They all succeeded :)

Next was harder - write a CRUD CRM for creating and retrieving contacts. They all did great at this too. Interestingly, Haiku was the most cost-efficient model - even though it took more tokens than Sonnet or Opus, it was significantly cheaper. This is an interesting mental model - it's hard to know ahead of time if your problem is simple enough for a cheaper model. But if you do - you can save a lot of money, here haiku solved the problem 10x cheaper.

  ┌────────┬──────────────┬───────┬──────────────┬───────────────┬───────┐
  │ Model  │ Success Rate │ Turns │ Input Tokens │ Output Tokens │ Cost  │
  ├────────┼──────────────┼───────┼──────────────┼───────────────┼───────┤
  │ Opus   │ 15/15 (100%) │ 27    │ 841,142      │ 7,633         │ $2.64 │
  ├────────┼──────────────┼───────┼──────────────┼───────────────┼───────┤
  │ Sonnet │ 15/15 (100%) │ 20    │ 536,567      │ 5,399         │ $0.35 │
  ├────────┼──────────────┼───────┼──────────────┼───────────────┼───────┤
  │ Haiku  │ 15/15 (100%) │ 29    │ 1,001,267    │ 10,896        │ $0.25 │
  └────────┴──────────────┴───────┴──────────────┴───────────────┴───────┘

Next one I'm working on is more difficult - create an S3 compliant API.  At first I'll have it be a single node, then I can expand it to be a more complicated distributed S3 cluster and have the eval framework run chaos tests.

I think this is actually really interesting idea - you can just have the models try to recreate existing distributed systems, from scratch, and see how well they do by using the existing clients (ie: postgres clients, s3 clients) as the verification layer. The models can't rewrite Kafka from scratch yet - but they can write an eval to prove that they can't, that prompts them with building a Kafka-compliant API running in Rust that handles chaos. And when the next generation of models can rebuild Kafka from scratch, I'll know!

If I build up ~10-20 of these evals, and use them on different agents, I should be able to more easily have a private eval that I can use to evaluate new models and get a sense for what models are SOTA at a given time.  Also a sense for what the cheapest models can do, since its advantageous to use the cheapest models if you know in advance they can handle a task.

### Followup
There are so many interesting things to follow up on here:
- How to avoid [reward hacking](https://en.wikipedia.org/wiki/Reward_hacking)?
- Adding in Codex, OpenCode, etc.
  - "Does Opus do better in OpenCode or Claude Code?" is a very interesting question I'd love an answer to!
- Adding a dashboard for publishing a leaderboard
