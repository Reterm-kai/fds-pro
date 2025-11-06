# Repository Guidelines

## 项目结构与模块组织

- 采用 Feature-Sliced Design：`src/app/` 负责应用骨架（`layouts/AppLayout.tsx`、`providers/AppProviders.tsx`、`routes/router.tsx`），`src/pages/` 放置页面壳层，`src/features/` 落地具体业务场景（如 `user-management`），`src/entities/` 存储领域模型与 Query Key，`src/shared/` 承载通用 API、配置、UI 与 mock，`src/widgets/` 封装导航等复合界面模块。
- 入口 `src/main.tsx` 装载 `AppProviders` 并在开发模式启动 MSW；路由统一在 `@/app/routes/router`，菜单配置位于 `@/shared/navigation/menu`，Mock 数据存于 `@/shared/mock/`。公共静态资源继续放在 `public/` 与 `src/assets/`。

## 构建、测试与开发命令

- `pnpm install`：安装依赖，保持锁定版本；`pnpm dev` 启动 Vite 开发服务，`pnpm preview` 验证生产构建。
- `pnpm build`：执行 TypeScript 项目引用检查并产出生产包；`pnpm lint`、`pnpm format`/`format:check` 保障风格与语法一致。
- 测试矩阵：`pnpm test` 开启 Vitest watch，`pnpm test:run` 适配 CI，`pnpm test:coverage` 产出覆盖率；Storybook 通过 `pnpm storybook` 与 `pnpm build-storybook` 运行与打包。

## 编码风格与命名约定

- 全面使用 TypeScript + ES 模块语法，缩进 2 空格；组件、特性模块使用 `PascalCase`，函数与 Hook 用 `camelCase`，特性目录采用 `kebab-case`；通过路径别名 `@/...` 引入资源，避免相对路径穿越。
- 远端数据统一通过 TanStack Query，在 `@/shared/config/queryClient` 配置默认策略；通用 API 调用封装在 `@/shared/api/client`，避免重复拼装 fetch。
- 提交前运行 `pnpm format && pnpm lint`，如需调整 lint/format 规则需在 PR 说明中说明原因与影响面。

## 测试规范

- Vitest + Testing Library 为默认组合，测试文件与实现同目录命名为 `*.test.ts(x)`；跨模块复用的测试工具放在 `src/test/`。
- Mock 通道统一由 `@/shared/mock` 管理，避免在测试中手动伪造网络层；新增 Handler 请在 `handlers` 与 `data` 子目录维护并更新共享状态。
- 保障关键路径与异常分支均有覆盖；如引入新特性需在 PR 中粘贴覆盖率摘要或说明差异原因。

## 提交与拉取请求规范

- 鼓励 `类型: 描述` 的提交信息，例如 `feat: 支持用户批量导入`、`fix: 修复分页切换闪烁`，语义化标注更利于回溯。
- PR 描述需包含背景/目标、实现要点、测试结论及 UI 变更截图（若有）；使用 `Closes #123` 关联需求或缺陷，明确风险与后续事项。
- 提交评审前确保 lint、单测与构建全部通过；若存在临时性限制，请在 PR 中显式声明，方便评审人评估上线风险。

## 安全与配置提示

- 环境变量放入 `.env.{mode}`，仅以 `VITE_` 前缀暴露到客户端；敏感字段需通过后端代理或密钥服务处理。
- 网络请求请复用 `@/shared/api/client` 与统一的 QueryClient；涉及权限控制时，可在 `AppLayout` 或路由守卫中校验用户态，并结合特性模块的能力按需懒加载。
