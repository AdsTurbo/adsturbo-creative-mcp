# AdsTurbo Creative MCP

Local MCP server for AI video ad planning.

[简体中文](README.zh-CN.md)

AdsTurbo Creative MCP helps AI agents plan video ad briefs, hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts before a team spends on video generation.

It is a planning layer only:

- No AdsTurbo API key required
- No video generation
- No hidden telemetry
- No calls to AdsTurbo internal services
- No credit consumption
- No ad account access

When the creative plan is approved, users can paste the exported prompt into AdsTurbo or use a separate authenticated AdsTurbo API workflow.

## Tools

| Tool | Cost | Description |
| --- | --- | --- |
| `build_ad_brief` | Free/local | Build a full video ad brief from product details |
| `generate_hooks` | Free/local | Generate short-form ad hooks |
| `write_ugc_script` | Free/local | Write UGC scripts with hook, problem, demo, proof, CTA, on-screen text, and shot notes |
| `generate_storyboard` | Free/local | Generate a video ad storyboard object with scene timing and production notes |
| `build_variation_plan` | Free/local | Generate testable ad angles with hypotheses and risk notes |
| `review_ad_script` | Free/local | Review script structure, first-three-seconds clarity, mobile framing, and risk notes |
| `export_adsturbo_prompt` | Free/local | Export a prompt that can be pasted into AdsTurbo |

## Install

```bash
git clone https://github.com/AdsTurbo/adsturbo-creative-mcp.git
cd adsturbo-creative-mcp
npm install
npm run build
```

## Use with an MCP client

Claude Desktop, Cursor, Codex, and other MCP-compatible clients can run the built server over stdio.

```json
{
  "mcpServers": {
    "adsturbo-creative": {
      "command": "node",
      "args": ["/absolute/path/to/adsturbo-creative-mcp/dist/server.js"]
    }
  }
}
```

More setup notes: [docs/mcp-client-setup.md](docs/mcp-client-setup.md)

## Inspect locally

```bash
npm run inspect
```

## Example MCP prompt

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
```

## Input shape

```json
{
  "productName": "GlowPatch Reusable LED Face Mask",
  "brandName": "GlowPatch",
  "productUrl": "https://example.com/products/glowpatch-led-mask",
  "category": "beauty device",
  "audience": "busy skincare buyers who want a simple at-home routine",
  "platform": "tiktok",
  "durationSeconds": 30,
  "price": "$89",
  "benefits": [
    "hands-free 10 minute sessions",
    "reusable silicone mask",
    "red and blue light modes"
  ],
  "painPoints": [
    "too many skincare steps",
    "expensive appointments"
  ],
  "proofPoints": [
    "designed for daily at-home use",
    "soft flexible fit"
  ],
  "offer": "15% off this week",
  "tone": "friendly UGC demo",
  "primaryCta": "Shop the routine",
  "locale": "en",
  "websiteRegion": "global",
  "requiredShots": [
    "mask close-up on a bathroom counter",
    "creator wearing the mask while making coffee"
  ],
  "forbiddenClaims": [
    "cures acne",
    "guaranteed results overnight"
  ]
}
```

The server does not fetch `productUrl`. It is context only.

## Language and website region

Use `locale` to control the language of MCP output:

- `en`: English output
- `zh`: Chinese output

Use `websiteRegion` to control AdsTurbo website links returned by tools:

- `global`: use `https://adsturbo.ai`
- `cn`: use `https://adsturbo.cn`

Examples:

```json
{
  "locale": "zh",
  "websiteRegion": "cn"
}
```

This returns Chinese planning output and AdsTurbo China links such as `https://adsturbo.cn/features/product-video`.

## Example outputs

- [examples/storyboard-output.json](examples/storyboard-output.json)
- [examples/storyboard-output.zh-CN.json](examples/storyboard-output.zh-CN.json)
- [examples/ugc-script-review.md](examples/ugc-script-review.md)
- [examples/product-input.json](examples/product-input.json)

## Cost boundary

This repository is the planning layer only.

It does not include:

- `generate_video`
- `create_adsturbo_project`
- `submit_storyboard`
- `ad_clone_generate`
- `ai_actor_perform`
- `lip_sync`
- `video_translate`
- Any other AdsTurbo paid generation call

If paid tools are added later, they must require a user-provided API key, show a cost estimate, and never run by default.

Full boundary: [docs/cost-boundary.md](docs/cost-boundary.md)

## Safety and compliance

- Use references for structure, pacing, and inspiration, not to copy protected creative work.
- Keep claims specific to product information that can be substantiated.
- Review platform policy and regulated-category requirements before publishing.
- Do not use this tool to impersonate people or brands without permission.
- Do not treat generated plans as legal, medical, financial, or platform-policy advice.

Full notes: [docs/safety-and-compliance.md](docs/safety-and-compliance.md)

## Companion projects

- [product-page-to-ad-brief](https://github.com/AdsTurbo/product-page-to-ad-brief)
- [skill-adsturbo](https://github.com/AdsTurbo/skill-adsturbo)
- [AdsTurbo Open API](https://adsturbo.ai/open-api)
- [AdsTurbo China](https://adsturbo.cn)

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
