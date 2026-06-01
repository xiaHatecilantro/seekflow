---
name: model-routing
description: 根据任务复杂度自动选择 DeepSeek Flash（省钱快）还是 Pro（聪明贵）
---

# 模型路由策略

DeepSeek 有两档模型，根据任务选择合适的：

## Flash 适用（省钱、快）
- 读取文件、搜索代码
- 简单编辑（改个变量名、修个 typo、加一行日志）
- 运行命令查看结果
- 查找文档/API 用法
- 回答简单问题

## Pro 适用（聪明、贵）
- 设计架构方案
- 调试复杂 Bug（需要深入分析）
- 安全审查
- 重构超过 50 行的代码
- 多文件协同改动
- 任何拿不准的事

## 经验法则

```
如果你觉得"这个很简单，随便搞搞就行" → Flash
如果你觉得"让我想想怎么搞" → Pro
如果你不确定 → Pro（一次 Pro 比三次失败的 Flash 便宜）
```

## 子代理路由
- planner → 默认 Pro
- code-reviewer → 默认 Pro
- debugger → 默认 Pro
- tdd-executor → Flash 写简单测试，Pro 写复杂实现
- refactorer → 小重构 Flash，大重构 Pro

## 注意
这个路由策略是我（CLAUDE.md 中的 AI）在接到任务时自行判断的。
如果用户明确说了用哪个模型，以用户为准。
