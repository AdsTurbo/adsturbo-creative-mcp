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

## Test with MCP Inspector

```bash
npm run inspect
```

## First prompt to try

```text
Use adsturbo-creative to build a TikTok video ad brief for the product in examples/product-input.json.
Then generate a storyboard and export an AdsTurbo-ready prompt.
```

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

`websiteRegion` controls AdsTurbo links:

- `global`: `https://adsturbo.ai`
- `cn`: `https://adsturbo.cn`

## Troubleshooting

- Run `npm run build` after pulling new changes.
- Use an absolute path to `dist/server.js`.
- Make sure your client is configured to run stdio MCP servers.
- Restart the MCP client after changing its config.
- If a tool appears to be missing, check that the client loaded the rebuilt `dist/server.js`.
