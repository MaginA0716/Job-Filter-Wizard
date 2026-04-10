import * as fs from 'fs'
import * as path from 'path'
import { JobSearcher, JobPosting, SearchOptions } from './searcher'
import { FingerprintManager } from './fingerprint'

/**
 * JobFilter 核心管理类
 * 负责编排搜索、去重和存储流程。
 * 遵循任务 2.3 规约。
 */
export class JobFilter {
  private searcher: JobSearcher
  private fingerprintManager: FingerprintManager

  constructor() {
    this.searcher = new JobSearcher()
    this.fingerprintManager = new FingerprintManager()
    // 自动从现有文件中同步指纹 (任务 3.1)
    this.fingerprintManager.seedFromExistingFiles()
  }

  /**
   * 执行完整的过滤搜索流程
   * @param options 搜索选项
   */
  public async execute(options: SearchOptions): Promise<JobPosting[]> {
    const jobs = await this.searcher.search(options)
    return jobs
  }

  /**
   * 将岗位信息保存到 Markdown 文件
   * @param query 搜索关键词（用于文件名）
   * @param jobs 岗位列表
   */
  public saveToMarkdown(query: string, jobs: JobPosting[]): string {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const fileName = `${dateStr}_${query.replace(/\s+/g, '_')}.md`
    const filePath = path.join(process.cwd(), fileName)

    const hasFile = fs.existsSync(filePath)
    const header = `| 职位 | 公司 | 地点 | 薪资 | 行业 | 技能要求 | 发布时间 | 来源 |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n`
    const content =
      jobs
        .map(
          (job) =>
            `| ${job.title} | ${job.company} | ${job.location} | ${job.salary} | ${job.industry} | ${job.skills.join(
              ', '
            )} | ${job.posted_time || '未知'} | [链接](${job.source_url}) |`
        )
        .join('\n') + '\n'

    if (!hasFile) {
      fs.writeFileSync(filePath, header + content, 'utf-8')
    } else {
      fs.appendFileSync(filePath, content, 'utf-8')
    }

    return fileName
  }
}
