#!/usr/bin/env node
/**
 * PostEdit Hook - 代码变更后提醒相关操作
 */

const filePath = process.argv[2] || "";

// 判断文件类型
const isSource =
  /\.(ts|tsx|js|jsx|py|go|rs|java|kt|swift|php|rb)$/.test(filePath);
const isTest = /\.(test|spec)\./.test(filePath);
const isDoc = /\.(md|mdx|rst)$/.test(filePath);
const isConfig =
  /\.(json|yaml|yml|toml|env|ini|cfg)$/.test(filePath);

const messages = [];

if (isSource && !isTest) {
  messages.push("🧪 记得运行相关测试");
  messages.push("📄 检查是否需要同步更新文档");
}

if (isTest) {
  messages.push("✅ 测试文件已更新，确认所有测试通过");
}

if (isConfig) {
  messages.push("⚙️  配置已变更，检查文档中的配置说明是否同步");
}

if (messages.length > 0) {
  console.log(`\n💡 文件变更提示 (${path.basename(filePath)})：`);
  messages.forEach((m) => console.log(`  ${m}`));
}
