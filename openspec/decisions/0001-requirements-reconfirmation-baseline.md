# ADR-001: 智能化招聘筛选核心需求基准确认 (Requirements Baseline)

## Status (状态)
**Accepted**

## Context (背景)
Job-Filter-Wizard 作为一个基于 DeepSeek API 的智能化招聘筛选工具，其核心价值在于「高匹配度、去重后且即时」的职位列表。为了防止开发过程中的需求漂移，并确保子库治理资产的物理同构，需要确立明确的业务逻辑基准。

## Decision (决策内容)
确立以下 4 个维度的核心需求作为项目逻辑的基准点：

1. **输入参数约束 (Input Constraints)**
   - **求职城市 (Required)**: 严格地理位置过滤。
   - **岗位/技能 (Required)**: 岗位类型或核心技能，必选其一。
   - **薪资要求 (Optional)**: 最低薪资门槛。
   - **行业偏好 (Optional)**: 包含心仪行业与排除负面行业的双向过滤。
   - **时间窗口 (System Enforced)**: 自动计算当前日期，严格排除发布时间 > 3 个月 的岗位。

2. **指纹去重逻辑 (Deduplication)**
   - **算法**: `Normalize(公司名) + "_" + Normalize(职位名)`。
   - **索引**: 启动时扫描 `storage/jobs/` 下所有 Markdown 表格，预载指纹库，执行增量抓取。

3. **抓取与交互流 (Workflow)**
   - **批处理模式**: 每次 API 调用限制返回 20 个岗位。
   - **交互式暂停**: 每完成一批（20个）后，系统必须暂停并询问驾驶员是否继续。
   - **结构化输出**: 保存为 `[YYYYMMDD]_[搜索条件].md` 的 GFM Markdown 表格。

4. **治理一致性 (Governance)**
   - **讨论留痕**: 所有的架构、逻辑、业务规则讨论结论必须记录在 `openspec/decisions/` 中。

## Consequences (后果评估)
- **好处**: 锁死了 AI 在筛选时的“幻觉”边界，确保数据质量。
- **约束**: 增加了 AI 在启动时的加载负担（需预载指纹），并在交互过程中引入了强制暂停节点。

## Related Project (关联项目)
D:/AI project/Job-Filter-Wizard

## Evolution Sync (自演进同步)
- [x] 已同步更新至 `proposal.md` 和 `design.md`。
- [x] 已同步更新至 `GEMINI.md` 看板业务约束区。
