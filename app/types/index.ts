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

interface ErrorResponse {
  message?: string
}
export interface FetcherResponse<T, E = ErrorResponse> {
  data: Ref<T | null>
  status: Ref<"idle" | "pending" | "success" | "error">
  error: Ref<Error | E | null>
}

export interface ArticleDataResponse {
    articles: NewsItem[]
    status: string
    totalResults: number
    formattedTotalResults?: string
}