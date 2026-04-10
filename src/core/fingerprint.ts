import fs from 'fs'
import path from 'path'

/**
 * 指纹管理类
 * 负责维护已检索岗位的唯一标识（指纹），并根据 TTL (存活时间) 机制自动清理过期记录。
 * 遵循 ADR 0002 规范。
 */
export class FingerprintManager {
  private storagePath: string
  private ttlSeconds: number // 存活时间，单位：秒
  private data: Record<string, number> // 存储格式: { "fingerprint": timestamp }

  constructor(storagePath: string = 'seen_jobs.json') {
    this.storagePath = path.resolve(storagePath)
    this.ttlSeconds = 30 * 24 * 60 * 60 // 默认 30 天
    this.data = this.loadData()
  }

  /**
   * 加载指纹存储文件
   * 若文件不存在或损坏，返回空记录
   */
  private loadData(): Record<string, number> {
    if (!fs.existsSync(this.storagePath)) {
      return {}
    }
    try {
      const raw = fs.readFileSync(this.storagePath, 'utf-8')
      return JSON.parse(raw)
    } catch {
      return {}
    }
  }

  /**
   * 将当前指纹数据持久化到文件
   */
  private saveData(): void {
    fs.writeFileSync(this.storagePath, JSON.stringify(this.data, null, 2), 'utf-8')
  }

  /**
   * 检查指纹是否已存在且在有效期内
   * @param fingerprint 岗位唯一指纹 (公司+职位+地点)
   * @returns 若指纹存在且未过期返回 true，否则返回 false
   */
  public isSeen(fingerprint: string): boolean {
    if (!(fingerprint in this.data)) {
      return false
    }

    const timestamp = this.data[fingerprint]
    const isExpired = Date.now() / 1000 - timestamp > this.ttlSeconds

    // 自动清理过期指纹
    if (isExpired) {
      delete this.data[fingerprint]
      this.saveData()
      return false
    }

    return true
  }

  /**
   * 从现有 Markdown 文件中扫描并提取指纹
   * 用于初始化指纹库，避免检索已经存在于本地文件中的岗位
   * @param dirPath 扫描目录
   */
  public seedFromExistingFiles(dirPath: string = '.'): void {
    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md') && /^\d{8}_/.test(f))

    console.log(`正在从 ${files.length} 个现有文件中同步指纹...`)

    files.forEach((file) => {
      const content = fs.readFileSync(path.join(dirPath, file), 'utf-8')
      // 匹配 Markdown 表格行: | 职位 | 公司 | 地点 | ... |
      // 预期的格式是: | Title | Company | Location | ... |
      const rows = content
        .split('\n')
        .filter((line) => line.startsWith('|') && !line.includes('---') && !line.includes('职位'))

      rows.forEach((row) => {
        const columns = row
          .split('|')
          .map((col) => col.trim())
          .filter(Boolean)
        if (columns.length >= 3) {
          const [title, company, location] = columns
          const fingerprint = `${company}-${title}-${location}`
          if (!(fingerprint in this.data)) {
            this.data[fingerprint] = Date.now() / 1000
          }
        }
      })
    })

    this.saveData()
  }

  /**
   * 添加或更新指纹记录
   * @param fingerprint 岗位唯一指纹
   */
  public addFingerprint(fingerprint: string): void {
    this.data[fingerprint] = Date.now() / 1000
    this.saveData()
  }
}
