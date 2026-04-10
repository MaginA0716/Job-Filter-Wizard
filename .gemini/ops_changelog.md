# AI 操作审计日志 (Ops Changelog)

| 意图 (Intent) | 动作 (Action) | Undo_CMD | 物理结果 (Result) |
| :-- | :-- | :-- | :-- |
| 初始化审计日志 | Create ops_changelog.md | rm .gemini/ops_changelog.md | 文件已创建 |
| 创建开发分支 | git checkout -b task/build-intelligent-job-filter-core | git checkout main && git branch -D task/build-intelligent-job-filter-core | 分支已创建并切换 |
| 更新任务清单 (1.1, 1.2) | Update tasks.md | Revert tasks.md | 任务状态已更新 |
| 初始化环境与 API Key | Create .env and install dependencies (axios, fs-extra) | rm .env && npm uninstall fs-extra | .env 创建成功，依赖安装完成 |
| 配置 Jest 测试框架 | Configure jest.config.cjs and tsconfig.json | rm jest.config.cjs | 测试环境配置完成 |
| 指纹管理逻辑验证 | Create and run fingerprint.test.ts | rm src/core/**tests**/fingerprint.test.ts | 3 个单元测试全部通过 |
| 更新任务清单 (1.3, 2.1, 2.2, 3.2) | Update tasks.md | Revert tasks.md | 进度已同步到任务清单 |
| 实现终端交互界面 | Refactor src/main.ts using readline/promises | Revert src/main.ts | 交互式命令行工具已就绪，支持关键词、地点、薪资和行业输入 |
| 更新任务清单 (5.2) | Update tasks.md | Revert tasks.md | 进度已同步到任务清单 |
| 优化 API 与 Prompt 工程 | Refactor JobSearcher to support SearchOptions and rich JSON output | Revert src/core/searcher.ts | 支持薪资、行业过滤，支持多字段提取 |
| 集成交互流与存储逻辑 | Update src/main.ts to pass all parameters and generate Markdown | Revert src/main.ts | 闭环交互式搜索、去重、持久化存储流程 |
| 更新任务清单 (4.1, 4.2, 5.1) | Update tasks.md | Revert tasks.md | 进度已同步到任务清单 |
| 实现历史数据自动同步 | Add seedFromExistingFiles to FingerprintManager | Revert src/core/fingerprint.ts | 可自动从现有 MD 文件提取指纹实现去重 |
| 重构核心类架构 (JobFilter) | Create JobFilter class and update main.ts | Revert src/core/filter.ts | 完成功能编排，代码符合 2.3 骨架要求 |
| 更新任务清单 (2.3, 3.1) | Update tasks.md | Revert tasks.md | 基础架构与历史索引功能已标记完成 |
| 实现发布时间动态过滤 | Inject current date into JobSearcher prompt | Revert src/core/searcher.ts | AI 现在可感知今日日期并过滤 7 天内的职位 |
| 更新任务清单 (4.3) | Update tasks.md | Revert tasks.md | 进度已同步到任务清单 |
| 实现批次检索与暂停逻辑 | Refactor main.ts with while loop and user confirmation | Revert src/main.ts | 支持 20 个职位的批次获取，并支持累计统计 |
| 更新任务清单 (5.3) | Update tasks.md | Revert tasks.md | 进度已同步到任务清单 |
| 完成核心功能验证 | Mark Task 6 as completed | Revert tasks.md | 40 个岗位检索测试通过，格式符合规范 |
| 更新项目全局文档 | Update README.md and tasks.md | Revert README.md | 项目状态更新为“深度优化阶段” |
| 记录技术决策 ADR 0004 | Create ADR 0004 | rm openspec/decisions/0004-... | 记录引入 Serper.dev 联网搜索的决策 |
| 更新可行性分析文档 | Update feasibility-and-selection.md | Revert feasibility-... | 同步 Serper.dev + DeepSeek 双层架构选型 |
| 重构 README 操作手册 | Update README.md | Revert README.md | 为开发者和使用者提供分层操作指南 |
