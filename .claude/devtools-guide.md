# Redux DevTools 使用指南

## 🎯 测试登录/登出功能

### 访问应用

开发服务器已启动：**http://localhost:5173/**

### 测试账号

根据 Mock 数据，可使用以下测试账号：

```
用户名：admin
密码：admin123
```

或：

```
用户名：user
密码：user123
```

### 测试步骤

1. **测试登录流程**
   - 访问 http://localhost:5173/login
   - 输入测试账号
   - 勾选/取消"记住我"测试持久化
   - 点击登录
   - ✅ 应该跳转到仪表盘 `/dashboard`

2. **验证认证状态**
   - 查看右上角用户头像
   - 应该显示用户名首字母
   - 刷新页面，状态应该保持（持久化验证）

3. **测试登出流程**
   - 点击右上角头像
   - 点击"退出登录"
   - ✅ 应该跳转到登录页 `/login`
   - localStorage 中的 `auth-storage` 应该被清除

4. **测试受保护路由**
   - 登出状态下访问 http://localhost:5173/dashboard
   - ✅ 应该自动重定向到登录页

---

## 🛠️ Redux DevTools 安装与使用

### 安装浏览器扩展

**Chrome / Edge**:

- 访问：https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
- 点击"添加至 Chrome"

**Firefox**:

- 访问：https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/
- 点击"添加至 Firefox"

**Safari**:

- 访问 App Store 搜索 "Redux DevTools"

### 使用 DevTools 调试

1. **打开 DevTools**
   - 在浏览器中按 `F12` 或 `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - 找到 **Redux** 标签页
   - 如果没有看到，刷新页面

2. **查看 AuthStore 状态**

   你应该看到以下内容：

   ```
   AuthStore
   ├─ user: null (登出状态) / { id, name, email, ... } (登录状态)
   ├─ isAuthenticated: false / true
   └─ isInitialized: true
   ```

3. **追踪操作历史**

   在左侧面板可以看到所有触发的 action：

   ```
   @@INIT
   auth/initialize
   auth/login       ← 登录时触发
   auth/setUser
   auth/logout      ← 登出时触发
   ```

4. **时间旅行调试**
   - 点击任意 action 查看当时的状态快照
   - 使用"播放/暂停"按钮回放状态变化
   - 点击"跳转"按钮回到历史某个时刻

5. **状态差异对比**
   - 选择一个 action
   - 切换到 **Diff** 标签
   - 查看状态前后的变化（高亮显示）

6. **导出/导入状态**
   - 点击底部的"下载"按钮导出当前状态
   - 用于复现 bug 或分享状态快照

---

## 🎨 DevTools 功能详解

### 1. Inspector 面板

显示当前选中 action 的详细信息：

- **Action**: 触发的操作名称（如 `auth/login`）
- **State**: 操作后的完整状态树
- **Diff**: 状态变化对比（前后差异）

### 2. Chart 标签

可视化状态树结构，以树形图展示。

### 3. Trace 标签

显示调用栈，帮助定位 action 触发位置。

### 4. 测试生成器

可以根据操作历史自动生成测试代码。

---

## 🧪 实战演练

### 场景 1：调试登录流程

1. 打开 DevTools → Redux 标签
2. 清空历史记录（垃圾桶图标）
3. 在应用中执行登录
4. 观察 action 序列：
   ```
   auth/login
   ├─ Prev State: { user: null, isAuthenticated: false }
   └─ Next State: { user: {...}, isAuthenticated: true }
   ```

### 场景 2：验证持久化

1. 登录后查看 `localStorage.auth-storage`
2. 刷新页面
3. 观察 `auth/initialize` action
4. 验证 user 状态是否恢复

### 场景 3：性能分析

1. 打开 React DevTools (Profiler 标签)
2. 开始录制
3. 执行登录/登出操作
4. 停止录制，查看组件重渲染情况
5. **预期**：只有消费 `user` 的组件重渲染，其他组件不受影响

### 场景 4：时间旅行调试

1. 执行一系列操作（登录 → 导航 → 登出）
2. 在 DevTools 中点击历史中的 `auth/login`
3. 应用状态回到登录时刻
4. 点击"播放"按钮，重放所有操作

---

## 🎯 验证 Zustand 优势

### 对比实验：Context vs Zustand

#### 测试精准订阅

```typescript
// 在 AppHeader 组件中
// 1. 当前只订阅 logout 方法
const logout = useAuthStore(state => state.logout)

