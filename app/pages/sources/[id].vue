<template>
  <UiPagePortal :title="`${sourceTitle} News`">
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
      <!-- Loading Box -->
      <UiMessageBox v-else type="loading" message="loading" />
    </div>
  </UiPagePortal>
</template>

<script lang="ts" setup>
import type { NewsItem, ArticleDataResponse } from "@/types";

// Refs
const currentPage = ref<number>(1);

// Composables
const router = useRoute();
const { endpointBases: { EVERYTHING } } = useAppConfig();
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
    endpoint: EVERYTHING,
    isLoadMore,
    storedData: apiResponse.value.data?.articles ?? [],
    query: {
      country: "all",
      sources: id,
      page,
    },
  });
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
