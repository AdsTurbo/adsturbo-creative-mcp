# Distribution Plan

[简体中文](distribution.zh-CN.md)

This document keeps the submission package for AdsTurbo Creative MCP consistent across MCP registries, directories, and community lists.

## Canonical Assets

| Field | Value |
| --- | --- |
| Project | AdsTurbo Creative MCP |
| MCP name | `io.github.adsturbo/adsturbo-creative-mcp` |
| GitHub repo | `https://github.com/AdsTurbo/adsturbo-creative-mcp` |
| npm package | `adsturbo-creative-mcp` |
| MCP server command | `npx -y adsturbo-creative-mcp` |
| CLI command | `npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help` |
| License | MIT |
| Runtime | Node.js >=20 |
| Transport | stdio |
| Primary language | TypeScript |
| Output languages | English and Chinese |
| Website handoff | `adsturbo.ai` for `global`, `adsturbo.cn` for `cn` |

## Short Description

Local-only MCP server and CLI for AI agents to create video ad briefs, hooks, UGC scripts, storyboards, reviews, and AdsTurbo-ready prompts.

## Long Description

AdsTurbo Creative MCP helps AI agents plan video ad creative before teams spend credits on video generation. It runs locally over stdio and provides tools for full ad briefs, short-form hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts. Outputs include a transparent AdsTurbo handoff so users can continue in AdsTurbo for product video generation, preview, export, and production iteration after the creative direction is clear.

The project does not require an AdsTurbo API key, does not generate video, does not call AdsTurbo APIs, does not consume AdsTurbo credits, and does not access ad accounts.

## Categories

- MCP server
- AI marketing
- Video ads
- UGC scripts
- Storyboard generator
- Creative automation
- Prompt engineering
- AdsTurbo

## MCP Tools

- `build_ad_brief`
- `generate_hooks`
- `write_ugc_script`
- `generate_storyboard`
- `build_variation_plan`
- `review_ad_script`
- `export_adsturbo_prompt`

## Developer Content Assets

Use these pages as stable content targets when submitting to directories, community lists, or social posts:

- [Build a Local MCP Server Workflow for Video Ad Planning](articles/local-mcp-server-for-video-ad-planning.md)
- [Use an MCP UGC Script Generator Before Video Production](articles/ugc-script-generator-mcp.md)
- [AI Ad Creative Workflow with MCP and AdsTurbo](articles/ai-ad-creative-workflow-with-mcp.md)
- [Directory Submission Kit](directory-submission-kit.md)

Each article includes runnable commands, an MCP prompt example, the local-only cost boundary, and the AdsTurbo website handoff. These pages are intended to rank for long-tail queries such as `local MCP server for video ad planning`, `UGC script generator MCP`, and `AI ad creative workflow with MCP`.

## Official MCP Registry

Status: prepared; npm package `0.1.4` includes `mcpName` and root `server.json`.

Required files and metadata:

- `package.json` includes `mcpName`
- npm package is published before registry publishing
- root `server.json` has the same `name` as `package.json#mcpName`
- `server.json` points to the npm package and stdio transport

Publish flow:

```bash
npm test
npm publish --access public --registry=https://registry.npmjs.org/
mcp-publisher login github
mcp-publisher publish
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.adsturbo/adsturbo-creative-mcp"
```

Notes:

- The MCP Registry is metadata only; it does not host npm artifacts.
- GitHub authentication supports `io.github.username/*` and `io.github.orgname/*` namespaces.
- If GitHub org namespace authentication fails, use DNS or HTTP authentication with an AdsTurbo-owned domain.

## MCP.Directory

Status: submitted for review on 2026-06-24.

Submission values:

```text
GitHub repository: https://github.com/AdsTurbo/adsturbo-creative-mcp
npm package: adsturbo-creative-mcp
Install command: npx -y adsturbo-creative-mcp
Category: Marketing / AI Marketing / Video Ads / Creative Automation
Description: Local-only MCP server and CLI for AI agents to create video ad briefs, hooks, UGC scripts, storyboards, reviews, and AdsTurbo-ready prompts.
```

Submitted short description:

```text
Local-only MCP server and CLI for AI video ad briefs, UGC scripts, storyboards, and prompts.
```

Submission response:

```json
{"ok":true,"message":"Server submitted for review!"}
```

## Additional Directory Targets

| Directory | Status | Next Action |
| --- | --- | --- |
| Official MCP Registry | Prepared, blocked by `mcp-publisher` installation | Retry `mcp-publisher login github && mcp-publisher publish` when binary download works |
| MCP.Directory | Submitted for review on 2026-06-24 | Check listing status after review |
| Glama | Not submitted | Use the canonical fields and npm command; link the developer articles as usage evidence |
| PulseMCP | Pending official Registry presence | Check after Registry publish because PulseMCP discovery is registry-oriented |
| Awesome MCP Servers | Not submitted | Prepare a focused PR entry under the marketing/creative category after the Registry listing or MCP.Directory listing is live |
| Smithery | Needs evaluation | Only add Smithery-specific config if it improves installability without hosting paid AdsTurbo calls |

Use the same canonical fields for all directory targets. Keep the message focused on:

- local-only planning
- no API key or credits
- seven MCP tools
- English and Chinese output
- AdsTurbo handoff for full video production

## Community List Pitch

```text
AdsTurbo Creative MCP is a local-only MCP server and CLI for AI video ad planning. It helps agents create video ad briefs, hooks, UGC scripts, storyboards, variation plans, script reviews, and AdsTurbo-ready prompts without API keys, video generation, telemetry, or credit consumption.
```

## Verification Checklist

- `npm test`
- `npm pack --dry-run --registry=https://registry.npmjs.org/`
- `npm view adsturbo-creative-mcp version --registry=https://registry.npmjs.org/`
- `npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help`
- `mcp-publisher publish`
- registry search returns `io.github.adsturbo/adsturbo-creative-mcp`

## Current Blockers

- `mcp-publisher` installation is blocked by GitHub release asset download issues on this machine.
- On 2026-06-24, direct `curl` reached the `mcp-publisher_darwin_arm64.tar.gz` asset and downloaded 3.8 MB of 6.8 MB, then stalled at 57%.
- On 2026-06-24, `curl -C -` resume failed with a GitHub port 443 connection timeout.
- On 2026-06-24, `gh release download` hung without progress output.
- On 2026-06-24, source-build fallback with `git clone --depth 1 --branch v1.7.9 https://github.com/modelcontextprotocol/registry.git` also failed with a GitHub port 443 connection timeout.
- Retry when GitHub downloads are stable, build from source on a machine that can clone GitHub, or install `mcp-publisher` on another machine and run `mcp-publisher login github && mcp-publisher publish` from this repository.

## References

- MCP Registry about: https://modelcontextprotocol.io/registry/about
- MCP Registry quickstart: https://modelcontextprotocol.io/registry/quickstart
- MCP Registry authentication: https://modelcontextprotocol.io/registry/authentication
- MCP server.json format: https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/server-json/generic-server-json.md
- Official Registry requirements: https://github.com/modelcontextprotocol/registry/blob/main/docs/reference/server-json/official-registry-requirements.md
