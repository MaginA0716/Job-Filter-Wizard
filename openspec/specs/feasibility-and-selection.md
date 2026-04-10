# 可行性分析与技术选型方案 (TS 版)

## 1. 可行性分析

- **任务目标**: 构建高吞吐、可去重、交互式的岗位搜索系统。
- **技术可行性**:
  - 采用 **Node.js + TypeScript** 栈，利用 `axios`/`fetch` 处理 API，结合 `zod` 实现强类型校验，满足异步处理需求。
  - ADR 0002 定义的 30 天 TTL 机制可通过 Node.js `fs` 与 `json` 模块高效实现。
- **成本与风险**:
  - 依赖 第三方 搜索 API。
  - 风险应对：采用分页确认机制 (ADR 0002) 控制调用量。

## 2. 技术选型

- **开发语言**: TypeScript (Node.js)
- **检索提取层**: **Serper.dev (Google Search API)** + **DeepSeek (LLM)**。
  - **检索 (Serper)**: 获取高真实性、实时的原始网页信息，规避 LLM 幻觉。
  - **提取 (DeepSeek)**: 将检索到的原始上下文进行精准的 JSON 结构化提取。
- **数据规范层**: Zod (保障 JSON 字段完整性与类型安全)。
- **存储方案**:
  - `seen_jobs.json` (指纹库，带 TTL 30 天机制)。
  - `[YYYYMMDD]_[条件].md` (追加写入 Markdown)。

## 3. 架构决策一致性

- 本方案完全遵循 ADR 0002（去重逻辑）、ADR 0003（提取模式）以及 **ADR 0004（Serper.dev 联网搜索集成）**，由 TypeScript 提供健壮的类型保障。
