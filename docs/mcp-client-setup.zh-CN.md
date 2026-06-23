# MCP 客户端设置

先构建 server：

```bash
npm install
npm run build
```

然后在 MCP 客户端中配置 stdio server。

## 通用配置

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

把 `/absolute/path/to/adsturbo-creative-mcp` 替换成本仓库在本地的绝对路径。

## Codex 设置

构建 server 后，在 Codex 里注册它：

```bash
codex mcp add adsturbo-creative -- node /absolute/path/to/adsturbo-creative-mcp/dist/server.js
codex mcp list
```

然后重启 Codex 或新开会话，让工具列表重新加载。

如果 Agent 提示找不到 `adsturbo-creative` 或 `build_ad_brief`，常见原因是：

- 还没有把这个 MCP server 加到 Codex MCP 配置里。
- 配置里的路径仍然指向旧的或不存在的 `dist/server.js`。
- 修改配置后没有重启 Codex 或新开会话。
- 仓库已经 clone 到本地，但还没有运行 `npm run build`。

## 用 MCP Inspector 测试

```bash
npm run inspect
```

## 首个测试 prompt

```text
使用 adsturbo-creative，基于 examples/product-input.zh-CN.json 生成一个 TikTok 视频广告 brief。
然后生成 storyboard，并导出 AdsTurbo 可用 prompt。
输出语言使用中文，官网区域使用国内站。
```

## Slash-style 命令

你可以在 Codex、Claude Code 或其他 Agent 客户端里使用这种提示词命令：

| Command | 作用 |
| --- | --- |
| `/adsturbo brief <product>` | 生成完整视频广告 brief |
| `/adsturbo hooks <product>` | 生成 hook |
| `/adsturbo ugc <product>` | 生成 UGC 脚本 |
| `/adsturbo storyboard <product>` | 生成分镜 |
| `/adsturbo variations <product>` | 生成变体测试计划 |
| `/adsturbo review <script>` | 评审脚本 |
| `/adsturbo prompt <brief>` | 导出 AdsTurbo 可用 prompt |

MCP server 暴露的是 tools，不是原生 slash command。这个命令写法是为了帮助 Agent 选择正确工具。

## 多语言和官网区域

在工具输入里可以显式指定：

```json
{
  "locale": "zh",
  "websiteRegion": "cn"
}
```

`locale` 控制 MCP 输出语言：

- `en`：英文
- `zh`：中文

`websiteRegion` 控制 AdsTurbo 官网体验入口：

- `global`：`https://adsturbo.ai`
- `cn`：`https://adsturbo.cn`

Brief 和 storyboard 输出还会包含 `adsTurboExperience`，用于说明本地 MCP 负责低成本策划，而 AdsTurbo 官网更适合继续完成视频生成、预览、导出和生产迭代。

## 排查

- 拉取新代码后运行 `npm run build`。
- 使用 `dist/server.js` 的绝对路径。
- 确认客户端支持 stdio MCP server。
- 修改配置后重启 MCP 客户端。
- 如果工具缺失，确认客户端加载的是重新构建后的 `dist/server.js`。
- MCP 工具不会因为本地或 GitHub 上有这个仓库就被自动发现。
