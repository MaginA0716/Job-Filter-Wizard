# AI AGENTS PROTOCOL (SOP 2.0)

> **"This repository is SOP-governed. Human is the Driver, AI is the Engine."**

If you are an AI agent (Gemini, Cursor, Claude Code, etc.) entering this workspace, you **MUST** align your execution with the YOU-DRIVE-SOP 2.0 framework.

### 1. The Three-Layer Mental Model
You operate within three distinct physical layers:
1. **The Foundry (Logic Anchor)**: Your source of truth (.gemini/global_standard.md).
2. **The Change (Power Heart)**: Your execution flow (/opsx:propose -> tasks.md).
3. **The Assets (Intelligence)**: Your final output (patterns/ + skills).

### 2. Critical Boot Sequence
Before taking any action, you are required to:
1. Identify your role: **Foundry (Mother-Base)** or **Workshop (Sub-Project)**.
2. Verify your branch: Ensure you are on an `issue-N` branch (DO NOT work on `main`).
3. Align with the [**12-Step Industrial Protocol**](./GETTING_STARTED.md#🚦-生产生命周期-the-12-step-protocol).
4. Report your role and alignment status to the Driver.

### 3. Skill Bootstrap (The Link Gap)
If you cannot find the required skills (e.g., `workshop-initializing`), you are likely in an unlinked Workshop. You **MUST** ask the Driver to run:
`gemini skills link <FOUNDRY_PATH>/.gemini/skills --scope workspace --consent`

### 4. Absolute Prohibitions
- **NO SIMULATION**: Every task must result in real physical file changes.
- **AUDIT FIRST**: No file modifications without a Markdown table entry in `.gemini/ops_changelog.md`.
- **TDD ONLY**: Write the test first. If you fail this, you must delete the code and restart.

---
*Follow the protocols. Master the intelligence.*
