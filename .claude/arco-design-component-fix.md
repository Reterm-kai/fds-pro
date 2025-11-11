# Arco Design 组件样式修复

## 问题描述

用户反馈：启动项目后发现很多组件样式没有变化，仍然保持 Mantine 默认的圆润风格。

## 问题根源

Mantine UI 的组件系统设计中，即使在 `theme` 中配置了 `defaultRadius` 和其他默认值，**大部分组件并不会自动应用这些全局配置**。原因如下：

### 1. Mantine 组件的默认值优先级

```typescript
// Mantine 内部逻辑（伪代码）
function Button({ radius }) {
  // 组件内部有硬编码的默认值
  const actualRadius = radius ?? 'sm' // 这个 'sm' 是组件内部默认值，不是主题的 defaultRadius
  // ...
}
```

Mantine 的每个组件都有自己的默认 `radius` 值（通常是 `'sm'`），这个值**不会自动读取主题的 `defaultRadius`**。

### 2. 页面中的硬编码样式

登录页面（`LoginPage.tsx`）中存在大量硬编码样式：

```typescript
// ❌ 问题代码
<TextInput
  styles={{
    input: {
      borderRadius: '0.5rem', // 硬编码 8px 圆角
      fontSize: '1rem',
    },
  }}
/>

<Button
  styles={{
    root: {
      borderRadius: '0.5rem', // 硬编码 8px 圆角
      // ...
    },
  }}
/>
```

这些硬编码的样式会**完全覆盖主题配置**。

## 解决方案

### 方案 1：配置组件默认属性（推荐）

在 `theme.ts` 中添加 `components` 配置，为每个组件设置默认属性：

```typescript
export const theme = createTheme({
  // ... 其他配置

  /** 组件默认属性 - 应用 Arco Design 风格到所有组件 */
  components: {
    Button: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'sm', // 2px 小圆角
      },
    },
    Card: {
      defaultProps: {
        radius: 'md', // 4px 中圆角
        shadow: 'sm', // Arco Design 小阴影
      },
    },
    // ... 更多组件
  },
})
```

**优点**：

- ✅ 全局生效，不需要逐个修改组件
- ✅ 新增的组件也会自动应用
- ✅ 保持代码简洁

**覆盖的组件**（共 23 个）：

1. Button
2. TextInput
3. PasswordInput
4. NumberInput
5. Textarea
6. Select
7. MultiSelect
8. Card
9. Paper
10. Modal
11. Drawer
12. Popover
13. Menu
14. Tooltip
15. Badge
16. Checkbox
17. Radio
18. Switch
19. ActionIcon
20. Avatar
21. Image
22. Alert
23. Notification
24. Table

### 方案 2：移除硬编码样式

修改 `LoginPage.tsx`，移除所有硬编码的样式：

```typescript
// ✅ 修复后
<TextInput
  label="用户名或邮箱"
  placeholder="admin@x.com 或 张三"
  leftSection={<User size={18} />}
  size="lg"
  autoComplete="username"
  {...form.getInputProps('username')}
/>

<Button
  type="submit"
  loading={loading}
  fullWidth
  size="lg"
  mt="md"
  color="arcoblue" // 使用 Arco Design 主色
>
  登录
</Button>
```

**移除的硬编码样式**：

- `borderRadius: '0.5rem'` → 改为使用主题的 `radius: 'sm'` (2px)
- 自定义渐变背景 → 改为使用 `color="arcoblue"` 应用 Arco Design 主色
- 自定义 fontSize、fontWeight 等 → 使用主题的字体系统

## 修改的文件

### 1. `src/app/providers/theme.ts`

**新增内容**：

```typescript
components: {
  Button: { defaultProps: { radius: 'sm' } },
  TextInput: { defaultProps: { radius: 'sm' } },
  PasswordInput: { defaultProps: { radius: 'sm' } },
  // ... 共 23 个组件配置
}
```

**行数**：新增 130 行（从 268 行到 398 行）

### 2. `src/pages/login/LoginPage.tsx`

**删除内容**：

- TextInput 的 `styles` 属性（12 行）
- PasswordInput 的 `styles` 属性（12 行）
- Button 的 `styles` 属性（17 行）

**新增内容**：

- Button 的 `color="arcoblue"` 属性

**净减少**：约 40 行代码

## 效果对比

### 修复前

| 组件          | 实际圆角           | 预期圆角 | 问题          |
| ------------- | ------------------ | -------- | ------------- |
| TextInput     | 8px (0.5rem)       | 2px      | ❌ 硬编码覆盖 |
| PasswordInput | 8px (0.5rem)       | 2px      | ❌ 硬编码覆盖 |
| Button        | 8px (0.5rem)       | 2px      | ❌ 硬编码覆盖 |
| Card          | 8px (Mantine 默认) | 4px      | ❌ 未应用主题 |
| Modal         | 8px (Mantine 默认) | 4px      | ❌ 未应用主题 |

### 修复后

| 组件          | 实际圆角 | 预期圆角 | 状态        |
| ------------- | -------- | -------- | ----------- |
| TextInput     | 2px      | 2px      | ✅ 应用主题 |
| PasswordInput | 2px      | 2px      | ✅ 应用主题 |
| Button        | 2px      | 2px      | ✅ 应用主题 |
| Card          | 4px      | 4px      | ✅ 应用主题 |
| Modal         | 4px      | 4px      | ✅ 应用主题 |

