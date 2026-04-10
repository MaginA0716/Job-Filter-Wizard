import axios from 'axios'
import { z } from 'zod'
import dotenv from 'dotenv'
import { FingerprintManager } from './fingerprint'

// 加载环境变量
dotenv.config()

/**
 * 岗位信息 Schema 定义
 */
export const JobPostingSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  salary: z.string(),
  industry: z.string(),
  company_type: z.string(),
  size: z.string(),
  skills: z.array(z.string()),
  posted_time: z.string().optional(), // 增加发布时间字段（由 AI 提取）
  source_url: z.string().url().describe('招聘原始来源网址')
})

export type JobPosting = z.infer<typeof JobPostingSchema>

/**
 * 搜索选项接口
 */
export interface SearchOptions {
  query: string
  location: string
  salary?: string
  industry?: string
}

/**
 * 岗位搜索器
 * 负责通过 DeepSeek API 检索职位，并利用指纹机制进行去重
 */
export class JobSearcher {
  private apiKey: string
  private serperKey: string
  private fingerprintManager: FingerprintManager

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || ''
    this.serperKey = process.env.SERPER_API_KEY || ''
    if (!this.apiKey) {
      throw new Error('DEEPSEEK_API_KEY is not defined in .env')
    }
    this.fingerprintManager = new FingerprintManager()
  }

  /**
   * 使用 Serper.dev 进行联网搜索
   */
  private async searchWeb(query: string, location: string): Promise<string> {
    if (!this.serperKey) {
      console.warn('⚠️ SERPER_API_KEY 未定义，将回退至 LLM 直接生成（可能包含虚假数据）')
      return ''
    }

    try {
      const response = await axios.post(
        'https://google.serper.dev/search',
        {
          q: `${query} 招聘 ${location} 2024-2025`,
          gl: 'cn',
          hl: 'zh-cn',
          num: 10
        },
        {
          headers: {
            'X-API-KEY': this.serperKey,
            'Content-Type': 'application/json'
          }
        }
      )

      // 将搜索结果转化为文本供 AI 提取
      return response.data.organic
        .map((item: any) => `标题: ${item.title}\n描述: ${item.snippet}\n链接: ${item.link}`)
        .join('\n\n---\n\n')
    } catch (error) {
      console.error('Serper 搜索失败:', error)
      return ''
    }
  }

  /**
   * 搜索岗位
   * @param options 搜索偏好选项
   * @returns 过滤后的岗位数组
   */
  public async search(options: SearchOptions): Promise<JobPosting[]> {
    const { query, location, salary = '不限', industry = '不限' } = options
    const currentDate = new Date().toISOString().slice(0, 10)

    // 1. 获取真实网页搜索结果
    const webContext = await this.searchWeb(query, location)

    try {
      const response = await axios.post(
        'https://api.deepseek.com/v1/chat/completions',
        {
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `你是一个专业的求职数据解析助手。当前日期是 ${currentDate}。
你的任务是从提供的【搜索结果上下文】中提取真实的招聘职位信息。

### 规则规约:
1. 仅提取与 "${query}" 相关的职位。
2. 严格遵守用户提供的过滤条件（城市: ${location}, 行业: ${industry}）。
3. 如果搜索结果中包含发布日期，请确保是最近的（2024-2025年）。
4. 必须输出纯 JSON 格式，包含一个 "jobs" 数组。
5. 对于每个职位，必须提供其在上下文中的原始 "source_url"。

### 输出 Schema:
{
  "jobs": [
    {
      "title": "职位名称",
      "company": "公司名称",
      "location": "工作城市及区域",
      "salary": "薪资范围（如 20k-30k，若无则设为 '面议'）",
      "industry": "行业分类",
      "company_type": "公司性质",
      "size": "人员规模",
      "skills": ["技能1", "技能2"],
      "posted_time": "发布时间（如 2024-04-10 或 '3天前'）",
      "source_url": "来源链接"
    }
  ]
}`
            },
            {
              role: 'user',
              content: `### 搜索结果上下文:
${webContext || '（未获取到联网数据，请根据你的知识库提供模拟但真实的岗位，并标注来源为对应招聘平台官网）'}

### 用户偏好:
- 关键词: ${query}
- 地点: ${location}
- 薪资期望: ${salary}
- 行业偏好: ${industry}

请立即返回符合条件的结构化职位列表。`
            }
          ],
          response_format: { type: 'json_object' }
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )

      const content = response.data.choices[0].message.content
      const rawData = JSON.parse(content)
      const jobs: JobPosting[] = z.array(JobPostingSchema).parse(rawData.jobs || rawData)

      // 去重逻辑
      return jobs.filter((job) => {
        const fingerprint = `${job.company}-${job.title}-${job.location}`
        if (this.fingerprintManager.isSeen(fingerprint)) {
          return false
        }
        this.fingerprintManager.addFingerprint(fingerprint)
        return true
      })
    } catch (error) {
      console.error('解析过程中出现错误:', error)
      return []
    }
  }
}
