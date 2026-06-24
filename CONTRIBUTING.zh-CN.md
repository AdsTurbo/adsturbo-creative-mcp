# 贡献指南

[English](CONTRIBUTING.md)

感谢你帮助改进 AdsTurbo Creative MCP。

这个项目聚焦本地、低成本的 AI 视频广告策划工作流。贡献需要保留成本边界：

- 默认不调用 AdsTurbo API
- 不生成视频
- 不隐藏 telemetry
- 不访问广告账户
- 不在没有用户显式凭证的情况下加入消耗 credits 的工作流

## 适合贡献的方向

- Claude Desktop、Cursor、Codex、VS Code 等 MCP 客户端配置示例
- 更好的视频广告 brief 模板
- UGC 脚本结构
- Storyboard 输出改进
- 本地 CLI 体验
- 多语言示例
- 广告创意策划的安全和合规说明

## 开发

```bash
npm install
npm run build
npm test
```

## 文档和文案要求

- 参考素材只能用于结构、节奏和灵感，不要复制受保护的创意内容。
- 广告主张必须基于可验证的商品信息。
- 优先写清楚实际工作流，不做泛泛的营销承诺。
- 搜索词要自然且相关：MCP server、AI agents、UGC scripts、video ad storyboard、AdsTurbo prompt、local CLI。
- 用户可见行为变化时，英文和中文文档都要更新。

## PR 检查

- 保持项目默认本地运行。
- 不加入隐藏 telemetry、AdsTurbo API 调用或消耗 credits 的流程。
- 不提交客户数据、凭证、未公开 campaign material。
- 代码改动运行 `npm test`。
