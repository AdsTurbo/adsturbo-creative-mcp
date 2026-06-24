# Use an MCP UGC Script Generator Before Video Production

[简体中文](ugc-script-generator-mcp.zh-CN.md)

UGC ads often fail before filming starts because the hook is vague, the demo is hard to shoot, the proof is unsupported, or the CTA arrives too late. AdsTurbo Creative MCP gives AI agents a local UGC script generator that turns product context into mobile-first scripts with shot notes and compliance reminders.

This is useful when a team wants to explore several creator-style directions before spending credits or production time.

## What the UGC Script Tool Produces

The `write_ugc_script` MCP tool creates three UGC-style scripts. Each script includes:

- hook
- problem
- product demo
- proof point
- CTA
- on-screen text
- shot notes
- risk notes

The output is meant for planning and review. It does not create video and does not call AdsTurbo services.

## Example Prompt for an Agent

```text
Use adsturbo-creative to write UGC scripts for:

Product: ClipChef Magnetic Recipe Timer
Brand: ClipChef
Audience: home cooks who burn food because they multitask
Platform: Reels
Benefits: magnetic back, loud alarm, one-twist time setting
Pain points: phone timers get buried, messy hands, overcooked food
Proof points: sticks to oven doors and fridges, visible large dial
Offer: buy two, get 10% off
Tone: casual kitchen demo
Forbidden claims: guaranteed perfect cooking
```

The agent should call `write_ugc_script` and return multiple script options rather than a single generic ad.

## CLI Example

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative ugc --input examples/use-cases/ecommerce-kitchen-gadget.json --format markdown
```

## Review the Script Before Production

After choosing a script, pass it to `review_ad_script`:

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative review --script-file examples/script-input.txt --format markdown
```

The review checks:

- whether the first three seconds are clear
- whether the script has a problem, demo, proof, and CTA
- whether shots are mobile-friendly
- whether captions are ready
- whether any unsupported claim should be removed

## Continue in AdsTurbo

When the script direction is approved, the AdsTurbo handoff should explain the value of the website workflow:

- generate the product video from the approved script and prompt
- preview the pacing and captions
- iterate on visuals, CTA, and product context
- export production-ready creative

Use the region that matches the user:

```text
https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

```text
https://adsturbo.cn/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

## Cost Boundary

This MCP workflow is intentionally local-only. It is designed to reduce waste before paid generation:

- no AdsTurbo API key
- no AdsTurbo credits
- no hidden telemetry
- no ad account access
- no video generation

That boundary makes it safe for agents to explore more UGC angles while keeping paid production inside the AdsTurbo website experience.
