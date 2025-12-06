---
layout: post
title: "Neural Network from scratch in Rust with WASM"
date: 2025-12-6 8:26:00
categories: blog
tags: machine-learning
---

My first attempt at a [bird classifier in Rust with Candle](https://paika.tech/blog/2025/10/21/starting-with-ml.html) ended up being mildly effective, but overall hit a 70% accuracy rate and I wasn't able to get it much higher just playing around with parameters.

I decided to pivot and start from the basics and build my way up - train on a model on the [MNIST Database](https://en.wikipedia.org/wiki/MNIST_database), a training set first constructed in 1988. This project is inspired by the wonderful [3Blue1Brown Neural Network course series](https://www.youtube.com/watch?v=aircAruvnKk&list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi).

General goals for the project:
1. No machine learning dependencies - I'll write the algorithms myself, from scratch to learn the fundamentals
2. Use Claude Code to build on the fundamentals I write by hand, and do the additional features - visualizations, observability, etc.
3. Build up incrementally - I'll start with naive implementation of the MNIST dataset, add in new datasets, add in distributed training, etc so I can build towards and understanding of the foundations of Deep Learning.
4. Do a lot of WASM visualizations - one of the benefits of Rust is its ability to easily compile to WASM, and I can use that to share my progress on this blog.

I started my Rust monorepo, [rust-ml](http://github.com/cpaika/rust-ml). Why not python? I love Rust, am comfortable with it, and it's a performant language. I'm sure I'll be able to make a lot of progress, and if I'm building things from scratch I don't need the Python ecosystem.

First I needed to visualize the MNIST dataset, so I could understand what it looks like. This seems to be an important part machine learning, understanding your data.

To do that I built the [MNIST Dataset Browser](/assets/numbers-browser/) - a small WASM program that allows you to browse the MNIST images and see their labels.  It's a bit slow to render, but gets the job done and I can easily get a sense of the data.

Next I needed to build the Neural Net. I started with an incredibly naive approach, doing it in an object-oriented way. This won't scale well, but is an intuitive human way for me to start before I move on to pure matrix multiplication.

This I built myself, with no Claude so that I could understand the algorithms: [Neural Network Library](https://github.com/cpaika/rust-ml/pull/1/files#diff-71aa6e34bc3f2204ee3d395c2e5f8b66bcd748c9c36a7d230c13916733edeef6).

The first implementation doesn't have forward passes or back propagation, which is fine. I just want to get the structure down.  Again, iterative improvements.

Then finally, I need a way to visualize the neural network library I just made!

That's where the [Neural Network Visualizer](/assets/neural-viz/) comes in. This is going to be critical component to help me reason about what the neural network is doing. This loads the MNIST dataset, as well as rendering my neural network library.  Right now it doesn't show activations because I don't have forward passes or training runs, but soon!

That's it for this chunk of work - next up I'll implement training runs, forward pass, and observability on my neural network library training runs.