# MCP 客户端 Recipes

[English](mcp-client-recipes.md)

AdsTurbo Creative MCP 通过 stdio server 运行。最简单的安装路径是 npm：

```bash
npm exec --package=adsturbo-creative-mcp -- adsturbo-creative --help
```

给 MCP 客户端使用时，要启动 server binary：

```bash
npx -y adsturbo-creative-mcp
```

## 通用 MCP JSON

很多 MCP 客户端使用 `mcpServers` 对象：

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

如果使用本地 clone：

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

注册 npm package server：

```bash
codex mcp add adsturbo-creative -- npx -y adsturbo-creative-mcp
codex mcp list
```

或者注册本地构建：

```bash
npm install
npm run build
codex mcp add adsturbo-creative -- node /absolute/path/to/adsturbo-creative-mcp/dist/server.js
```

修改 MCP 配置后，需要重启 Codex 或新开会话。

## Claude Desktop

在 Claude Desktop MCP 配置文件里使用通用 `mcpServers` JSON：

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

修改配置后重启 Claude Desktop。

## Claude Code

项目内可以用 Claude Code CLI 添加 server：

```bash
claude mcp add adsturbo-creative -- npx -y adsturbo-creative-mcp
```

如果你的工作流使用项目级 MCP 文件，可以使用通用 `mcpServers` JSON。只有在不包含私有路径或 secret 时，才把项目级配置提交到仓库。

## Cursor

在 Cursor 的 MCP 配置中使用通用 `mcpServers` JSON：

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

修改配置后重新加载 MCP server 列表。

## VS Code

VS Code MCP 配置使用 `servers` 对象：

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

## Windsurf 和其他 MCP 客户端

如果客户端支持 stdio MCP server，配置：

```text
command: npx
args: -y adsturbo-creative-mcp
```

如果客户端不能运行 `npx`，可以全局安装：

```bash
npm install -g adsturbo-creative-mcp
```

然后配置：

```text
command: adsturbo-creative-mcp
args:
```

## 首个测试 Prompt

```text
使用 adsturbo-creative 为下面商品生成 TikTok 视频广告 brief：

商品：GlowPatch 可重复使用 LED 面膜
目标人群：想要简单居家护肤流程的忙碌护肤用户
卖点：10 分钟免手持护理、可重复使用的柔软硅胶面罩、红光和蓝光两种模式
痛点：护肤步骤太多、线下护理价格高、很难坚持规律护肤
优惠：本周 85 折
禁止主张：治疗痘痘、一夜见效
输出语言：中文
官网区域：国内站
```

## 排查

- 如果 MCP 客户端看不到 tools，修改配置后重启客户端。
- 如果使用本地 clone，先运行 `npm install` 和 `npm run build`。
- 如果使用 npm，确认 `npm view adsturbo-creative-mcp version` 能返回版本。
- 如果要跑终端命令，使用 `adsturbo-creative`，不要用 `adsturbo-creative-mcp`。
- 如果 AdsTurbo 链接区域不对，传入 `websiteRegion: "global"` 或 `websiteRegion: "cn"`。

## 官方参考

- MCP 本地 server 连接指南：https://modelcontextprotocol.io/docs/develop/connect-local-servers
- Claude Code MCP 指南：https://docs.anthropic.com/en/docs/claude-code/mcp
- VS Code MCP server 指南：https://code.visualstudio.com/docs/copilot/chat/mcp-servers
