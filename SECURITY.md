# Security Policy

[简体中文](SECURITY.zh-CN.md)

AdsTurbo Creative MCP is a local-only planning tool. It should not call AdsTurbo APIs, consume AdsTurbo credits, access ad accounts, or transmit user inputs to hosted AdsTurbo services.

## Supported Versions

Security reports should target the latest npm release and the `main` branch.

## Reporting a Vulnerability

Please open a private security advisory on GitHub when possible:

https://github.com/AdsTurbo/adsturbo-creative-mcp/security/advisories/new

If GitHub advisories are not available for your account, open an issue with only high-level impact details and do not include exploit payloads, tokens, credentials, customer data, or private product inputs.

## Sensitive Data

Do not include:

- API keys, npm tokens, GitHub tokens, or AdsTurbo credentials
- customer scripts, customer product URLs, or unreleased campaign briefs
- private ad account identifiers
- exploit payloads that can be directly reused

## Expected Boundary

The project should remain:

- local-only by default
- no hidden telemetry
- no AdsTurbo API calls
- no video generation
- no credit-consuming workflow
- no ad account access

If a future contribution adds optional hosted or paid behavior, it must be explicit, documented, disabled by default, and require user-provided credentials.
