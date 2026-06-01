---
name: mcp-manager
description: 管理和配置 Claude Code 的 MCP 服务器。当用户提到 MCP、mcp服务器、添加mcp、配置mcp、mcp list、mcp status、安装mcp、新增mcp、mcp认证失败、mcp连接问题等关键词时使用此技能。覆盖添加 stdio 和 HTTP 类型的 MCP 服务器、删除、查看状态、排查认证和环境变量问题。
---

# MCP 服务器管理

管理 Claude Code 的 MCP（Model Context Protocol）服务器配置。

## 核心原则

**配置文件优先级**：Claude Code 实际读取的是 `~/.claude.json` 中的 `mcpServers` 节点，而不是 `.mcp.json`。`claude mcp add` 命令也写入 `.claude.json`。如果两个文件存在冲突，`.claude.json` 优先。

**Windows 特殊格式**：在 Windows 上，stdio 类型的 MCP 服务器必须使用 `"command": "cmd"` + `"args": ["/c", "npx", ...]` 格式，不能直接用 `"command": "npx"`。

**环境变量展开规则**（仅对 `.claude.json` 有效）：
- `headers` 字段：支持 `${VAR}` 展开（如 GitHub MCP 的 `"Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}"`）
- `env` 字段：支持 `${VAR}` 展开
- `url` 字段：**不支持** `${VAR}` 展开，URL 中的 `${VAR}` 会被当作字面字符串
- `args` 字段：支持 `${VAR}` 展开

## 配置文件位置

用户级配置：`~/.claude.json`
- Windows: `C:\Users\<用户名>\.claude.json`

在 `mcpServers` 节点下添加/修改 MCP 服务器配置。

## 添加 MCP 服务器

### 方式一：直接编辑配置文件（推荐）

读取 `~/.claude.json`，在 `mcpServers` 对象中添加新条目。

#### stdio 类型（NPX 本地运行）

适用于大多数 MCP 服务器，如 tavily-mcp、playwright、context7。

Windows 格式：
```json
"<服务器名称>": {
  "type": "stdio",
  "command": "cmd",
  "args": ["/c", "npx", "-y", "<npm包名>@latest"],
  "env": {}
}
```

如需传递环境变量（如 API key），在 `env` 字段中使用 `${VAR}` 引用 settings.json 中定义的变量：
```json
"env": {
  "API_KEY": "${API_KEY}"
}
```

**不要**把实际 key 值硬编码在配置文件中。先在 `~/.claude/settings.json` 的 `env` 节点定义变量，再通过 `${}` 引用。

macOS/Linux 格式（不用 `cmd /c`）：
```json
"<服务器名称>": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "<npm包名>@latest"],
  "env": {}
}
```

#### HTTP 类型（远程端点）

```json
"<服务器名称>": {
  "type": "http",
  "url": "https://<mcp端点地址>"
}
```

如需认证，优先使用 `headers` 字段（支持 `${}` 变量展开）：
```json
"headers": {
  "Authorization": "Bearer ${API_KEY}"
}
```

如果远程 MCP 只支持 URL 参数认证（如 `?apiKey=xxx`），则必须将实际 key 值直接写入 URL，因为 `url` 字段不支持 `${}` 展开。这种情况下无法避免硬编码。

### 方式二：claude mcp add 命令

```bash
# stdio 类型（Windows 会自动添加 cmd /c）
claude mcp add --transport stdio --scope user <名称> -- npx -y <npm包名>@latest

# HTTP 类型
claude mcp add --transport http --scope user <名称> <URL>

# 带环境变量（stdio 类型）
claude mcp add --transport stdio --scope user -e KEY=value <名称> -- npx -y <npm包名>@latest
```

注意：`claude mcp add` 写入 `.claude.json`。

## 查看 MCP 状态

```bash
claude mcp list
```

输出示例：
- `✓ Connected` — 正常连接
- `! Needs authentication` — 需要认证（如 OAuth）
- 不显示 — 配置有误或连接失败

## 删除 MCP 服务器

从 `.claude.json` 的 `mcpServers` 节点中删除对应条目。

或者：
```bash
claude mcp remove <名称>
```

## 故障排查

### 症状：修改了配置但不生效
1. 确认修改的是 `~/.claude.json`，而不是 `.mcp.json`
2. 完全退出 Claude Code 进程后重新启动（不是清空对话）
3. 运行 `claude mcp list` 确认状态

### 症状：认证失败（Authentication required）
1. **环境变量未传递**：MCP 子进程不自动继承 settings.json 的 env 变量。需要在 MCP 配置的 `env` 字段中显式声明
2. **URL 中变量未展开**：`${VAR}` 在 `url` 字段中不工作。改用 `headers` 或 `env` 字段
3. **API key 无效**：直接调用 API 验证 key 是否有效

### 症状：mcp list 显示 HTTP 而非 stdio
可能 `.claude.json` 中有旧配置覆盖了新配置。检查是否有多余条目。

### 症状：工具不出现但 mcp list 显示 Connected
重启 Claude Code 进程。MCP 工具列表在启动时加载。

## 验证 API Key 是否有效（无需暴露 key）

```bash
# 前提：key 已在 settings.json env 中定义，且当前 shell 中可用
curl -s -X POST "https://api.<服务>.com/endpoint" \
  -H "Content-Type: application/json" \
  -d "{\"api_key\":\"$ENV_VAR_NAME\",\"query\":\"test\"}"
```

## 配置模板速查

| 场景 | 配置 |
|------|------|
| Windows + stdio + NPX | `"cmd", ["/c", "npx", "-y", "包名@latest"]` |
| Windows + stdio + NPX + 环境变量 | 同上，加 `"env": {"KEY": "${KEY}"}` |
| HTTP + Header 认证 | `"headers": {"Authorization": "Bearer ${KEY}"}` |
| HTTP + URL 参数认证 | 直接写入完整 URL（含 key 值） |
