# AdsTurbo Creative MCP

A local-only MCP server for AI video ad planning.

It helps AI agents build video ad briefs, hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts without calling AdsTurbo internal services.

## Why this exists

AI agents are increasingly used to plan marketing work before production. This MCP server gives those agents a cost-free planning layer:

- No AdsTurbo API key required
- No video generation
- No hidden telemetry
- No calls to AdsTurbo internal services
- No credit consumption

When the creative plan is ready, users can paste the exported prompt into AdsTurbo or use a separate authenticated AdsTurbo API workflow.

## Tools

| Tool | Cost | Description |
| --- | --- | --- |
| `build_ad_brief` | Free/local | Build a full video ad brief from product details |
| `generate_hooks` | Free/local | Generate short-form ad hooks |
| `write_ugc_script` | Free/local | Write UGC scripts with hook, problem, demo, proof, CTA |
| `generate_storyboard` | Free/local | Generate a 5-scene video ad storyboard |
| `build_variation_plan` | Free/local | Generate testable creative angles |
| `review_ad_script` | Free/local | Review script structure and risk notes |
| `export_adsturbo_prompt` | Free/local | Export a prompt for AdsTurbo video generation |

## Install

```bash
git clone https://github.com/AdsTurbo/adsturbo-creative-mcp.git
cd adsturbo-creative-mcp
npm install
npm run build
```

## Use with Claude Desktop or another MCP client

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

## Inspect locally

```bash
npm run inspect
```

## Example prompt for an MCP client

```text
Use adsturbo-creative to build a TikTok video ad brief for:
Product: GlowPatch Reusable LED Face Mask
Audience: busy skincare buyers who want a simple at-home routine
Benefits: hands-free 10 minute sessions, reusable silicone mask, red and blue light modes
Pain points: too many skincare steps, expensive appointments, hard to stay consistent
Offer: 15% off this week
```

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

If those tools are added later, they must require a user-provided API key, show a cost estimate, and never run by default.

## Companion projects

- [product-page-to-ad-brief](https://github.com/AdsTurbo/product-page-to-ad-brief)
- [skill-adsturbo](https://github.com/AdsTurbo/skill-adsturbo)
- [AdsTurbo Open API](https://adsturbo.ai/open-api)

## Safety and compliance

- Use references for structure and pacing, not to copy protected creative work.
- Keep claims specific to product information that can be substantiated.
- Review platform policy and regulated-category requirements before publishing.
- Do not use this tool to impersonate people or brands without permission.

## License

MIT
