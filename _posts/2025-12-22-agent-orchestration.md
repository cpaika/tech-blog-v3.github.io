---
layout: post
title: "Multi-Agent Orchestration"
date: 2025-12-23 22:45:00
categories: blog
tags: machine-learning
---

With Claude Opus 4.5, coding is effectively solved. But any good developer will quickly realize the problem - agents are slow!  You can watch one working, and occasionally you'll provide input, but many times you are sitting around for 5+ minutes at a time not being productive.  You can't do something else, since you need to make sure the agent is on track.

This is a hard limit dictated by current inference hardware - there are interesting companies trying to speed up inference, but with current NVIDIA hardware token/second is within OOM of its theoretical maximum. Not only that, but an agent working on a feature may be limited by build times, and other inherently sequential slow tasks. One agent can only move so fast on a task.

So how do you improve speed of output? You can't make an individual agent significantly faster.

The obvious answer is parallelism. Run multiple agents at once. However this quickly reveals the next bottleneck - human attention.

Every human can multitask differently - I consider myself a 6/10 multitasker, and I can handle about 2 Claude Code instances and maintain productivity.  In a stretch I can handle running 4 agents simultaneously, but I start to lose track of what each is doing. I find my mental state begins to degrade and I start doing badly at directing all of them. So usually I limit myself to 1-2 agents at a time.

So how do we scale parallelism further? This is the key question - how many agents can a human run at once?  Of course the definition of an agent is a bit blurry - we're used to agents being a independent cohesive thing, not something that can morph and split the way a model context can. The better phrase would be "how can we maximize tokens per second effectively pursuing a human goal?"

The true answer to this will be quite alien and unimaginable. It's something thats discovered, not rationally designed. But a good place to start is mimicking human organizational forms. This is fundamentally flawed - humans can't be cloned, merged, are differently intelligent than models, need to sleep, etc.  Human organizational structures are built around human limitations. However I believe human organizational forms are a good starting place to begin discovering the deeper forms of multi-agent collaboration.  We know agent's impersonate humans, and human organizations work.

The questions to ask and answer through research that will guide their economic utility:
- Are multi-agents more time efficient than a single agent?
  - **Prediction**: Yes
- Are multi-agents as effective as a single agent?
  - **Prediction**: No for tasks that a single agent could solve, yes for tasks that a single agent couldn't solve
- Are multi-agents as token efficient as a single agent?
  - **Prediction**: No, for a task that can be accomplished by a single agent I assume multi-agent is 2-5x token inefficient

Architectural questions we'll need to answer through engineering research:
- What durable execution framework wins as the agent runner?
  - **Prediction**: [Temporal](https://temporal.io/)
- How do agents communicate?
  - Likely through NATS or another durable message passing framework
- How do we direct many agents?
  - Can take inspiration from hierarchical corporate structures - "managers" with subordinates rolling up to a CEO
- How do agents pursue goals collectively?
  - This is more difficult - agents will need to be aligned to pursuit of a goal, and coordinate with each other to avoid stepping on toes.
  - How do humans do this? Git, Jira, and meetings! Unfortunately.  I think similar primitives (task managers, git, global high frequency message passing) are useful for agents to begin their collaboration.

While multi-agent systems have been science fiction for a long time, they're now something we can actively play with and research. This is an exciting time.
