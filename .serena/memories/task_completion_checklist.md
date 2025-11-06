# 任务完成检查清单

## 每次改动后必须执行

1. **类型检查**

   ```bash
   tsc -b
   ```

2. **代码检查**

   ```bash
   pnpm lint
   ```

3. **代码格式化**

   ```bash
   pnpm format
   ```

4. **运行测试**

   ```bash
   pnpm test:run
   ```

5. **本地验证**
   ```bash
   pnpm dev
   # 手动测试改动的功能
   ```

## 注意事项

- **禁止** 使用 CI/远程流水线验证
- **必须** 本地执行所有验证
- **必须** 记录无法验证的部分及原因
- **必须** 生成验证报告到 `.claude/verification-report.md`
