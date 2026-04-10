# 编码规约 (Coding Standards)

## 语言规范
- **语言**: TypeScript
- **注释要求**: 所有 TypeScript 代码必须包含详尽的**中文注释**，详细解释核心业务逻辑、边界条件处理与设计意图，确保代码的自解释性与易维护性。

## 设计原则
- **ADR 驱动**: 任何非平庸的架构决策与流程调整，必须先记录在 `openspec/decisions/` 下的 ADR 文件中。
- **模块化**: 保持模块高内聚低耦合，每个核心类（如 `FingerprintManager`）需有明确职责边界。
- **类型安全**: 使用 Zod 或 TypeScript 类型系统强制保障数据完整性。
