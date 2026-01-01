---
layout: post
title: "Future Contracts for GPU's"
date: 2026-01-01 15:00:00
categories: blog
tags: machine-learning
---

<div style="background-color: #fefcf3; border: 1px solid #e8e4d9; border-left: 4px solid #d4c89a; padding: 12px 16px; margin-bottom: 20px; border-radius: 4px;">
  <strong>Document Status:</strong> Back of the envelope math and my brainstorming.
</div>

If we expect AGI within 1-3 years, GPU pricing becomes the most critical input to intelligence.  OpenAI says it all the time "we need more compute!".  How should we expect compute prices to change? 

**TL;DR - the price per GPU hour could potentially 10-100x in the next few years as we face a power crunch and strong demand.**

GPUs do thousands of parallel computations at a time, well suited to the matrix multiplication required for language model training and inference, generating tokens.  But GPUs themselves do not produce tokens. A GPU sitting on a shelf is an incredibly sophisticated (and valuable) paperweight.  GPUs need to be put on land, racked, cooled, networked, and powered to do inference and training.

### Total Cost of Ownership
Let's analyze an NVIDIA B200 - currently a B200 costs roughly 35,000 to purchase. Let's amortize the cost over 3 years (rough estimate of a GPU lifespan).


| Component | $/hr | Notes |
|-----------|-----:|-------|
| Hardware (amortized) | $1.77 | $46.5k over 3 years |
| Power | $0.12 | 1.3 kW @ $0.09/kWh |
| Facility | $0.36 | Datacenter rent + maintenance |
| **Total (100% util)** | **$2.25** | |
| **Total (60% util)** | **$3.75** | More realistic utilization for cloud GPUs|
| **Cost per PFLOP-hr (100%)** | **$1.00** | B200 = 2.25 PFLOPS FP16 |
| **Cost per PFLOP-hr (60%)** | **$1.67** | |

A big question is the utilization - ideally you maintain a high utilization of your GPUs for private clusters. For clouds, 60% utilization is likely more realistic.

### How has GPU pricing changed?

The broad trend is that the cost of the GPU per TFLOP-hour has dropped exponentially over time:
![NVIDIA GPU Cost per TFLOP-hour across generations](/assets/nvidia_gpu_cost_per_tflop_hour.png)
Similarly with TFLOPS/Kilowatt hour:

![NVIDIA GPU TFLOPS per Kilowatt across generations](/assets/nvidia_gpu_tflops_per_kw.png)

### How do we expect this to change?
Cost per-GPU hour is somewhat of a useless metric - new GPUs will continue to increase FLOPS, for better prices following the modern arc of Moore's Law.  What's more interesting is the PFLOP/hour cost. That's a more objective metric, across GPU generations and models.  It's not perfect - modern models are a lot more limited on memory bandwidth for example - but it's more representative than GPU hour.  Currently, 1 PFLOP-hr of B200 compute is 2.22$/hour on Lambda labs.

The big driver for change will be AGI - if we have models at human level, then pricing demand for LLM tokens could roughly equal that of humans.  If a human and machine are equivalent, you'll hire the machine if the machine is 10% of the cost (still plenty of margin for the model provider!). 

Conservatively, 1 PFLOP-hr of compute can generate 1 million output tokens. So 2.22$ per million tokens.

#### What does a human cost?
A human worker can think at roughly 1 token/second for 8 hours a day, so roughly 30,000 tokens per day. With three weeks vacation per year, that's 7.3m tokens per year from a human. For white-collar work, let's assume an average human salary of 150,000$.  That's 20,000$/million tokens!

**Human tokens are ~10,000 times more expensive than LLM tokens**

### What does this mean for GPU demand?
It seems likely that in a GPU constrained world, where a B200 is the equivalent of 2,000 humans that never sleep, the price of a GPU hour will go much, much higher. If the model companies can charge higher API pricing for more intelligent model tokens, they'd likely be willing to pay 10x for those GPUs. The margins will be incredible still - and the AGI workers will still be cheaper than human knowledge workers, since human knowledge workers are so expensive.

### Market saturation
Could AGI crater demand and pricing for white collar knowledge work, impacting this estimate? Most likely in some form. But it's hard to predict or understand how, human desires are infinite and the economy will be a growing pie.

### Can we trade on this?
There is early work on financial futures - [H100/USDT](https://helixapp.com/futures/h100-usdt-perp/). I expect to see much more of this in the future - similar to how futures on grains, corn, etc allow farmers to hedge risk, futures on GPU-hours will allow datacenter companies to hedge risk. This will be critical as GPUs become the critical input into global intelligence.

I'm not trading on this today - but it's an interesting thought experiment.  I expect to see much more solar and battery non-grid connected datacenters, as the capex investment becomes worthwhile at 5-10$/hour H100 prices.
