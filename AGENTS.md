# Job-Filter-Wizard AGENTS PROTOCOL (SOP 2.0)

> **"This repository is SOP-governed. Human is the Driver, AI is the Engine."**

If you are an AI agent (Gemini, Cursor, Claude Code, etc.) entering this workspace, you **MUST** align your execution with the Job-Filter-Wizard 2.0 framework.

### 1. The Three-Layer Mental Model
You operate within three distinct physical layers for recruitment filtering:
1. **The Specs (Logic Anchor)**: Your search & filter standards (`openspec/specs/`).
2. **The Change (Power Heart)**: Your execution flow (`/opsx:propose -> tasks.md`).
3. **The Data (Intelligence)**: Your final output (`storage/jobs/` Markdown tables).

### 2. Critical Boot Sequence
Before taking any filtering or coding action, you are required to:
1. **API Check**: Verify `DEEPSEEK_API_KEY` is available in `.env`.
2. **Sentinel Check**: Load existing job fingerprints from `storage/jobs/` to avoid duplicates.
3. **Branch Check**: Ensure you are on a `task/N` or `issue-N` branch.
4. **Align**: Follow the [**12-Step Industrial Protocol**](./GETTING_STARTED.md#🚦-生产生命周期-the-12-step-protocol).

### 3. Domain Knowledge Bootstrap
You must be aware of the following recruitment-specific constraints:
- **Location Strictness**: Enforce exact city filtering (e.g., "成都").
- **Time Window**: Automatically exclude jobs posted > 3 months ago.
- **Deduplication**: Use `Normalize(Company) + "_" + Normalize(Job)` as the unique fingerprint.

### 4. Absolute Prohibitions
- **NO CREDENTIAL LEAK**: Never log or commit the DeepSeek API Key.
- **FORMAT INTEGRITY**: Do not break the GFM (GitHub Flavored Markdown) table structure in output files.
- **AUDIT FIRST**: No file modifications without an entry in `.gemini/ops_changelog.md`.
- **TDD ONLY**: Implement logic only after a failing test case exists.

---
*Follow the protocols. Master the intelligence.*
