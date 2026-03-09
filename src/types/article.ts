// PortableTextBlock is Sanity's rich text block type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityBlock = Record<string, any>

export interface Article {
  _id: string
  slug: string
  title: string
  date: string // ISO 8601
  excerpt: string
  tags: string[]
  readingTimeMinutes: number
  body: SanityBlock[]
}