// 2. 在其他页面修改 user 信息
// 3. 打开 React DevTools Profiler
// 4. 观察 AppHeader 是否重渲染

// ✅ 预期：不会重渲染（精准订阅生效）
```

#### 测试持久化

```typescript
// 1. 登录后打开 DevTools → Application → Local Storage
// 2. 查看 auth-storage 键值
// 3. 手动修改 user.name
// 4. 刷新页面
// 5. 观察应用是否读取了修改后的值

// ✅ 预期：initialize 时会调用 getCurrentUser API 验证 token
```

---

## 🐛 常见问题

### Q1: 看不到 Redux 标签

**解决方案**：

1. 确认已安装 Redux DevTools 扩展
2. 刷新页面
3. 检查控制台是否有错误
4. 尝试打开隐身窗口（排除其他扩展干扰）

### Q2: 状态显示为空

**解决方案**：

1. 检查 `devtools` 中间件是否正确配置
2. 确认 store 名称设置正确：`{ name: 'AuthStore' }`
3. 查看控制台是否有 Zustand 错误

### Q3: Action 没有显示在历史中

**解决方案**：

1. 确认 `set` 调用时传递了 action 名称：
   ```typescript
   set({ user: null }, false, 'auth/logout')
   //                          ^^^^^^^^^^^^^^
   ```
2. 第二个参数 `false` 表示不替换整个 state

### Q4: 时间旅行后应用行为异常

**说明**：时间旅行只是回溯状态，不会撤销副作用（API 调用、localStorage 等）。
这是正常行为，用于查看历史状态而非完整回退。

---

## 📚 进阶技巧

### 1. 自定义 DevTools 配置

```typescript
create<AuthState>()(
  devtools(
    persist(...),
    {
      name: 'AuthStore',
      enabled: import.meta.env.DEV,  // 仅开发环境启用
      anonymousActionType: 'unknown',
      trace: true,  // 显示调用栈
    }
  )
)
```

### 2. 状态快照对比

1. 执行某个操作后导出状态（快照A）
2. 修改代码后再次执行相同操作
3. 导出状态（快照B）
4. 使用在线 JSON diff 工具对比差异

### 3. 条件断点调试

在 DevTools 中可以对特定 action 设置断点：

1. 点击 action 旁的齿轮图标
2. 选择 "Pause on action"
3. 下次触发该 action 时会自动暂停

---

## 🎉 总结

### DevTools 带来的价值

| 功能     | 价值                   | 使用场景                 |
| -------- | ---------------------- | ------------------------ |
| 状态追踪 | 清晰看到状态变化       | 调试复杂状态流转         |
| 时间旅行 | 快速定位问题发生的时刻 | 复现 bug                 |
| 状态导入 | 重现特定场景           | 测试边界情况             |
| 调用栈   | 定位 action 触发源     | 追踪意外的状态变化       |
| 性能分析 | 识别重渲染问题         | 性能优化                 |
| 状态对比 | 精确查看状态差异       | 验证状态更新是否符合预期 |

### 与 Context API 对比

| 特性       | Context API  | Zustand + DevTools |
| ---------- | ------------ | ------------------ |
| 状态可视化 | ❌ 无        | ✅ 完整状态树      |
| 历史追踪   | ❌ 无        | ✅ 完整操作历史    |
| 时间旅行   | ❌ 无        | ✅ 支持            |
| 状态导出   | ❌ 无        | ✅ 支持            |
| 性能分析   | 需要额外工具 | ✅ 内置            |
| 学习曲线   | 低           | 低（UI 友好）      |

---

**下一步**：打开浏览器，安装 Redux DevTools，开始探索吧！🚀
