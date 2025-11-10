# 快速参考：项目忽略配置文件

本文档提供项目中所有忽略配置文件的快速参考。

## 📁 忽略配置文件列表

| 文件                | 用途                 | 影响的工具              |
| ------------------- | -------------------- | ----------------------- |
| `.gitignore`        | Git 版本控制忽略     | Git, Claude Code (默认) |
| `.claudeignore`     | Claude Code 索引忽略 | Claude Code             |
| `.prettierignore`   | Prettier 格式化忽略  | Prettier                |
| `eslint.config.js`  | ESLint 检查忽略      | ESLint                  |
| `tsconfig.app.json` | TypeScript 编译忽略  | TypeScript 编译器       |

## 🎯 核心忽略目录

所有工具都应该忽略这些目录：

```
node_modules/     # 依赖包 (最大性能影响)
dist/             # Vite 构建产物
dist-ssr/         # SSR 构建产物
storybook-static/ # Storybook 构建产物
coverage/         # 测试覆盖率报告
.git/             # Git 仓库数据
```

## ⚡ 快速检查命令

```bash
# 1. 检查 Git 忽略是否生效
git status

# 2. 检查 ESLint 忽略是否生效
pnpm lint

# 3. 检查 Prettier 忽略是否生效
pnpm format:check

# 4. 检查 TypeScript 忽略是否生效
pnpm build

# 5. 查看所有忽略配置文件
ls -la | grep ignore
cat .gitignore .claudeignore .prettierignore
```

## 📝 修改忽略配置的步骤

当需要添加新的忽略规则时：

1. **识别目标** - 确定要忽略什么（文件/目录）
2. **选择工具** - 确定需要在哪些工具中忽略
3. **更新配置** - 在相应的配置文件中添加规则
4. **验证生效** - 运行对应的检查命令

### 示例：添加 `temp/` 目录忽略

```bash
# 1. Git 忽略
echo "temp/" >> .gitignore

# 2. Claude Code 忽略
echo "temp/" >> .claudeignore

# 3. Prettier 忽略
echo "temp/" >> .prettierignore

# 4. ESLint 忽略 (编辑 eslint.config.js)
# 在 globalIgnores 数组中添加 'temp'

# 5. TypeScript 忽略 (编辑 tsconfig.app.json)
# 在 exclude 数组中添加 "temp"

# 6. 验证
git status
pnpm lint
pnpm format:check
```

## 🔍 常见问题

### Q: 为什么需要这么多忽略配置文件？

A: 每个工具都有自己的配置系统：

- Git 管理版本控制
- ESLint 检查代码质量
- Prettier 格式化代码
- TypeScript 编译代码
- Claude Code 分析和理解代码

它们相互独立，所以需要分别配置。

### Q: `.claudeignore` 是必需的吗？

A: 不是必需的。Claude Code 默认会遵循 `.gitignore`。但 `.claudeignore` 可以提供更精确的控制，特别是当你想要：

- 在 Git 中追踪但不让 Claude Code 索引的文件
- 提高 Claude Code 的响应速度
- 减少不相关文件的干扰

### Q: 修改忽略配置后需要重启工具吗？

A: 大多数情况下不需要：

- Git: 立即生效
- ESLint/Prettier: 下次运行时生效
- TypeScript: 下次编译时生效
- Claude Code: 可能需要重新索引项目

## 📚 完整文档

详细信息请参考：`.claude/ignore-configuration.md`

---

最后更新: 2025-11-10
