<template>
  <UiPagePortal :title="`${categoryTitle} News`">
    <div class="section-container py-5 md:pt-6">
      <template v-if="!isInitiallyLoading || isFetchingMore">
        <div v-if="apiResponse?.status === 'success'">
          <!-- Source news -->
          <div v-if="newsData.length > 0">
            <SharedNewsArticleResults
              :items="newsData"
              :title="`${categoryTitle} ${apiResponse.data?.formattedTotalResults}`"
              :is-loading="isInitiallyLoading"
              @on-load-more="loadMore"
            />
          </div>
          <!-- Empty Message -->
          <UiMessageBox v-else type="info" message="No Data Available at The Moment." />
        </div>
        <!-- Error Message -->
        <UiMessageBox v-else type="error" :message="apiResponse?.error?.message" />
      </template>
      <!-- Loading Box -->
      <UiMessageBox v-else type="loading" message="loading" />
    </div>
  </UiPagePortal>
</template>

<script lang="ts" setup>
import type { ArticleDataResponse } from "@/types";
const router = useRoute();
const currentPage = ref<number>(1);
const { id } = router.params || {};
const {
  apiResponse,
  isInitiallyLoading,
  isFetchingMore,
  fetchData,
} = usePaginatedArticlesFetcher<ArticleDataResponse>();

const newsData = computed(() => apiResponse.value?.data?.articles || []);
const categoryTitle = computed(() => capFirstLetter(id));

// Functions
const fetchNewsData = async (
  page: number = currentPage.value || 1,
  isLoadMore?: boolean
) => {
  await fetchData({
    endpoint: `/api/news/top-headlines`,
    isLoadMore,
    storedData: apiResponse.value.data?.articles ?? [],
    query: {
      country: "all",
      category: id,
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
</script>
