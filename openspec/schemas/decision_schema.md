# SOP 2.0 架构决策记录协议 (decision_schema)

## 1. 标题规范 (Header Format)
- **ID**: `00X`。
- **Title**: 原子化描述（kebab-case）。
- **Example**: `001-sop-2.0-initialization.md`。

## 2. 状态枚举 (Status Enum)
- **Proposed**: 已提议，尚未达成共识。
- **Accepted**: 已接受，母库当前正在遵循的规约。
- **Superseded**: 已被后续决策覆盖。
- **Deprecated**: 已废弃。

## 3. 标准内容分段 (Standard Sections)
- **Status (状态)**：当前决策状态。
- **Context (背景)**：遇到了什么环境限制或业务需求。
- **Decision (决策内容)**：选择 A 而非 B 的核心理由。
- **Consequences (后果评估)**：引入了什么新的约束，带来了什么长远收益。
- **Related Project (关联项目)**：若该决策源于特定子库的冲突，必须标注其路径。

## 4. 自演进同步 (Evolution Sync Requirement)
- **反思节点**：每次创建 ADR 后，AI 必须检查对应的 `.gemini/skills/` 文档是否需要增量微调。
- **同步记录**：ADR 底部需记录是否已触发 Skill Patch 操作。
