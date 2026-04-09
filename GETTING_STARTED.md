# Job-Filter-Wizard 2.0 工业级操作手册

> **"Standardization, Specification, Process, Automation, Sharing."**

本手册定义了 Job-Filter-Wizard 2.0 体系下的标准开发环境搭建与 12 步生产生命周期。

---

## 🏗️ 基础设施搭建 (Environment & Workshop Setup)

1.  **环境依赖确认 (Dependency Check)**：确认本地已安装 Node.js (推荐 v24.7.0+) 和 git。
2.  **全局安装 OpenSpec**：
    ```bash
    npm install -g @fission-ai/openspec@latest
    ```
3.  **业务环境配置 (.env)**：在项目根目录创建 `.env` 文件，并填入您的 DeepSeek API Key： `env DEEPSEEK_API_KEY=sk-xxxxxx ` 3.5 **物理自举链接 (Sync with Foundry)**：确保子库已链接至母库 `YOU-DRIVE-SOP` 以感知技能。手动执行： `bash gemini skills link <FOUNDRY_PATH>/.gemini/skills --scope workspace --consent ` _注：`<FOUNDRY_PATH>` 是您母库的绝对路径。_

### 🧱 物理安全红线 (Safety Gate)

**在执行下一步前，请确保子库已配置 `.gitignore`。** 若子库使用 Git 管理，**必须**忽略以下路径：

- `.gemini/skills/`
- `patterns/`
- `.gemini/link.json` _⚠️ 警告：如果不配置忽略规则，Git 在切换分支时可能会尝试删除这些物理链路，导致母库源文件被物理销毁。_

4.  **子库物理对齐 (Handshake)**：在子库执行： `bash activate_skill workshop-initializing `

        _✓ 逻辑：建立物理链路 (Junction)，将母库的治理资产挂载至子库：_
        - `openspec\config.yaml`：融合母库配置。
        - `openspec\schemas\`：同步全量协议模板。
        - `openspec\specs\`：同步全量治理规约。
        - `GEMINI.md`：注入「🎯 招聘筛选器指挥台」。
        - `AGENTS.md` & `global_standard.md`：同步本地代理宪法。
        - `.gemini\skills` & `patterns/`：挂载全量工具技能。

---

## 🚦 生产生命周期 (The 12-Step Protocol)

**标准流：`Issue -> Branch -> Propose -> Apply -> Distill -> Archive -> Merge -> Close`**

1.  **讨论需求**：执行 `activate_skill brainstorming`。识别招聘过滤逻辑中的“资产贡献点”。
2.  **确认需求**：使用 GitHub CLI 基于 `.github\ISSUE_TEMPLATE` 创建：
    ```bash
    gh issue create --template feature_template.md
    ```
    _获得 Issue ID（如 #27）。_
3.  **创建分支**：基于 `main` 切出：
    ```bash
    git checkout main; git pull; git checkout -b issue-27
    ```
    _⚠️ 严禁在 main 直接操作。_
4.  **细化任务**：使用 `/opsx:propose` 将需求拆分为 `proposal -> design -> tasks`。 _⚠️ 强制项：`tasks.md` 必须自动包含 `## 1. 规约与环境自检 (Mandatory Setup)`。_
5.  **执行任务**：使用 `/opsx:apply` 根据任务清单按部就班地编写代码。
6.  **快照审计 (Safe Lock)**：任何涉及文件修改的指令，操作前激活：
    ```bash
    activate_skill meta-safe-executor
    ```
    _✓ 物理记录：在 `.gemini/ops_changelog.md` 中以 Markdown 表格记录意图与 Undo_CMD。_
7.  **质量检查 (Verify)**：执行：
    ```bash
    /opsx:verify
    ```
    _根据 specs/_.md 中定义的 Scenario (####) 逐项核对物理产出。\*
8.  **任务测试 (TDD)**：执行 `activate_skill test-driven-development`。 _铁律：先写失败测试，见证失败后再编写生产逻辑。_
9.  **资产提纯 (Distill)**：**[归档联动]** 在执行归档指令并经用户确认后触发。激活 `activate_skill meta-distiller`，将通用逻辑提取并反哺至母库。
10. **归档任务**：使用 `/opsx:archive`。系统将引导您完成最后的变更记录与资产归档确认。
    - **治理分流**：涉及规约/技能的变更移入 `openspec/changes/archive/governance/`
    - **日志入库**：将操作日志移至 `openspec/operations/archive/<YYYY-MM-DD-name>/`。
11. **元技能编写**：激活 `activate_skill writing-skills`。 _根据提炼的内容编写对应的 Skill 手册。_
12. **合并与闭环**：
    ```bash
    gh pr create --body "..."
    git checkout main; git merge issue-1; git branch -d issue-1; gh issue close 1
    ```

---

## 🛠️ 故障排除 (Troubleshooting)

### 1. Windows 权限错误 (Access Denied / Error 5)

- **方案**：开启 **“开发人员模式”**。

### 2. DeepSeek API 连接失败

- **方案**：检查 `.env` 中的 `DEEPSEEK_API_KEY` 是否正确，确认网络是否可访问 API 终结点。

---

_Job-Filter-Wizard - 驱动规约，掌握智力。_
