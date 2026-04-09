# SOP 2.0 环境指纹协议 (env_schema)

## 1. 运行环境指纹 (Runtime Fingerprints)
所有子库生成的 `env.md` 必须定义以下变量：
- **`RUNTIME_TYPE`**: (e.g., Node.js, Python, Go, Java)。
- **`RUNTIME_VERSION`**: (e.g., >=20.10.0, ^3.11, 1.22)。
- **`OS_REQUIREMENT`**: (e.g., Cross-platform, Linux only)。

## 2. 关键工具链变量 (Toolchain Variables)
为了保持技能通用性，必须定义：
- **`TEST_COMMAND`**: (e.g., `npm run vitest`, `pytest`, `go test ./...`)。
- **`BUILD_COMMAND`**: (e.g., `npm run build`, `make`, `cargo build`)。
- **`PACKAGE_MANAGER`**: (e.g., npm, pnpm, pip, go mod)。

## 3. 环境偏差评估 (Gap Analysis)
所有子库生成的 `env.md` 必须包含以下评估项：
- **版本偏差**：若当前版本低于母库基准（Foundry Baseline），必须标注 Polyfill 需求。
- **构建/运行差异**：记录编译器或解释器的特殊配置（如 TS 装饰器支持、Python 虚拟环境路径等）。

## 4. 安全隔离清单 (Sanitization List)
- 严禁收割任何包含密钥的文件（`.env`, `*.pem`, `*.key`）。
- 严禁收割构建产物或二进制依赖（`dist/`, `node_modules/`, `__pycache__/`, `target/`）。
