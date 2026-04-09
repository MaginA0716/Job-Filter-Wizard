# 设计 (Design): 智能化招聘信息抓取与筛选工具

## 1. 架构组件 (Components)
- **Pre-Search Sentinel (历史索引器)**: 扫描本地存储文件夹，通过 `[公司名]_[职位名]` 生成 MD5 指纹存入内存集合。
- **Search Logic Engine (搜索引擎)**:
  - 构造包含地理位置、技能、时间、薪资、行业条件的 Prompts。
  - 调用 DeepSeek API 获取结构化 JSON 数据。
- **Deduplicator (去重器)**: 比对新采集数据与内存指纹库，执行增量筛选。
- **Markdown Writer (文件处理器)**: 处理文件命名逻辑及表格追加写入。
- **Session Manager (交互控制器)**: 维护“单次任务上限 20”的批处理循环。

## 2. 核心技术选型 (Technical Stack)
- **Runtime**: Node.js (TypeScript 为佳)。
- **API**: DeepSeek Chat API / Search API。
- **Storage**: 本地 Markdown 文件 (CSV 格式可选但优选 MD Table)。
- **Lib**: `fs-extra` (本地文件操作), `axios` (API 请求)。

## 3. 指纹算法定义
指纹：`Normalize(公司名) + "_" + Normalize(职位名)`
归一化（Normalize）规则：移除空格、特殊字符、转小写。

## 4. Prompts 设计策略
- **Input Parameters**:
    - **求职城市 (Required)**: 严格执行地理位置过滤。
    - **岗位/技能 (Required)**: 岗位类型或核心技能，二选一或两者皆备。
    - **薪资要求 (Optional)**: 设定最低薪资门槛。
    - **行业偏好 (Optional)**: 包含（心仪行业）与 排除（负面行业）的双向过滤。
    - **时间窗口 (System Enforced)**: 自动计算当前日期，排除发布时间 > 3 个月的岗位。
- **Input Object**: `{ 城市, 岗位, 薪资, 行业包含, 行业排除, 当前日期 }`
- **Output Constraint**: 强制返回 20 个岗位的 JSON 数组，包含：岗位名称、公司名称、薪资范围、所在城市、行业、发布日期、所需技能、来源链接（如有）。
