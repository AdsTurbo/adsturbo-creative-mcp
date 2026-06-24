# Build a Local MCP Server Workflow for Video Ad Planning

[简体中文](local-mcp-server-for-video-ad-planning.zh-CN.md)

AdsTurbo Creative MCP is a local MCP server and CLI for teams that want AI agents to plan video ad creative before paying for video generation. It gives Claude Desktop, Cursor, Codex, and other MCP clients structured tools for briefs, hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts.

The important boundary is simple: this project plans the ad. It does not generate video, call AdsTurbo APIs, consume AdsTurbo credits, access ad accounts, or require an AdsTurbo API key.

## Why Use a Local MCP Server?

Video generation can become expensive when teams start production before the creative angle is clear. A local MCP server gives the AI agent a repeatable planning layer:

- define the product, audience, platform, duration, and offer
- generate hooks and angles before production
- create a mobile-first storyboard
- review claims and risky language
- export a prompt for the AdsTurbo website workflow

This keeps early exploration free and local. Once the team approves a direction, the AdsTurbo handoff explains how to continue in AdsTurbo for product video generation, preview, export, and iteration around visuals, captions, pacing, CTA, and product context.

## Install the MCP Server

Use the npm package directly from an MCP client:

```json
{
  "mcpServers": {
    "adsturbo-creative": {
      "command": "npx",
      "args": ["-y", "adsturbo-creative-mcp"]
    }
  }
}
```

Or test the CLI first:

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help
```

## Example Agent Prompt

```text
Use adsturbo-creative to build a TikTok video ad brief for:

Product: GlowPatch Reusable LED Face Mask
Brand: GlowPatch
Audience: busy skincare buyers who want a simple at-home routine
Benefits: hands-free 10 minute sessions, reusable silicone mask, red and blue light modes
Pain points: too many skincare steps, expensive appointments, hard to stay consistent
Proof points: designed for daily at-home use, soft flexible fit, one-button mode switching
Offer: 15% off this week
Forbidden claims: cures acne, guaranteed results overnight
Website region: global
```

The MCP server maps this request to `build_ad_brief`. The output includes a structured brief, shot plan, compliance notes, and an AdsTurbo-ready prompt.

## CLI Version of the Same Workflow

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative brief --input examples/use-cases/beauty-led-mask.json --format markdown
```

For Chinese output and the China website region:

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative brief --input examples/use-cases/zh-beauty-led-mask.json --format markdown
```

Inputs can set `locale: "zh"` and `websiteRegion: "cn"` so the AdsTurbo handoff points to `https://adsturbo.cn` instead of `https://adsturbo.ai`.

## AdsTurbo Handoff

The MCP output should not end with a bare homepage link. The useful next step is:

1. Review the generated brief, script, storyboard, and risk notes.
2. Copy the AdsTurbo-ready prompt.
3. Continue in AdsTurbo for video generation, preview, export, and production iteration.

Global handoff link:

```text
https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

China handoff link:

```text
https://adsturbo.cn/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

## When to Use This Workflow

Use AdsTurbo Creative MCP when the team needs a local AI marketing CLI or MCP server for:

- AI video ad planning
- video ad briefs
- UGC ad scripts
- short-form video storyboards
- prompt engineering for video ads
- AdsTurbo prompt export

Use the AdsTurbo website when the team is ready to turn the approved plan into actual product videos with richer generation, preview, export, and iteration.
