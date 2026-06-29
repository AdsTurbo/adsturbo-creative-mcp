# Directory Submission Kit

[简体中文](directory-submission-kit.zh-CN.md)

Use this kit when submitting AdsTurbo Creative MCP to MCP directories, awesome lists, newsletters, and community indexes.

## Canonical Fields

| Field | Value |
| --- | --- |
| Name | AdsTurbo Creative MCP |
| MCP name | `io.github.AdsTurbo/adsturbo-creative-mcp` |
| Repository | `https://github.com/AdsTurbo/adsturbo-creative-mcp` |
| npm package | `adsturbo-creative-mcp` |
| Install command | `npx -y adsturbo-creative-mcp` |
| CLI command | `npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help` |
| Runtime | Node.js >=20 |
| Transport | stdio |
| License | MIT |
| Languages | English and Chinese output |
| Cost boundary | Local-only planning; no AdsTurbo API key, no video generation, no credits, no ad account access |

## Short Description

```text
Local-only MCP server and CLI for AI agents to create video ad briefs, hooks, UGC scripts, storyboards, and AdsTurbo-ready prompts.
```

## Long Description

```text
AdsTurbo Creative MCP helps AI agents plan video ad creative before teams spend credits on video generation. It runs locally over stdio and provides tools for full ad briefs, hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts. Outputs include a transparent AdsTurbo handoff so users can continue in AdsTurbo for product video generation, preview, export, and production iteration after the creative direction is clear.

The project does not require an AdsTurbo API key, does not generate video, does not call AdsTurbo APIs, does not consume AdsTurbo credits, and does not access ad accounts.
```

## Tags

```text
mcp, mcp-server, model-context-protocol, ai-marketing, ai-agents, video-ads, ugc-ads, ugc-scripts, storyboard-generator, ad-creative, prompt-engineering, creative-automation, adsTurbo, typescript, nodejs, cli
```

## Directory-Specific Notes

| Directory | Recommended Action | Notes |
| --- | --- | --- |
| Official MCP Registry | Publish with `mcp-publisher publish` | Highest priority. Other directories may use Registry metadata. |
| MCP.Directory | Check review status | Already submitted on 2026-06-24. |
| Glama | Submit repo/package using canonical fields | Link the developer articles as usage evidence. |
| PulseMCP | Monitor after Registry publish | Discovery is likely tied to Registry and public MCP signals. |
| Awesome MCP Servers | Open a focused PR after a public listing exists | Use the PR snippet below and place it in the marketing/creative section that matches the upstream README. |
| Smithery | Evaluate only if installability improves | Do not introduce hosted paid AdsTurbo calls or hidden costs. |

## Awesome List PR Snippet

Verify the upstream category and exact formatting before opening the PR. Keep the entry concise:

```markdown
- [AdsTurbo Creative MCP](https://github.com/AdsTurbo/adsturbo-creative-mcp) - Local-only MCP server and CLI for AI video ad briefs, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts. No API key, video generation, telemetry, or credit consumption.
```

Suggested PR title:

```text
Add AdsTurbo Creative MCP
```

Suggested PR body:

```markdown
Adds AdsTurbo Creative MCP, a local-only stdio MCP server for AI video ad planning.

It provides tools for:

- video ad briefs
- hooks
- UGC scripts
- storyboards
- variation plans
- script reviews
- AdsTurbo-ready prompts

The project does not require an API key, does not generate video, does not call AdsTurbo APIs, and does not consume credits.
```

## Glama / Directory Form Copy

```text
AdsTurbo Creative MCP is a local-only MCP server and CLI for AI video ad planning. It helps Claude Desktop, Cursor, Codex, and other MCP clients create video ad briefs, hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts before teams spend on video generation.
```

Usage evidence:

- `docs/articles/local-mcp-server-for-video-ad-planning.md`
- `docs/articles/ugc-script-generator-mcp.md`
- `docs/articles/ai-ad-creative-workflow-with-mcp.md`
- `examples/use-cases/`

## AdsTurbo Handoff Links

Global:

```text
https://adsturbo.ai/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

China:

```text
https://adsturbo.cn/features/product-video?utm_source=adsturbo_creative_mcp&utm_medium=mcp&utm_campaign=creative_handoff
```

## Verification Commands

```bash
npm view adsturbo-creative-mcp version mcpName --registry=https://registry.npmjs.org/
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.AdsTurbo/adsturbo-creative-mcp"
```

## Registry Retry Commands

```bash
mcp-publisher login github
mcp-publisher publish
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.AdsTurbo/adsturbo-creative-mcp"
```
