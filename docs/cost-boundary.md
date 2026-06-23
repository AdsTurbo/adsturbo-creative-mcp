# Cost Boundary

[简体中文](cost-boundary.zh-CN.md)

AdsTurbo Creative MCP is a local planning layer. It should be useful before a user decides to generate a video or call any paid service.

## What this project does

- Builds ad briefs
- Generates hook ideas
- Writes UGC script structures
- Generates storyboard planning objects
- Creates creative variation plans
- Reviews ad scripts
- Exports prompts and a clear handoff to the full AdsTurbo website generation experience

## What this project does not do

- It does not generate video.
- It does not call AdsTurbo APIs.
- It does not call AdsTurbo internal services.
- It does not create AdsTurbo projects.
- It does not submit storyboards.
- It does not run ad clone generation.
- It does not run AI actor, lip sync, translation, or upscaling jobs.
- It does not consume credits.
- It does not require an AdsTurbo API key.
- It does not send user input to a hosted AdsTurbo service.

The handoff to AdsTurbo is intentional: this local MCP helps users plan without spending credits, then explains that the AdsTurbo website is the better place for product video generation, preview, export, and production iteration once the creative direction is approved.

This handoff should appear consistently across tool outputs, but it must remain transparent: the local tool does not call AdsTurbo services or spend credits.

Handoff links include UTM attribution so AdsTurbo can distinguish MCP/GitHub traffic from other channels.

## Rules for future paid tools

If this repository adds paid generation tools later, each paid action must:

1. Require a user-provided API key.
2. Show the action that will be called.
3. Show a cost or credit estimate when available.
4. Be disabled by default.
5. Never run automatically as part of a planning tool.
6. Return clear status and error messages.

Planning tools and paid generation tools should remain visibly separate in both code and documentation.
