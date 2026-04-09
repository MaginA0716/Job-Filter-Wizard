# 🎯 Job-Filter-Wizard (招聘筛选器 2.0)

> **基于 DeepSeek API 的智能化招聘信息筛选与去重工具**

本项目采用 **YOU-DRIVE-SOP 2.0** 工业级开发框架，通过物理规约（Specs）严格控制筛选逻辑，确保求职者获取高匹配度、去重后的职位列表。

---

## 🌟 核心业务特性

- **智能化筛选**：基于 DeepSeek API 进行多维度语义理解与过滤。
- **刚性输入约束**：
    - **求职城市 (Required)**：精确到地级市。
    - **岗位/技能 (Required)**：支持岗位类型或核心技能组合。
    - **薪资/行业 (Optional)**：支持包含心仪行业与排除负面行业。
- **时间窗口控制**：自动剔除发布时间超过 **3 个月** 的过时岗位。
- **历史指纹去重**：采用 `[公司名]_[职位名]` 归一化指纹算法，确保增量抓取，不显示重复信息。
- **结构化输出**：自动生成符合 GFM 规范的 Markdown 表格。

---

## 🚀 初步操作指引 (Getting Started)

### 1. 环境准备
确保您的开发环境已安装 **Node.js (v24.7.0+)**、**Gemini CLI** 与 **OpenSpec CLI**：
```bash
# 安装 Gemini CLI (核心驱动引擎)
npm install -g @google/gemini-cli

# 安装 OpenSpec CLI (变更管理底座)
npm install -g @fission-ai/openspec@latest
```

### 2. 配置 API Key
在项目根目录创建 `.env` 文件：
```env
DEEPSEEK_API_KEY=您的_DEEPSEEK_API_密钥
```

### 3. 启动抓取流程
目前项目处于 **Scaffolding (基础架构搭建)** 阶段。
根据 **[SOP 12步协议](./GETTING_STARTED.md)**，您可以通过以下指令查看当前开发进度：
- 查看实时看板：`cat GEMINI.md`
- 查看任务清单：`cat openspec/changes/build-intelligent-job-filter-core/tasks.md`

---

## 🚥 开发规约 (Development Protocol)

本项目所有开发任务必须遵循：
1. **Branching**: 在 `task/N` 或 `issue-N` 分支操作。
2. **Audit**: 所有文件修改必须在 `.gemini/ops_changelog.md` 记录。
3. **TDD**: 先写测试，见证失败后再编写业务逻辑。

---
*Job-Filter-Wizard - 驱动规约，掌握智力。*
