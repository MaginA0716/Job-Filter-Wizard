import 'dotenv/config';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { JobFilter } from './core/filter';


/**
 * 终端交互管理器 (Terminal Interaction Manager)
 * 负责收集用户偏好并调用 JobFilter 核心逻辑
 */
class JobFilterWizardCLI {
  private rl: readline.Interface
  private filter: JobFilter

  constructor() {
    this.rl = readline.createInterface({ input, output })
    this.filter = new JobFilter()
  }

  /**
   * 启动交互流程
   */
  public async start(): Promise<void> {
    console.log('\n--- 🚀 Job-Filter-Wizard 招聘筛选助手 ---\n')

    try {
      while (true) {
        const query = await this.rl.question('请输入关键词 (如 "前端开发", "Java"): ')
        const location = await this.rl.question('请输入地点 (如 "北京", "上海"): ')
        const salaryRange = (await this.rl.question('请输入期望薪资范围 (如 "20k-30k", 可跳过): ')) || '不限'
        const industryPreference = (await this.rl.question('请输入行业偏好 (如 "互联网", "金融", 可跳过): ')) || '不限'

        let totalFetched = 0
        let continueBatch = true

        while (continueBatch) {
          console.log(
            `\n🔍 正在检索 ${location} 的 ${query} 职位 (薪资: ${salaryRange}, 行业: ${industryPreference})...`
          )

          // 使用 JobFilter 执行流程
          const jobs = await this.filter.execute({
            query,
            location,
            salary: salaryRange,
            industry: industryPreference
          })

          if (jobs.length === 0) {
            console.log('❌ 未找到符合条件的新职位或职位已存在于本地文件中。')
            continueBatch = false
          } else {
            totalFetched += jobs.length
            const fileName = this.filter.saveToMarkdown(query, jobs)
            console.log(`✅ 本批次成功保存 ${jobs.length} 个职位至: ${fileName} (累计: ${totalFetched})`)

            const nextBatch = await this.rl.question('\n是否继续获取下一批 (20个) 职位? (y/n): ')
            if (nextBatch.toLowerCase() !== 'y') {
              continueBatch = false
            }
          }
        }

        const continueSearch = await this.rl.question('\n是否更换关键词进行新一轮搜索? (y/n): ')
        if (continueSearch.toLowerCase() !== 'y') {
          console.log('👋 感谢使用，再见！')
          break
        }
      }
    } catch (error) {
      console.error('⚠️ 运行过程中出现错误:', error)
    } finally {
      this.rl.close()
    }
  }
}

// 启动 CLI
const wizard = new JobFilterWizardCLI()
wizard.start()
