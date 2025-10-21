import { defineEventHandler, getQuery, readBody, setResponseStatus, createError } from 'h3'

interface FetchNewsResponse {
  [key: string]: unknown
}
interface FetchError extends Error {
  response?: {
    status?: number
    statusText?: string
  }
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { newsApiKey, public: { baseNewsApiUrl } } = config|| {};

  const query = getQuery(event) as Record<string, string>
  const method = event.method || 'GET'
  const body = method !== 'GET' ? await readBody(event) : undefined 

  if (!newsApiKey) throw new Error("News API key is not set")
  try {
    const response = await $fetch<FetchNewsResponse>(event.context.params!.path,{
      baseURL: baseNewsApiUrl,
      method,
      body,
      query: {
        apiKey: newsApiKey,
        ...query,
      }
    })
    return response
  } catch (err) {
     const e = err as FetchError
    const status = e?.response?.status ?? 500
    const errorMsg = e?.response?.statusText || "Unknown error"
    const sanitizedErrMsg = String(errorMsg)?.replace(newsApiKey, "***")

    setResponseStatus(event, status)
    throw createError({
      statusCode: status,
      statusMessage: sanitizedErrMsg || "Failed to fetch news",
    })
  }
})
