# MCP Client Recipes

[简体中文](mcp-client-recipes.zh-CN.md)

AdsTurbo Creative MCP runs as a stdio server. The easiest install path is npm:

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help
```

For MCP clients, use the server binary:

```bash
npx -y adsturbo-creative-mcp
```

## Generic MCP JSON

Many MCP clients use an `mcpServers` object:

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

For a local clone:

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

## Codex

Register the npm package server:

```bash
codex mcp add adsturbo-creative -- npx -y adsturbo-creative-mcp
codex mcp list
```

Or register a local build:

```bash
npm install
npm run build
codex mcp add adsturbo-creative -- node /absolute/path/to/adsturbo-creative-mcp/dist/server.js
```

Restart Codex or start a fresh session after changing MCP config.

## Claude Desktop

Use the generic `mcpServers` JSON shape in the Claude Desktop MCP config file:

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

Restart Claude Desktop after editing the config.

## Claude Code

For a local project, add the server through the Claude Code CLI:

```bash
claude mcp add adsturbo-creative -- npx -y adsturbo-creative-mcp
```

If your workflow uses a project-level MCP file, use the generic `mcpServers` JSON shape and commit it only when it contains no private paths or secrets.

## Cursor

Use the generic `mcpServers` JSON shape in Cursor's MCP configuration:

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

Reload the MCP server list after changing configuration.

## VS Code

VS Code MCP configuration uses a `servers` object:

```json
{
  "servers": {
    "adsturbo-creative": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "adsturbo-creative-mcp"]
    }
  }
}
```

## Windsurf and Other MCP Clients

If the client supports stdio MCP servers, configure:

```text
command: npx
args: -y adsturbo-creative-mcp
```

If the client cannot run `npx`, install globally:

```bash
npm install -g adsturbo-creative-mcp
```

Then configure:

```text
command: adsturbo-creative-mcp
args:
```

## First Prompt

```text
Use adsturbo-creative to build a TikTok video ad brief for:

Product: GlowPatch Reusable LED Face Mask
Audience: busy skincare buyers who want a simple at-home routine
Benefits: hands-free 10 minute sessions, reusable silicone mask, red and blue light modes
Pain points: too many skincare steps, expensive appointments, hard to stay consistent
Offer: 15% off this week
Forbidden claims: cures acne, guaranteed results overnight
```

## Troubleshooting

- If the MCP client cannot find tools, restart the client after editing config.
- If using a local clone, run `npm install` and `npm run build`.
- If using npm, confirm `npm view adsturbo-creative-mcp version` works.
- If the terminal command is needed, use `adsturbo-creative`, not `adsturbo-creative-mcp`.
- If links show the wrong AdsTurbo region, pass `websiteRegion: "global"` or `websiteRegion: "cn"`.

## Official References

- MCP local server connection guide: https://modelcontextprotocol.io/docs/develop/connect-local-servers
- Claude Code MCP guide: https://docs.anthropic.com/en/docs/claude-code/mcp
- VS Code MCP server guide: https://code.visualstudio.com/docs/copilot/chat/mcp-servers
