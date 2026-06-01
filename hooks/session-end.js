#!/usr/bin/env node
/**
 * SessionEnd Hook - 会话结束复盘提示
 */

const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = process.env.CLAUDE_PROJECT_ROOT || process.cwd();
const LEARNED_DIR = path.join(PROJECT_ROOT, ".claude", "learned");

// 统计已学规则
const feedbackCount = fs.existsSync(path.join(LEARNED_DIR, "feedback"))
  ? fs.readdirSync(path.join(LEARNED_DIR, "feedback")).filter((f) => f.endsWith(".md")).length
  : 0;
const patternCount = fs.existsSync(path.join(LEARNED_DIR, "patterns"))
  ? fs.readdirSync(path.join(LEARNED_DIR, "patterns")).filter((f) => f.endsWith(".md")).length
  : 0;
const prefCount = fs.existsSync(path.join(LEARNED_DIR, "preferences"))
  ? fs.readdirSync(path.join(LEARNED_DIR, "preferences")).filter((f) => f.endsWith(".md")).length
  : 0;

console.log("\n📋 会话结束检查：");
console.log(`  纠正规则: ${feedbackCount} | 验证模式: ${patternCount} | 偏好: ${prefCount}`);

// 如果本次会话有新反馈但未写入，提醒
const pendingPath = path.join(LEARNED_DIR, ".pending-retro.md");
if (fs.existsSync(pendingPath)) {
  console.log("\n⚠️  有待处理的反馈未写入，请运行 /retro 完成复盘");
} else {
  console.log("\n💡 本次会话有值得记住的规则吗？说 /retro 开始复盘");
}
