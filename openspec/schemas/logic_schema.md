# SOP 2.0 逻辑提纯协议 (logic_schema)

## 1. 资产提取契约 (IPO Contract)
所有收割资产必须遵循：
- **Input (输入)**：使用 TypeScript Interface 显式声明。
- **Process (处理)**：去业务化的纯逻辑。
- **Output (输出)**：明确的返回值或 Mock 后的副作用。

## 2. 暂存与审批机制 (Staging)
- **子库缓冲**：提纯产物必须首先存入子库 `.gemini/distill_stage/`。
- **结构规范**：
    - `distill_stage/patterns/<name>/`: 物理图纸。
    - `distill_stage/skills/common-<name>.md`: 智力资产。

## 3. 联动引用标准 (Linkage)
- **Skill 引导 Pattern**：生成的 `common-` 技能必须包含指向对应 `patterns/` 物理文件的 Markdown 链接。
- **参数化**：所有项目特定词汇必须根据 `env.md` 替换为 `{{VAR}}` 占位符。

## 4. 存储标准与质量门禁 (Standard & Quality Gates)
- **Pattern 三件套**：
    - `index.ts`: 参数化后的去业务化逻辑。
    - `index.test.ts`: 配套的 Vitest 测试规格。
    - `README.md`: 包含输入输出契约及使用示例。
- **强制验证**：资产在并入母库前，必须确保在母库 Node 20 环境下通过 `npm run vitest`。
- **Red Flag**: 严禁直接跨过 Staging 区域写入母库。
