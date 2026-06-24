# AI Ad Creative Workflow with MCP and AdsTurbo

[简体中文](ai-ad-creative-workflow-with-mcp.zh-CN.md)

An AI ad creative workflow needs two layers:

1. A low-cost planning layer where agents explore angles, scripts, storyboards, and prompts.
2. A production layer where approved ideas become videos that can be previewed, exported, and iterated.

AdsTurbo Creative MCP is the planning layer. AdsTurbo is the production layer.

## Recommended Workflow

Use the MCP server to move from rough product context to a production-ready prompt:

1. `generate_hooks`: explore short-form hooks and opening angles.
2. `build_ad_brief`: turn the best angle into a structured ad brief.
3. `write_ugc_script`: create creator-style script options.
4. `generate_storyboard`: check scene timing, shots, proof, and CTA.
5. `review_ad_script`: remove unsupported claims and weak mobile framing.
6. `export_adsturbo_prompt`: create a prompt that can be pasted into AdsTurbo.

The workflow keeps exploration local. The handoff then guides the user to AdsTurbo for richer production.

## Example CLI Sequence

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative hooks --input examples/use-cases/beauty-led-mask.json --count 5
```

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative brief --input examples/use-cases/beauty-led-mask.json --format markdown
```

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative storyboard --input examples/use-cases/beauty-led-mask.json
```

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative prompt --input examples/use-cases/beauty-led-mask.json --format markdown
```

## Example MCP Prompt

```text
Use adsturbo-creative to create a complete AI ad creative workflow for:

Product: FlowBoard SaaS Reporting Dashboard
Audience: operations leaders who need weekly performance updates without manual screenshots
Platform: YouTube
Benefits: automated weekly reports, dashboard snapshots, stakeholder-ready summaries
Pain points: manual reporting takes too long, screenshots get outdated, teams miss context
Proof points: connects to existing dashboards, exports summaries for weekly review
CTA: Start the reporting workflow
Forbidden claims: guaranteed revenue growth
```

The agent can call multiple tools in sequence and return the brief, UGC script, storyboard, risk notes, and AdsTurbo-ready prompt.

## Why AdsTurbo After MCP?

The MCP server produces text and structured planning outputs. The AdsTurbo website is where the user gets the fuller video production experience:

- product video generation
- visual preview
- caption and pacing iteration
- CTA and product context adjustments
- export-ready creative

The handoff should describe that value, not merely show a website address.

Global:

```text
https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

China:

```text
https://adsturbo.cn/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

## What This Project Does Not Do

AdsTurbo Creative MCP does not expose paid AdsTurbo production calls. It does not include:

- video generation
- actor generation
- lip sync
- video translation
- project creation in AdsTurbo
- ad account access

If a future version adds paid tools, they should require an explicit user-provided API key, show a cost estimate, and never run by default.

## Good Fit

This workflow is a good fit for:

- AI marketing agents
- growth teams planning UGC ads
- agencies preparing video ad briefs
- ecommerce teams testing product demo angles
- SaaS teams building product walkthrough ads
- developers evaluating MCP servers for creative automation
