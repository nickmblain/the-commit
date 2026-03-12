export type BlockType = 'paragraph' | 'heading' | 'code' | 'quote' | 'list' | 'divider' | 'details'

export interface ArticleBlock {
  type: BlockType
  content?: string
  level?: 2 | 3 | 4
  language?: string
  items?: string[]
  summary?: string
}

export interface Article {
  slug: string
  title: string
  date: string // ISO 8601
  author: string
  excerpt: string
  tags: string[]
  readingTimeMinutes: number
  body: ArticleBlock[]
}
