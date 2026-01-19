_posts/2026-01-18-temp-title.md ---
layout: post
title: "LLM Agent Operations - On Trust"
date: 2026-01-18 17:00:00
categories: blog
tags: llm agents machine-learning
---

Working on the [Presidential AI mentions](https://paika.tech/assets/presidential-ai/index.html) made it obvious to me how good LLM agents (particularly Claude Code) were at doing operations.
I had the LLM do it all - I just gave it root access to an AWS account, and it created the buckets, SQS queues, ECR, ECS, all the good three letter services.  Stitched them all together and I just operated the system via chat (hey add more videos to transcribe, please scale everything down since we're getting throttled, etc).

I think people don't understand how good the models are at infrastructure because people are scared to give them access. For good reason - 4 months ago I would've never given the model access to an AWS account linked to my credit card.  But the nature of scaling laws is that the models are getting better, exponentially.  By the end of 2026 I'm predicting the best companies will have their LLMs doing operations, particularly incident response.

Incident response is a unique part of a software engineer's role.  Most of the day-to-day is just writing code, talking to people, "aligning stakeholders".  And then you get a P1 page, thousands to millions of users are having issues, and all of a sudden your job ratchets to 100% go-mode, stress pumping, and you triage, dive in, and try to take careful action to bring the system back to a steady state. It almost feels like a different job, and for people who like intensity it can be the most rewarding part of the role.

But incident response has a lot of issues:
1) It requires humans "ready to go" at a moment's notice so you need 24/7 on-call shifts which interrupt people's lives
2) Humans need sleep. If an incident fires when they're sleeping, the human is probably groggy and may not make the best decisions
3) Humans can goof off - even if they are supposed to be on-call, they may play hooky and go to a restaurant or have a beer and become either unavailable or not as sharp as normal.
4) Not everyone knows everything about the system - for on-call shifts that span large systems, it's unlikely the on-call engineer deeply knows everything they are on the hook for.  Good documentation is key but they still may be missing information in the moment when the incident fires.

The industry has largely tolerated these problems because there's been no other way to make it work.  But with LLMs now approaching (and often exceeding) human level performance it's clear they are going to be brought into the rotation to augment and eventually replace the human operators.

But how do we get there? And if the models are good enough to do the work today (they are), why aren't they already?

The core missing piece is *trust*.

A human being needs to *trust* that a model will behave responsibly and intelligently. Giving a model root access to the production database is scary. Giving root access to other humans is scary!  Nevermind to an AI system that we don't really understand.  Trust isn't earned in a day - trust is built over time, through steady demonstration of reliability.

So for companies and organizations to adopt LLMs into the on-call rotation, the focus should be on building trust. That's number one. Plenty of companies will make "LLM Ops" - but everyone will feel uncomfortable enabling it until they trust it.

### Earning Trust
So how can we help human organizations begin to trust the models, as quickly as possible?

An additional challenge is what exactly are they trusting - any old model to do operations? A specific model?  What happens when the next generation of that model comes out? What about if the model provider secretly quantizes the model behind the scenes?

I think a way to earn trust would go as follows:
1) Create an SRE bot with access to:
  a) Your observability metrics system
  b) Your alerting systems
  c) Your documentation
  d) Your codebase
2) Iterate with the agent's prompt to get it returning good results
3) Integrate that SRE bot into your messaging platform of choice, so humans can @ it during an incident to get its opinion
  - At this point there's light risk being introduced of the agent giving plausible yet false results wasting time during an incident, so this should be exercised with caution
4) Reflect - as a team, regularly review the SRE bot's suggestions and see how it's useful or if prompt improvements could be made
5) Allow the model to triage and propose PR fixes/commands to run independently for low priority alerts, for example in an engineering environment.

At this point, via regular reviews the team would be earning confidence (or not!) in the bot's actions. Transitioning to step 5 would be welcomed - most teams I've seen have a steady stream of low value alarms that everyone has on their list to fix/tune/update but never gets around to. Letting the model clear up low value noise would be a breath of fresh air.

#### Model Upgrades
This doesn't solve for the problem of model upgrades.  You develop trust with Opus 4.5, and Opus 5 is released.  What do you do?

The naive approach is to trust the lab - Anthropic will use similar technology to train Opus 5 as they did Opus 4.5. You can trust the next model is similar but better - maybe.  But when you're talking a blast radius of millions of users, "maybe" isn't enough.

The answer is evals. Whenever an incident happens, you capture a recording of all the monitoring and metrics of the system at that time as well as the proposed operation that remediated the incident.

This is actually a really hard problem - ideally you don't just replay the incident telemetry, you also recreate the incident environment to allow the model to iterate on a solution with the environment itself. A lot of incidents aren't "run a single command and save the day" - they need iteration with the running environment. However it's effectively impossible to recreate an incident environment. Potentially some of them, but the effort would be enormous.  It's much easier to start with an eval that replays monitoring data, even if it's less comprehensive.

Even that is hard - since the models will suggest actions, and you'll need to judge if those actions would have solved the problem.  For easy incidents when there's a clear best action this works well, for harder incidents where multiple actions may have led to recovery this is even more difficult.

These evals will be incredibly difficult to build.  There likely will be a third party organization (similar to [METR](https://metr.org/)) that creates an evaluation environment for language models on various operations tasks and grades them, publishing the results, but not the evals themselves since otherwise it would be trained on by the big labs.

#### Game Time - Let's give Claude Root
Up to this point the language models were offering suggestions - they were performing reads, but not running commands directly. That stage is important to build trust. When the humans are 99% of the time just approving the language model's suggestion though, it's time to move to the next level. The next step is much scarier - letting the LLM take action, independently without human oversight.

This will be a large shift, and most organizations will struggle or avoid this until it's impossible not to.  But the threat of intelligent automated security attackers is looming - so companies will be forced to adopt this even if it's uncomfortable. The only way to counter super-intelligent offense is by super-intelligent defense, and human-in-the-loop will just slow things down.

A few mitigations to reduce risk come to mind here:
1) Having the LLM have a cool-down period - it proposes a fix, waits 30s for a human to deny, and if they haven't intervened, executes the command to run the fix.
2) Limiting blast radius - have the LLM have limited permissions, maybe additional permissions require human approval for a temporary amount of time
3) Give the machines X minutes to resolve before escalating to the human
4) Backups! Lots and lots of backups that LLMs can't touch in case something catastrophic were to happen

Once adventurous teams roll this out, they will likely completely delegate operations to the language model as trust grows further.  This brings up questions of loss of control and expertise, common in alignment discussions. Very real issues but outside of the scope of this essay.  Eventually human on-call rotations will likely be soft-abandoned, as the number of pages that the machines can't resolve on their own dwindles.

This end state sounds scary typing it out. But it's where companies will have to be. Getting to this stage will require all the stages before, and trust between the humans, the model, and the model provider. That trust will be built over time, by active participation of the human participants.
