import type { $fetch } from "ofetch"

export default async function useFetcher<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Record<string, unknown>,
) {
  try {
    const config = useRuntimeConfig();
    const { baseNewsApiUrl, newsApiKey } = config?.public || {};
    const query = {
    apiKey: newsApiKey,
     ...(opts?.query && typeof opts.query === 'object' ? opts.query : {}),
    }
    
    return await useFetch<T>(`${baseNewsApiUrl}${request}`, {
      ...opts,
      query
    })
  } catch (err) {
    console.error("Error fetching:", err)
    throw err
  }
}
