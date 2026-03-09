export type BlockType = 'paragraph' | 'heading' | 'code' | 'quote' | 'list' | 'divider'

export interface ArticleBlock {
  type: BlockType
  content?: string
  level?: 2 | 3 | 4
  language?: string
  items?: string[]
}

export interface Article {
  slug: string
  title: string
  date: string // ISO 8601
  excerpt: string
  tags: string[]
  readingTimeMinutes: number
  body: ArticleBlock[]
}