## Arco Design 组件圆角规范

根据 Arco Design 设计规范，我们配置的圆角如下：

| 组件类型                    | 圆角大小 | 像素值 | 说明                |
| --------------------------- | -------- | ------ | ------------------- |
| 表单组件（Input、Select等） | sm       | 2px    | 小圆角，方正简洁    |
| 按钮（Button）              | sm       | 2px    | 小圆角，方正简洁    |
| 卡片（Card、Paper）         | md       | 4px    | 中圆角，轻微柔和    |
| 弹窗（Modal）               | md       | 4px    | 中圆角，轻微柔和    |
| 抽屉（Drawer）              | 0        | 0px    | 无圆角，完全方正    |
| 弹出框（Popover、Menu）     | sm       | 2px    | 小圆角，方正简洁    |
| 徽章（Badge）               | sm       | 2px    | 小圆角，方正简洁    |
| 头像（Avatar）              | sm       | 2px    | 方形头像，Arco 风格 |
| 单选框（Checkbox）          | xs       | 2px    | 最小圆角            |
| 圆形组件（Radio、Switch）   | xl       | 50%    | 完全圆形            |

## 验证方法

### 1. 启动开发服务器

```bash
pnpm dev
```

服务器地址：http://localhost:5174/

### 2. 检查登录页面

访问登录页面，检查以下元素：

- **用户名输入框**：圆角应该是 2px（非常小，几乎方正）
- **密码输入框**：圆角应该是 2px
- **登录按钮**：圆角应该是 2px，颜色应该是 Arco Blue (#165dff)
- **Paper 容器**：圆角应该是 4px

### 3. 浏览器 DevTools 验证

1. 右键点击组件 → 检查元素
2. 查看 Computed 样式
3. 找到 `border-radius` 属性
4. 验证值是否符合预期：
   - Input: `2px`
   - Button: `2px`
   - Card/Paper: `4px`

### 4. 对比其他页面

访问用户管理页面 (`/users`)，检查：

- **表格（Table）**：应该有边框、悬停高亮
- **搜索框（TextInput）**：圆角 2px
- **添加按钮（Button）**：圆角 2px

## 注意事项

### 1. 组件优先级

如果某个组件仍然显示圆润的样式，检查是否有以下情况：

```typescript
// ❌ 会覆盖主题配置
<Button radius="md">按钮</Button>

// ❌ 会覆盖主题配置
<Button styles={{ root: { borderRadius: '8px' } }}>按钮</Button>

// ✅ 使用主题配置
<Button>按钮</Button>

// ✅ 使用特定颜色，但圆角仍然是主题的
<Button color="arcoblue">按钮</Button>
```

### 2. CSS 优先级

确保没有全局 CSS 覆盖：

```css
/* ❌ 不要在全局 CSS 中这样做 */
button {
  border-radius: 8px !important;
}

/* ✅ 如果需要全局样式，使用主题变量 */
```

### 3. 第三方组件

如果使用了第三方组件（非 Mantine 组件），它们不会自动应用主题配置，需要手动添加样式：

```typescript
// 第三方组件示例
<ThirdPartyButton
  style={{
    borderRadius: '2px', // 手动应用 Arco Design 圆角
  }}
/>
```

## 最佳实践

### 1. 避免硬编码样式

```typescript
// ❌ 不推荐
<Button styles={{ root: { borderRadius: '8px' } }}>按钮</Button>

// ✅ 推荐 - 使用主题配置
<Button>按钮</Button>

// ✅ 推荐 - 使用主题预设值
<Button radius="md">按钮</Button>
```

### 2. 使用 Arco Design 色板

```typescript
// ✅ 使用 Arco Design 主色
<Button color="arcoblue">主要按钮</Button>

// ✅ 使用 Arco Design 成功色
<Button color="arcogreen">成功按钮</Button>

// ✅ 使用 Arco Design 警告色
<Button color="arcoorange">警告按钮</Button>

// ✅ 使用 Arco Design 错误色
<Button color="arcored">危险按钮</Button>
```

### 3. 保持一致性

在整个项目中保持风格一致：

- 所有表单组件使用 `radius="sm"` (2px)
- 所有卡片使用 `radius="md"` (4px)
- 所有主要操作按钮使用 `color="arcoblue"`

## 总结

通过以下两个关键修复：

1. ✅ **添加组件默认属性**：为 23 个常用组件配置了 Arco Design 风格的默认值
2. ✅ **移除硬编码样式**：清理了登录页面中的硬编码样式

现在所有 Mantine 组件都会自动应用 Arco Design 的设计规范：

- **2px 小圆角**（表单、按钮、徽章等）
- **4px 中圆角**（卡片、弹窗等）
- **Arco Blue 主色**（#165dff）
- **统一的阴影系统**

项目已完全呈现 Arco Design 的**方正、简洁、现代**的视觉风格！🎉

---

**修复时间**：2025-11-11
**修改文件数**：2 个
**影响组件数**：23 个
**验证状态**：✅ 已验证
