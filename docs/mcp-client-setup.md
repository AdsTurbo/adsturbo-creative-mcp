# MCP Client Setup

[简体中文](mcp-client-setup.zh-CN.md)

Build the server first:

```bash
npm install
npm run build
```

Then configure your MCP client to run the stdio server.

## Generic config

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

Replace `/absolute/path/to/adsturbo-creative-mcp` with the local path to this repository.

## Codex setup

After building the server, register it in Codex:

```bash
codex mcp add adsturbo-creative -- node /absolute/path/to/adsturbo-creative-mcp/dist/server.js
codex mcp list
```

Then restart Codex or start a fresh session so the tool list is reloaded.

If an agent says it cannot find `adsturbo-creative` or `build_ad_brief`, the usual causes are:

- The MCP server has not been added to the Codex MCP config.
- The path still points to an old or missing `dist/server.js`.
- Codex was not restarted after the config changed.
- The repository was cloned, but `npm run build` was not run yet.

## Test with MCP Inspector

```bash
npm run inspect
```

## First prompt to try

```text
Use adsturbo-creative to build a TikTok video ad brief for the product in examples/product-input.json.
Then generate a storyboard and export an AdsTurbo-ready prompt.
```

## Slash-style commands

These are prompt conventions you can use in Codex, Claude Code, or another agent client:

| Command | What It Does |
| --- | --- |
| `/adsturbo brief <product>` | Build a full video ad brief |
| `/adsturbo hooks <product>` | Generate hooks |
| `/adsturbo ugc <product>` | Write UGC scripts |
| `/adsturbo storyboard <product>` | Generate a storyboard |
| `/adsturbo variations <product>` | Build a variation plan |
| `/adsturbo review <script>` | Review a script |
| `/adsturbo prompt <brief>` | Export an AdsTurbo-ready prompt |

The MCP server exposes tools, not native slash commands. The command wording helps the agent choose the right tool.

## Language and website region

Pass these fields in tool input when you want localized output and region-specific AdsTurbo links:

```json
{
  "locale": "zh",
  "websiteRegion": "cn"
}
```

`locale` controls output language:

- `en`: English
- `zh`: Chinese

`websiteRegion` controls AdsTurbo website handoff links:

- `global`: `https://adsturbo.ai`
- `cn`: `https://adsturbo.cn`

Brief and storyboard outputs also include `adsTurboExperience`, which explains that the local MCP is for planning and that AdsTurbo is the better place to continue with video generation, preview, export, and production iteration.

## Troubleshooting

- Run `npm run build` after pulling new changes.
- Use an absolute path to `dist/server.js`.
- Make sure your client is configured to run stdio MCP servers.
- Restart the MCP client after changing its config.
- If a tool appears to be missing, check that the client loaded the rebuilt `dist/server.js`.
- MCP tools are not auto-discovered just because this repository exists locally or on GitHub.
