export interface NewsItem {
  author: string
  content: string
  description: string
  publishedAt: Date | string
  source: { id: null | string | number; name: string }
  title: string
  url: string
  urlToImage: string
}

export interface SourceItem {
  id: string
  name: string
  description: string
  url: string
  category: string
  language: string
  country: string
}

export type LayoutGroupType =
  | "single"
  | "grid1"
  | "grid2"
  | "grid3"
  | "grid4"
  | "grid5"

export interface LayoutGroupItem {
  type: LayoutGroupType
  subList: NewsItem[]
}
