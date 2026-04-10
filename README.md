# 🎯 Job-Filter-Wizard (招聘筛选器)

> **基于 Serper.dev + DeepSeek 的智能化招聘信息「真实性」筛选与去重工具**

本项目采用 **YOU-DRIVE-SOP 2.0** 工业级开发框架，通过物理规约（Specs）严格控制筛选逻辑，确保求职者获取高匹配度、实时、去重后的职位列表。

---

## 🌟 核心业务特性

- **双层搜索架构 (Serper + DeepSeek)**：
  - **检索层**：利用 [Serper.dev](https://serper.dev/) (Google Search API) 获取最真实、实时的网页岗位原始数据，彻底杜绝 LLM 幻觉。
  - **提取层**：利用 DeepSeek (LLM) 进行多维度语义理解，从原始数据中精准提取 JSON 字段。
- **历史指纹去重**：采用 `[公司名]_[职位名]` 归一化指纹算法，支持从历史 Markdown 文件自动回溯索引。
- **动态时间感知**：自动计算当前日期，强制过滤发布时间超过 **3 个月** 的过时岗位。
- **交互式批次控制**：每 20 个岗位自动暂停，支持用户实时确认与累计统计。

---

## 👤 使用者指南 (User Guide)

如果您只想使用本工具来检索职位信息，请遵循以下步骤：

### 1. 环境准备

确保已安装 **Node.js (v24.7.0+)**。

### 2. 获取 API 密钥

本工具需要两个密钥：

1. **[DeepSeek API Key](https://platform.deepseek.com/)**：用于数据结构化提取。
2. **[Serper.dev API Key](https://serper.dev/)**：用于执行 Google 联网搜索（提供免费额度）。

### 3. 配置与启动

```bash
# 克隆仓库
git clone <repo-url>
cd Job-Filter-Wizard

# 安装依赖
npm install

# 创建并编辑 .env 文件
# 填入您的 DEEPSEEK_API_KEY 和 SERPER_API_KEY
cp .env.example .env

# 启动程序
npx tsx src/main.ts
```

---

## 🛠️ 开发者指南 (Contributor Guide)

如果您是协助进行深度优化的开发者，请务必遵循以下 SOP 规约：

### 1. 开发流程 (The 12-Step Protocol)

本项目严禁在 `main` 分支直接提交代码。所有优化任务必须遵循：

1. **切换分支**：`git checkout -b task/optimization-name`。
2. **定义任务**：在 `openspec/changes/` 下创建或更新 `tasks.md`。
3. **审计日志**：任何修改必须在 `.gemini/ops_changelog.md` 记录意图。
4. **TDD 驱动**：先编写测试用例（如修改指纹算法需先更新 `fingerprint.test.ts`）。

### 2. 核心架构认知

- **逻辑规约**：`openspec/specs/logic.md` 定义了检索的硬性标准。
- **技术选型**：详见 `openspec/specs/feasibility-and-selection.md`。
- **决策记录**：所有架构变动必须记录在 `openspec/decisions/` (ADR)。

### 3. 深度优化方向 (Next Steps)

- **Prompt 调优**：在 `src/core/searcher.ts` 中优化提取指令，提升字段准确率。
- **指纹算法增强**：引入公司简称归一化，进一步降低重复率。
- **UI 增强**：提升 CLI 终端的交互美感与进度条反馈。

---

## 🚥 开发规约 (Protocol)

1. **Audit First**：无审计记录不修改代码。
2. **Protocol Over Code**：规约（Specs）高于实现。
3. **Validation is Final**：所有变更必须通过 `/opsx:verify` 验证。

---

_Job-Filter-Wizard - 驱动规约，掌握智力。_
