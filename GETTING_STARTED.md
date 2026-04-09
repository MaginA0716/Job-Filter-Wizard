# YOU-DRIVE-SOP 2.0 工业级操作手册

> **"Standardization, Specification, Process, Automation, Sharing."**

本手册定义了 YOU-DRIVE-SOP 2.0 体系下的标准基础设施搭建与 12 步生产生命周期。

---

## 🏗️ 基础设施搭建 (Foundry & Workshop Setup)

1.  **Clone 本库 (母库)**：
    ```bash
    git clone git@github.com:catx1726/YOU-DRIVE-SOP.git foundry
    ```
2.  **全局安装 OpenSpec**：
    ```bash
    npm install -g @fission-ai/openspec@latest
    ```
3.  **子库初始化引擎**：进入业务项目，执行：
    ```bash
    openspec init
    ```
    *✓ 物理产出：生成 `openspec/config.yaml`（初始为空白文件）。*
3.5 **物理自举链接**：由于子库尚未链接母库，AI 此时无法感知技能。您**必须**手动执行以下指令来建立初步联系：
    ```bash
    gemini skills link <FOUNDRY_PATH>/.gemini/skills --scope workspace --consent
    ```
    *注：`<FOUNDRY_PATH>` 是您在第 1 步中 Clone 的母库绝对路径。*

### 🧱 物理安全红线 (Safety Gate)
**在执行下一步前，请确保子库已配置 `.gitignore`。**
若子库使用 Git 管理，**必须**忽略以下路径：
- `.gemini/skills/`
- `patterns/`
- `.gemini/link.json`
*⚠️ 警告：如果不配置忽略规则，Git 在切换分支时可能会尝试删除这些物理链路，并极易穿透链路导致母库源文件被物理销毁。*

4.  **子库物理对齐 (Handshake)**：
在子库执行：
    ```bash
    activate_skill workshop-initializing
    ```

    _✓ 逻辑：建立物理链路 (Junction)，将母库的以下资产挂载至子库：_
    - `openspec\config.yaml`：读取母库 `config_foundry.yaml` 并 Deep Merge。
    - `openspec\schemas\`：同步全量协议模板。
    - `openspec\specs\`：递归同步全量治理规约。
    - `GEMINI.md`：注入「🚀 快速操作看板」。
    - `AGENTS.md` & `global_standard.md`：同步代理定义与物理宪法。
    - `.gemini\skills` & `patterns/`：挂载全量技能与图纸库。
    - _链路存根：生成 `.gemini/link.json` 记录母库物理绝对路径。_

---

## 🚦 生产生命周期 (The 12-Step Protocol)

**标准流：`Issue -> Branch -> Propose -> Apply -> Distill -> Archive -> Merge -> Close`**

1.  **讨论需求**：执行 `activate_skill brainstorming`。识别业务逻辑中的“资产贡献点”。
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
9.  **资产提纯 (Distill)**：**[归档前置]** 激活 `activate_skill meta-distiller`。 _✓ 物理产出：将通用逻辑提取至 `.gemini/distill_stage/`，确保“三件套”齐备。_
10. **归档任务**：使用 `/opsx:archive`。
    - **治理分流**：涉及规约/技能的变更移入 `openspec/changes/archive/governance/`。
    - **日志入库**：将操作日志移至 `openspec/operations/archive/<YYYY-MM-DD-name>/`。
11. **元技能编写**：激活 `activate_skill writing-skills`。 _根据提炼的内容在母库 `.gemini/skills/` 下编写对应的 Skill 手册。_
12. **合并与闭环**：使用 GitHub CLI 处理：
    ```bash
    gh pr create --body "..."
    git checkout main; git merge issue-27; git branch -d issue-27; gh issue close 27
    ```

---

## 🔧 日常维护 (Daily Maintenance)

### 同步母库最新智力 (Foundry Sync)
如果您处于 **Copied (静态副本)** 模式，或者母库发布了新的元规约，请执行以下指令进行增量对齐：
```bash
activate_skill workshop-sync
```
*✓ 物理逻辑：系统将从 `link.json` 定义的路径执行增量拉取（`xcopy /D`），仅更新较新或缺失的 Skills 和 Patterns，不会破坏您的本地业务代码。*

---
## 🛠️ 故障排除 (Troubleshooting)

### 1. Windows 权限错误 (Access Denied / Error 5)

在执行 `workshop-initializing` 建立物理链路时，若遇到权限报错：

- **原因**：Windows 限制非管理员创建符号链接。
- **方案**：进入 Windows **设置 > 隐私和安全性 > 面向开发人员**，开启 **“开发人员模式”**。

### 2. 路径感应失败 (Path Discovery)

若 AI 无法自动定位母库：

- **方案**：手动在子库根目录创建 `.gemini/link.json`，内容为：`{"foundry_root": "C:\\绝对路径\\TO\\FOUNDRY"}`。

---

_YOU-DRIVE-SOP - 驱动规约，掌握智力。_
