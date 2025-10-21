import type { $fetch } from "ofetch"

export default async function useFetcher<T>(
  request: Parameters<typeof $fetch<T>>[0],
  opts?: Record<string, unknown>
) {
  try {
    return await useFetch<T>(request, opts)
  } catch (err) {
    console.error("Error fetching:", err)
    throw err
  }
}
