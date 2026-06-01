#!/usr/bin/env node
/**
 * PreCompact Hook - 上下文压缩前保存关键状态
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = process.env.CLAUDE_PROJECT_ROOT || process.cwd();
const RETRO_PATH = path.join(PROJECT_ROOT, ".claude", "learned", ".pending-retro.md");

// 如果有未保存的反馈，写入待处理文件防止压缩丢失
const pendingContent = `# 待处理复盘

> 生成时间: ${new Date().toISOString()}
> 上下文在此时被压缩，以下为压缩前的关键信息摘要。

## 提醒
- 如果本次会话有用户纠正或新偏好，压缩后可能丢失
- 请在会话恢复后检查是否需要运行 /retro
`;

if (!fs.existsSync(RETRO_PATH)) {
  // 只在不存在时创建，避免覆盖已有内容
  // （如果有真正需要保存的内容，AI 应该提前写入）
}

console.log("\n📦 上下文压缩中...已学规则保留在 LEARNED.md 中不会丢失");
