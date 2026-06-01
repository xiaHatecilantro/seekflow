# 测试规范

## 测试原则

### 必须写测试的场景
- 新功能：至少 1 个正常情况 + 1 个异常情况
- Bug 修复：先写复现 bug 的测试，确认红色，再修复
- 数据处理/算法逻辑：至少 3 个用例覆盖边界

### 可以不写测试的场景
- 纯 UI 布局调整（CSS 样式变更）
- 配置文件修改
- 一行 typo 修复

### 测试结构
```python
# 每个测试函数三个部分
def test_validate_email_rejects_invalid_format():
    # Arrange（准备）
    validator = EmailValidator()
    
    # Act（执行）
    result = validator.validate("not-an-email")
    
    # Assert（断言）
    assert result.is_valid == False
    assert result.error == "邮箱格式无效"
```

### 好的测试
- 测试**行为**而非实现细节
- 一个测试只测一件事
- 测试名描述场景：`test_<函数名>_<场景>_<期望结果>`
- 不依赖执行顺序，每个测试独立

### 命名规范
```
test_<被测函数>_<输入场景>_<期望行为>
示例：test_validateToken_expiredToken_returnsFalse
```

## 覆盖率
- 目标：核心逻辑 80%+，工具函数 90%+
- 不追求 100%（边际效益递减）
- 用覆盖率报告找"没测到的代码路径"，而非刷数字

## TDD 节奏
```
1. 写 1 个测试 → 运行（红色）→ 写实现 → 运行（绿色）
2. 写第 2 个测试 → 运行（红色）→ 写实现 → 运行（绿色）
3. ...
4. 全部通过后 → 重构 → 运行（保持绿色）
```

每轮控制在 2-5 分钟，不要一次写一堆测试再过。
