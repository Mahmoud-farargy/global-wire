import type { NewsItem, FetcherResponse } from "@/types"

interface ApiResponse<T> {
  data: T | null
  status: string
  error: unknown
}

interface FetchOptions {
  endpoint: string
  page?: number
  isLoadMore?: boolean
  storedData?: NewsItem[]
}

interface BaseResponse {
  articles: NewsItem[]
  status: string
  totalResults: number
  formattedTotalResults?: string
}

export function usePaginatedArticlesFetcher<T extends BaseResponse>() {
  const apiResponse = ref<ApiResponse<T>>({
    data: {
      articles: [],
      status: "error",
      totalResults: 0,
      formattedTotalResults: "",
    } as unknown as T,
    status: "",
    error: {
      message: "Failed to fetch data.",
    },
  })

  const isInitiallyLoading = ref(false)
  const isFetchingMore = ref(false)

  const fetchData = async ({
    endpoint,
    page = 1,
    isLoadMore = false,
    storedData = [],
  }: FetchOptions): Promise<void> => {
    isInitiallyLoading.value = true
    isFetchingMore.value = isLoadMore

    try {
      const { data, status, error } = (await useFetcher(endpoint, {
        query: { page },
      })) as FetcherResponse<T>

      const responseValue: T =
        data.value ??
        ({
          articles: [],
          status: "error",
          totalResults: 0,
          formattedTotalResults: "",
        } as unknown as T)
      const totalResults = responseValue.totalResults ?? 0

      // add formatted total count
      const formattedTotalResults =
        totalResults > 0 ? `(${formatIndianNumber(totalResults)})` : ""

      const fetchedData = {
        ...responseValue,
        totalResults,
        formattedTotalResults,
      }

      apiResponse.value = {
        data: isLoadMore
          ? ({
              ...fetchedData,
              articles: [
                ...(storedData ?? []),
                ...(fetchedData.articles ?? []),
              ],
            } as T)
          : (fetchedData as T),
        status: status.value,
        error: error.value,
      }
    } catch (err) {
      apiResponse.value = {
        data: {
          articles: [],
          status: "error",
          totalResults: 0,
          formattedTotalResults: "",
        } as unknown as T,
        status: "error",
        error: { message: err },
      }
    } finally {
      isInitiallyLoading.value = false
      isFetchingMore.value = false
    }
  }

  return {
    apiResponse,
    isInitiallyLoading,
    isFetchingMore,
    fetchData,
  }
}
