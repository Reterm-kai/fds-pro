# 项目忽略配置说明

本文档说明项目中各个工具如何配置忽略文件和目录。

## 📋 总览

以下目录在所有工具中被忽略：

- `node_modules` - 依赖包目录
- `dist` - Vite 构建输出
- `dist-ssr` - SSR 构建输出
- `storybook-static` - Storybook 构建输出
- `coverage` - 测试覆盖率报告
- `public` - 公共静态资源（MSW 等）
- `.storybook` - Storybook 配置（仅 ESLint 和 Prettier）
- `.git` - Git 仓库目录
- `.idea` - JetBrains IDE 配置

## 🔧 各工具配置详情

### 1. Claude Code (`.claudeignore`)

**作用**: 控制 Claude Code 在索引、搜索和分析代码时忽略的文件和目录

**配置文件**: `.claudeignore`

**配置方式**: 使用类似 `.gitignore` 的格式

**已忽略**:

- `node_modules/` - 依赖包
- `dist/`, `dist-ssr/`, `build/` - 构建产物
- `coverage/` - 测试覆盖率
- `storybook-static/` - Storybook 构建产物
- `.cache/`, `.temp/`, `.tmp/` - 缓存和临时文件
- `*.log` - 日志文件
- `.vscode/`, `.idea/` - 编辑器配置
- `.git/` - Git 仓库
- `*.local` - 本地环境变量

**说明**:

- Claude Code 默认会遵循 `.gitignore` 的规则
- `.claudeignore` 可以提供更精确的控制
- 忽略这些文件可以提高 Claude Code 的响应速度和相关性

### 2. Git (`.gitignore`)

**作用**: 控制哪些文件不被 Git 版本控制追踪

**配置文件**: `.gitignore`

**已忽略**:

- `node_modules` - 依赖包
- `dist`, `dist-ssr` - 构建产物
- `*.local` - 本地环境变量文件
- `*.log` - 日志文件
- `storybook-static` - Storybook 构建产物
- `.vscode/*`, `.idea` - 编辑器配置
- `.DS_Store` - macOS 系统文件

### 2. ESLint (`eslint.config.js`)

**作用**: 控制 ESLint 代码检查时忽略的文件和目录

**配置文件**: `eslint.config.js`

**配置方式**: 使用 Flat Config 的 `globalIgnores`

```javascript
globalIgnores([
  'dist',
  'node_modules',
  'storybook-static',
  '.storybook',
  'public',
  'coverage',
])
```

**验证命令**: `pnpm lint`

### 3. Prettier (`.prettierignore`)

**作用**: 控制 Prettier 代码格式化时忽略的文件和目录

**配置文件**: `.prettierignore`

**已忽略**:

```
# 依赖
node_modules

# 构建产物
dist
dist-ssr
*.tsbuildinfo
storybook-static

# 配置目录
.storybook

# 其他
.idea
.git
*.log
pnpm-lock.yaml
coverage
```

**验证命令**:

- `pnpm format:check` - 检查格式
- `pnpm format` - 格式化代码

### 4. TypeScript (`tsconfig.app.json`)

**作用**: 控制 TypeScript 编译时排除的文件和目录

**配置文件**: `tsconfig.app.json`

**配置方式**: 使用 `exclude` 数组

```json
"exclude": [
  "src/**/*.stories.tsx",
  "src/**/*.stories.ts",
  "src/stories",
  "node_modules",
  "dist",
  "dist-ssr",
  "storybook-static"
]
```

**说明**:

- TypeScript 默认会排除 `node_modules`，但显式声明更清晰
- `src/**/*.stories.tsx` 被排除，因为它们由 Storybook 的 tsconfig 处理

**验证命令**: `pnpm build` (会先运行 `tsc -b`)

## ✅ 验证配置正确性

运行以下命令确保所有配置生效：

```bash
# 1. 验证 TypeScript 编译（不会扫描 dist、node_modules）
pnpm build

# 2. 验证 ESLint（不会检查忽略的目录）
pnpm lint

# 3. 验证 Prettier（不会格式化忽略的文件）
pnpm format:check

# 4. 查看 Git 状态（忽略的文件不会显示为未追踪）
git status
```

## 🎯 最佳实践

### 添加新的忽略规则

如果需要忽略新的文件或目录，需要在**所有相关配置文件**中添加：

