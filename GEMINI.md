# 🚀 YOU-DRIVE-SOP 快速操作看板 (Workshop)

> **"AI 驱动逻辑，你驱动规约。"**

当前已链接母库：`D:\AI project\YOU-DRIVE-SOP`
物理链路类型：`junction`

## 🚥 12 步生产生命周期
所有的开发任务 **必须** 严格遵循 [**12 步工业级操作协议**](./GETTING_STARTED.md#🚦-生产生命周期-the-12-step-protocol)：
`Issue -> Branch -> Propose -> Apply -> Verify -> Distill -> Archive -> Merge`

## 常用指令集
### 场景 A：新功能开发 (Feature)
- `/opsx:propose "功能名称"` —— 发起新功能提案。
- `/opsx:apply` —— 按照 `tasks.md` 步进执行任务。
- `/opsx:verify` —— 物理核对规格 Scenario 是否达成。

### 场景 B：资产提纯与维护 (Maintenance)
- `activate_skill meta-distiller` —— 执行逻辑提取与参数化。
- `activate_skill workshop-sync` —— **[Copied 模式专用]** 拉取母库最新更新。
- `/opsx:archive` —— 执行智力资产反哺并归档变更。

## 🚦 状态查询指令
您可以随时向 AI 发起以下查询，以确认物理对齐状态：
- 『**目前的初始化状态如何？**』 —— AI 将检查链路、宪法与协议的完整性。
- 『**我接下来该做什么？**』 —— AI 将根据 `ops_changelog.md` 和 `tasks.md` 给出下一步建议。

## 行为约束
- 所有的 AI 操作必须遵循 [母库全局标准](./.gemini/global_standard.md) 与 [代理协议](./AGENTS.md)。
