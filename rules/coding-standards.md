# 编码规范

## 通用原则

### 简单优先
- 能用 3 行解决的不写 30 行
- 不做"以后可能用到"的抽象
- 不为一劳永逸写框架，只为当前需求写代码
- 如果发现自己在写"灵活的"、"可扩展的"代码，停下来问：现在真需要吗？

### 命名
- 函数名应该描述它**做什么**，而非**怎么做**
- 布尔变量用 `is_`/`has_`/`should_` 前缀
- 不用缩写，除非是行业通用缩写（id、url、api）
- 不用单字母变量（循环索引 i/j 除外）

```python
# ✅ 好
def get_expired_users(users: list[User]) -> list[User]: ...
is_authenticated = True

# ❌ 差
def proc(ul): ...  # 看不懂要干嘛
auth = True         # 是验证通过还是需要验证？
```

### 函数设计
- 一个函数只做一件事
- 超过 50 行考虑拆分
- 参数超过 5 个用对象/字典传参
- 优先返回而非打印（方便测试和复用）

### 注释
- 不写"做什么"的注释（代码应该自解释）
- 只写"为什么这样做"的注释（非显而易见的决策）
- 不写注释掉的代码（用 git history）

```python
# ✅ 有必要的注释
# 用 SHA-256 而非 MD5，因为需要防止碰撞攻击
hash = hashlib.sha256(data)

# ❌ 多余的注释
# 计算 hash
hash = hashlib.sha256(data)  # 这行注释没有任何信息增量
```

### 错误处理
- 只处理可能发生的错误场景
- 不写 `try-except` 捕获一切然后忽略
- 错误信息要包含上下文：哪个操作失败、为什么

```python
# ✅ 好
try:
    user = db.get_user(id)
except UserNotFound:
    raise ValueError(f"用户 {id} 不存在")

# ❌ 差
try:
    user = db.get_user(id)
except:
    pass  # 吞掉所有错误，问题被隐藏
```

## 文件组织
- 一个文件一个核心概念
- 超过 500 行的文件考虑拆分
- 导入顺序：标准库 → 第三方库 → 项目内部

## 语言选择
- 根据项目已有技术栈选择语言
- 新项目优先：Python（快速原型）→ TypeScript（全栈应用）→ Go（高性能服务）
