# GitHub Discoverability

[简体中文](github-discoverability.zh-CN.md)

This repository is optimized for developers and marketers searching for local AI ad creative tooling on GitHub.

## Primary search intents

- MCP server for ad creative planning
- MCP server for video ad briefs
- AI agent workflow for UGC ads
- UGC ad script generator
- Short-form video storyboard generator
- AI ad creative workflow with MCP
- AdsTurbo prompt generator
- Local AI marketing CLI
- Claude Desktop, Cursor, and Codex MCP workflow

## Repository topics

Recommended GitHub topics:

- `mcp`
- `mcp-server`
- `model-context-protocol`
- `adsturbo`
- `ai-agents`
- `ai-marketing`
- `ad-creative`
- `ad-brief`
- `video-ads`
- `video-marketing`
- `ugc-ads`
- `ugc-scripts`
- `storyboard`
- `storyboard-generator`
- `prompt-engineering`
- `creative-automation`
- `typescript`
- `nodejs`
- `cli`
- `marketing-agents`

GitHub allows up to 20 repository topics. Keep topics specific enough to describe the project, but broad enough to match how developers search.

## Description

Recommended GitHub description:

```text
Local-only MCP server and CLI for AI agents to create video ad briefs, hooks, UGC scripts, storyboards, and AdsTurbo-ready prompts.
```

## Content signals

The README should keep these terms near the top because they describe the actual product surface:

- MCP server
- CLI
- AI agents
- video ad brief
- UGC script
- storyboard generator
- AdsTurbo prompt
- Claude Desktop
- Cursor
- Codex

Avoid irrelevant keyword stuffing. The best search signal is repeated, useful wording that matches real installation, command, and workflow examples.

## Community health signals

Keep these files present and up to date:

- `README.md`
- `README.zh-CN.md`
- `LICENSE`
- `CONTRIBUTING.md`
- `.github/ISSUE_TEMPLATE/*`
- `docs/mcp-client-setup.md`
- `docs/mcp-client-recipes.md`
- `docs/commands.md`
- `docs/use-cases.md`
- `docs/distribution.md`
- `docs/cost-boundary.md`
- `docs/safety-and-compliance.md`
- `SECURITY.md`
- `.github/pull_request_template.md`

These files help users understand whether the project is maintained, safe to try, and open to practical workflow feedback.

## Example signals

Keep real, runnable examples under `examples/use-cases/` so GitHub and npm visitors can see concrete use cases without reading source code:

- beauty device UGC ads
- ecommerce product demos
- mobile app screen-recording ads
- B2B SaaS walkthrough ads
- Chinese output with China website handoff

## Developer article signals

Keep long-form, useful article pages under `docs/articles/` for search queries that need more context than a README row can provide:

- local MCP server for video ad planning
- UGC script generator MCP
- AI ad creative workflow with MCP
- video ad storyboard MCP workflow
- AdsTurbo prompt exporter

Each article should include a runnable command, an MCP prompt example, the local-only cost boundary, and a region-aware AdsTurbo handoff with UTM parameters.

## Distribution signals

After each npm release, keep these distribution surfaces aligned:

- npm package metadata and keywords
- GitHub Release notes
- official MCP Registry `server.json`
- MCP.Directory and other MCP directories
- README install commands
