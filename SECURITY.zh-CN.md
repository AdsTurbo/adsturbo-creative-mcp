# 安全策略

[English](SECURITY.md)

AdsTurbo Creative MCP 是本地策划工具。它不应该调用 AdsTurbo API、不消耗 AdsTurbo credits、不访问广告账户，也不应把用户输入发送到 AdsTurbo 托管服务。

## 支持版本

安全问题请以最新 npm release 和 `main` 分支为准。

## 报告漏洞

优先使用 GitHub private security advisory：

https://github.com/AdsTurbo/adsturbo-creative-mcp/security/advisories/new

如果你的账号无法使用 GitHub advisory，可以开 issue，但只描述高层影响。不要在公开 issue 中包含可直接复用的攻击载荷、token、凭证、客户数据或私有商品输入。

## 敏感数据

不要提交：

- API key、npm token、GitHub token 或 AdsTurbo 凭证
- 客户脚本、客户商品 URL、未公开 campaign brief
- 私有广告账户标识
- 可直接复用的攻击载荷

## 预期边界

这个项目应保持：

- 默认本地运行
- 无隐藏 telemetry
- 不调用 AdsTurbo API
- 不生成视频
- 不消耗 credits
- 不访问广告账户

如果未来贡献增加可选的托管能力或付费能力，必须显式声明、写入文档、默认关闭，并要求用户自行提供凭证。