1. **Git 忽略**: 编辑 `.gitignore`
2. **ESLint 忽略**: 编辑 `eslint.config.js` 的 `globalIgnores` 数组
3. **Prettier 忽略**: 编辑 `.prettierignore`
4. **TypeScript 忽略**: 编辑 `tsconfig.app.json` 的 `exclude` 数组（如适用）

### 常见场景示例

#### 场景 1: 添加新的构建输出目录

假设要添加 `build` 目录：

```bash
# 1. .gitignore
echo "build" >> .gitignore

# 2. eslint.config.js
# 在 globalIgnores 数组中添加 'build'

# 3. .prettierignore
echo "build" >> .prettierignore

# 4. tsconfig.app.json
# 在 exclude 数组中添加 "build"
```

#### 场景 2: 添加临时文件忽略

假设要忽略所有 `.tmp` 文件：

```bash
# .gitignore
echo "*.tmp" >> .gitignore

# .prettierignore
echo "*.tmp" >> .prettierignore
```

## 📝 注意事项

1. **Claude Code 遵循 `.gitignore`**: Claude Code 默认会尊重 `.gitignore` 的规则，`.claudeignore` 提供额外的精确控制
2. **不要忽略重要的配置文件**: 如 `package.json`、`tsconfig.json` 等
3. **TypeScript 的 include 优先级高于 exclude**: 只有 `src/**/*` 被包含
4. **ESLint Flat Config 不使用 `.eslintignore` 文件**: 使用 `globalIgnores` 替代
5. **Prettier 会自动忽略 `.gitignore` 中的文件**: 但建议在 `.prettierignore` 中显式声明
6. **`pnpm-lock.yaml` 不应该被 Git 忽略**: 它需要被提交以保证依赖版本一致性
7. **忽略大型目录可提升性能**: 特别是 `node_modules`、`dist` 等对 Claude Code 和其他工具的性能影响很大

## 🔍 故障排查

### 问题: ESLint 仍在扫描 node_modules

**解决方案**:

- 检查 `eslint.config.js` 中的 `globalIgnores` 是否包含 `node_modules`
- 确保使用的是 Flat Config (ESLint 9.x)

### 问题: Prettier 格式化了构建产物

**解决方案**:

- 检查 `.prettierignore` 是否包含相关目录
- 运行 `pnpm format:check` 确认忽略配置生效

### 问题: TypeScript 编译了测试文件

**解决方案**:

- 检查 `tsconfig.app.json` 的 `exclude` 数组
- 确保测试文件路径正确匹配

### 问题: Claude Code 响应缓慢或扫描不相关的文件

**解决方案**:

- 检查 `.claudeignore` 文件是否存在并包含必要的忽略规则
- 确保 `node_modules`、`dist` 等大型目录已被忽略
- Claude Code 会自动遵循 `.gitignore`，但 `.claudeignore` 提供更精确的控制

## 📊 当前配置摘要

| 目录/文件        | Claude Code | Git | ESLint | Prettier | TypeScript |
| ---------------- | ----------- | --- | ------ | -------- | ---------- |
| node_modules     | ✅          | ✅  | ✅     | ✅       | ✅         |
| dist             | ✅          | ✅  | ✅     | ✅       | ✅         |
| dist-ssr         | ✅          | ✅  | ❌     | ✅       | ✅         |
| storybook-static | ✅          | ✅  | ✅     | ✅       | ✅         |
| .storybook       | ❌          | ❌  | ✅     | ✅       | ❌         |
| public           | ❌          | ❌  | ✅     | ❌       | ❌         |
| coverage         | ✅          | ❌  | ✅     | ✅       | ❌         |
| .git             | ✅          | ❌  | ❌     | ✅       | ❌         |
| .idea            | ✅          | ✅  | ❌     | ✅       | ❌         |
| .vscode          | ✅          | ✅  | ❌     | ❌       | ❌         |
| \*.log           | ✅          | ✅  | ❌     | ✅       | ❌         |
| \*.local         | ✅          | ✅  | ❌     | ❌       | ❌         |
| pnpm-lock.yaml   | ❌          | ❌  | ❌     | ✅       | ❌         |

✅ = 已忽略
❌ = 未忽略（或不适用）

---

最后更新: 2025-11-10
