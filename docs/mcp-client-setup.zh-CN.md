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

`websiteRegion` 控制 AdsTurbo 链接：

- `global`：`https://adsturbo.ai`
- `cn`：`https://adsturbo.cn`

## 排查

- 拉取新代码后运行 `npm run build`。
- 使用 `dist/server.js` 的绝对路径。
- 确认客户端支持 stdio MCP server。
- 修改配置后重启 MCP 客户端。
- 如果工具缺失，确认客户端加载的是重新构建后的 `dist/server.js`。
