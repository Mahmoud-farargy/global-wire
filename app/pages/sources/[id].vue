<template>
  <UiPagePortal :title="`${sourceTitle} News`">
        {{ apiResponse.error?.message }}
    <div class="section-container py-5 md:pt-6">
      <template v-if="!isInitiallyLoading || isFetchingMore">
        <div v-if="apiResponse.status === 'success'">
          <!-- Source news -->
          <div v-if="newsData.length > 0">
            <SharedNewsArticleResults
              :items="newsData"
              :title="`${sourceTitle} ${apiResponse.data?.formattedTotalResults}`"
              :is-loading="isInitiallyLoading"
              @on-load-more="loadMore"
            />
          </div>
          <!-- Empty Message -->
          <UiMessageBox v-else type="info" message="No Data Available at The Moment." />
        </div>
        <!-- Error Message -->
        <UiMessageBox v-else type="error" :message="apiResponse.error?.message || ''" />
      </template>
      <div v-else>loading...</div>
    </div>
  </UiPagePortal>
</template>

<script lang="ts" setup>
import type { NewsItem, ArticleDataResponse } from "@/types";
// Interfaces
// Refs
// const isInitiallyLoading = ref<boolean>(false);
const currentPage = ref<number>(1);
// const apiResponse = ref<APIResponse>({
//   data: {
//     articles: [],
//     status: "error",
//     totalResults: 0,
//   },
//   status: "idle",
//   error: "",
// });
// Composables
const router = useRoute();
const {
  apiResponse,
  isInitiallyLoading,
  isFetchingMore,
  fetchData,
} = usePaginatedArticlesFetcher<ArticleDataResponse>();

const { id } = router.params as { id?: string };

// Functions
const fetchNewsData = async (
  page: number = currentPage.value || 1,
  isLoadMore?: boolean
) => {
  await fetchData({
    endpoint: `/api/news/everything?sources=${id}`,
    page,
    isLoadMore,
    storedData: apiResponse.value.data?.articles ?? [],
  });
  // isInitiallyLoading.value = true;
  // try {
  //   const { data, status, error } = (await useFetcher(
  //     `/everything?sources=${id}&page=${page}`
  //   )) as FetcherResponse<{ articles: NewsItem[]; status: string; totalResults: number }>;
  //   const previouslyStoredData = apiResponse.value.data.articles ?? [];
  //   const newlyFetchedData = data.value?.articles ?? [];
  //   apiResponse.value = {
  //     data: {
  //       status: data.value?.status ?? "error",
  //       totalResults: data.value?.totalResults ?? 0,
  //       articles: [
  //         ...(isLoadMore
  //           ? [...previouslyStoredData, ...newlyFetchedData]
  //           : newlyFetchedData),
  //       ],
  //     },
  //     status: status.value,
  //     error: error.value,
  //   };
  // } catch (err) {
  //   apiResponse.value = {
  //     data: {
  //       articles: [],
  //       status: "error",
  //       totalResults: 0,
  //     },
  //     status: "error",
  //     error: err,
  //   };
  // } finally {
  //   isInitiallyLoading.value = false;
  // }
};

fetchNewsData();

const loadMore = () => {
  const { data } = apiResponse.value || {
    articles: [],
    status: "error",
    totalResults: 0,
    formattedTotalResults: "",
  };
  const hasReachedTheEnd = data?.articles?.length >= data?.totalResults - 5;

  if (!isInitiallyLoading.value && !hasReachedTheEnd) {
    currentPage.value++;
    fetchNewsData(currentPage.value, true);
  }
};

// Computed properties
const newsData = computed<NewsItem[]>(() => apiResponse.value.data?.articles || []);
const sourceTitle = computed<string>(() => {
  const firstItem = newsData.value?.[0] as NewsItem;
  const sName = firstItem?.source?.name || firstItem?.author || id || "";
  return capFirstLetter(sName);
});
</script>
