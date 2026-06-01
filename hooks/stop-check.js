#!/usr/bin/env node
/**
 * Stop Hook - AI 停止时检查状态
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = process.env.CLAUDE_PROJECT_ROOT || process.cwd();
const warnDir = path.join(PROJECT_ROOT, ".claude", "learned", ".warnings");

// 检查是否有未读的警告
if (fs.existsSync(warnDir)) {
  const warnings = fs.readdirSync(warnDir).filter((f) => f.endsWith(".json"));
  if (warnings.length > 0) {
    console.log(`\n🔔 本次会话产生 ${warnings.length} 条危险操作警告`);
    // 清理旧警告
    warnings.forEach((f) => fs.unlinkSync(path.join(warnDir, f)));
  }
}
