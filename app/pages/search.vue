<template>
  <UiPagePortal :title="`${searchQueryTitle} News`">
    <div class="section-container py-5 md:pt-6">
      <div v-if="apiResponse.status === 'success'">
        <!-- Source news -->
        <div v-if="newsData.length > 0">
          <SharedNewsArticleResults
            :items="newsData"
            :title="`&quot;${searchQueryTitle}&quot; ${apiResponse.data?.formattedTotalResults}`"
            :is-loading="isInitiallyLoading"
            @on-load-more="loadMore"
          />
        </div>
        <!-- Empty Message -->
        <UiMessageBox v-else type="info" message="No Data Available at The Moment." />
      </div>
      <!-- Error Message -->
      <UiMessageBox v-else type="error" :message="apiResponse.error?.message" />
    </div>
  </UiPagePortal>
</template>

<script lang="ts" setup>
import type { NewsItem, ArticleDataResponse } from "@/types";
import type { LocationQuery } from "vue-router";

// Composables
const router = useRoute();
const { apiResponse, isInitiallyLoading, fetchData } = usePaginatedArticlesFetcher<ArticleDataResponse>();
const q = computed(() => router.query.q);
// const q = (router.query.q as LocationQuery) || "";
// Refs
const currentPage = ref<number>(1);
// Computed properties
const newsData = computed<NewsItem[]>(() => apiResponse.value.data?.articles || []);

const searchQueryTitle = computed(() => capFirstLetter(q.value));

// Functions
interface FetchNewsDataFnOptions {
  page?: number;
  isLoadMore?: boolean;
  searchQuery?: LocationQuery;
}
const fetchNewsData = async ({
  page = 1,
  isLoadMore,
  searchQuery,
}: FetchNewsDataFnOptions) => {
  await fetchData({
    endpoint: `/api/news/everything?q=${searchQuery}`,
    page,
    isLoadMore,
    storedData: newsData.value,
  });
};
fetchNewsData({ searchQuery: q.value });

const loadMore = (searchQuery: LocationQuery) => {
  const { data } = apiResponse.value || {
    articles: [],
    status: "error",
    totalResults: 0,
    formattedTotalResults: "",
  };
  const hasReachedTheEnd = data?.articles?.length >= data?.totalResults - 5;

  if (!isInitiallyLoading.value && !hasReachedTheEnd) {
    currentPage.value++;
    fetchNewsData({page: currentPage.value, isLoadMore: true, searchQuery});
  }
};

watch(
  () => q.value,
  (newQuery) => {
    fetchNewsData({ searchQuery: newQuery });
  }
);

</script>
