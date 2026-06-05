---
name: continuous-improvement
description: 负反馈自进化机制 — 从用户纠正和重复问题中自动学习，更新规则防止问题复发
---

# 持续改进（负反馈机制）

## 触发条件

| 信号 | 示例 | 动作 |
|------|------|------|
| 显式纠正 | "不对"、"不要这样" | 立即起草规则 |
| 重复问题 | 同类错误出现第 2 次 | 标记高频，升级优先级 |
| 偏好表达 | "我习惯用..." | 记录偏好 |
| 有效做法 | "对，就这个思路" | 记录为验证模式 |

## 规则标签（必须带标签，否则不写）

每条新规则必须标注至少一个标签，决定加载时机：

| 标签 | 加载时机 |
|------|---------|
| `general` | 每次会话必加载 |
| `network` | 发起网络请求时 |
| `python` | 处理 Python 代码时 |
| `typescript` | 处理 TypeScript 时 |
| `git` | git 操作时 |
| `shell` | 执行命令时 |
| `frontend` | 处理前端代码时 |
| `database` | 处理数据库时 |

示例：`[python]` `[typescript, frontend]` `[general]`

**general 标签慎用**——只给真正通用的规则（如交流风格），领域规则用具体标签。

## 存储格式

```markdown
---
type: feedback | pattern | preference
tags: [python, git]
severity: must | should | may
date: YYYY-MM-DD
---
{规则内容}
```

## 执行流程

```
检测信号 → 起草规则（含标签）→ 问你确认 → 写入 learned/ → 更新 LEARNED.md
```

## 原则
- 先问再写，不未经确认修改
- 一条规则一件事，加标签
- general 标签少用，领域标签精准
- 可过期可删除，不重复
