# YOU-DRIVE-SOP：全局行为宪法 (Global Behavioral Constitution)

> **CORE_IDENTITY: FOUNDRY (智力演进实验室 - 母库)**
> **FOUNDRY_ROOT: D:\AI project\YOU-DRIVE-SOP**

## 1. 空间认知 (Spatial Awareness)
- **Foundry (母库)**：技能与模式的中央存储库。根路径通过 `{{FOUNDRY_ROOT}}` 自动感应。
- **Workshop (工作间)**：当前的开发执行环境。
- **目标**：所有经过解耦的逻辑块，最终必须提纯并反哺至母库的 `patterns/` 目录和 `.gemini/skills/` 根级。

## 2. 标准执行流 (SOP Execution Flow)

### A. 对齐与检索 (Baseline)
1. **[对齐 Align]**：启动任何任务前，优先读取 Workshop 的 `openspec/specs/env.md`。若缺失，则依据 Foundry 的 `env_schema.md` 引导生成。
2. **[检索 Search]**：在编写新代码前，必须全局搜索 Foundry 的 `patterns/` 资产库以避免重复造轮子。

### B. 开发与进化 (New Feature Evolution)
1. **[构思 Propose]**：使用 `/opsx:propose` 时，必须调用 `brainstorming` 识别“潜在资产贡献点”。
2. **[实现 Apply]**：强制遵循 TDD 规约与 `logic_schema`，物理上实现业务逻辑与 UI 的分离。
3. **[提纯 Distill]**：归档前置动作。必须调用 `activate_skill meta-distiller` 将通用逻辑提取至 Staging 暂存区 (`.gemini/distill_stage/`)。
4. **[归档 Archive]**：执行 `/opsx:archive` 时，确认 Staging 资产并入母库，并记录架构决策 (ADR)。

## 3. 资产贡献门禁 (Contribution Gate)
任何任务在归档前，AI 必须提交一份《资产反哺报告》：
- **New Pattern**: 本次产出了哪些符合“三件套”标准的去业务化图纸？
- **New Skill**: 是否生成了以 `common-` 为前缀的新技能？
- **Refinement**: 是否对现有资产进行了优化或 Bug 修复？
- **Rationale**: 若本次无资产贡献，必须给出合理的架构解释。

## 4. 安全与质量门禁 (Safety & Quality Gates)
- **安全执行**：所有写操作必须由 `meta-safe-executor` 执行 Git 快照存盘并记录审计日志。
- **破坏性动作**：针对 `DELETE` 或 `MOVE` 等指令，必须获得用户的显式确认。
- **三件套标准**：Pattern 必须包含 `index.ts` (逻辑), `index.test.ts` (测试), `README.md` (契约)。
- **业务解耦**：母库资产中严禁保留硬编码的项目名称或私有路径。

## 5. 环境抽象原则 (Environment Abstraction)
- **禁止硬编码**：严禁在技能（Skill）或图纸（Pattern）中硬编码具体的运行版本（如 Node 20, Python 3.11）。
- **变量驱动**：必须使用 `{{RUNTIME_VERSION}}`, `{{TEST_COMMAND}}` 等由子库 `env.md` 定义的变量。
- **跨栈兼容**：资产提纯流程必须兼容所有主流技术栈（Frontend, Backend, Mobile），验证引擎由子库环境指纹决定。

## 6. AI 执行诚信与流程刚性 (AI Integrity & Process Rigidity)
- **严禁模拟 (No Simulation)**：AI 禁止使用“模拟”、“示意”、“假设已完成”等措辞逃避物理操作。所有 Task 必须产生真实的物理变更。
- **审计先行 (Audit-First)**：严禁在未更新 `.gemini/ops_changelog.md` 的情况下执行任何文件写操作。审计日志必须包含真实的本地系统时间。
- **禁止绕过门禁 (No Merge Shortcuts)**：严禁直接在 `main` 分支执行物理合并（除非是紧急修复审计文件）。所有功能变更必须通过 `issue -> branch -> apply -> archive -> pr` 的完整闭环。
- **任务终点线原则**：在所有 `tasks.md` 标记为 `[x]` 前，AI 严禁宣布任务成功或执行 `archive`。
- **语言一致性**：本项目首选 **中文** 作为沟通与规约语言，确保团队理解无偏差。

## 7. 跨库链路保护 (Cross-Repo Link Protection)
- **穿透风险预警**：子库（Workshop）通过 Junction 挂载母库资产。切换分支或执行 `git clean` 前，必须物理断开（Unlink）链接，防止 Git 的清理动作穿透链路误删母库源码。
- **强制自检**：AI 在子库执行 `git` 相关写操作前，必须首先确认当前 `.gemini/skills` 的属性。若为 `ReparsePoint`（联接点），必须提醒用户潜在的物理删除风险。
- **恢复优先**：若发生误删，立即在母库端执行 `git restore`，严禁在子库端进行尝试性修复。

---
*YOU-DRIVE-SOP - 驱动规约，掌握智力。*
