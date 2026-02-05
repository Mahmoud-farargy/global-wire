<template>
  <UiPagePortal :title="`${searchQueryTitle} News`">
    <div class="section-container py-5 md:pt-6">
      <template v-if="!isInitiallyLoading || isFetchingMore">
        <div v-if="apiResponse.status === 'success'">
          <!-- Source news -->
          <div v-if="newsData.length > 0">
            <SharedNewsArticleResults
              :items="newsData"
              :title="`&quot;${searchQueryTitle}&quot; ${apiResponse.data?.formattedTotalResults}`"
              :is-loading="isInitiallyLoading"
              @on-load-more="loadMore"
            >
              <template #side-tools>
                <!-- Tools box -->
                <div class="flex items-center gap-3 mb-6">
                  <UPopover
                    v-model:open="isDatePopoverOpen"
                    arrow
                    @update:open="onDateRangeChange"
                  >
                    <!-- Date Range -->
                    <UButton
                      color="primary"
                      variant="subtle"
                      icon="i-lucide-calendar"
                      class="py-3 md:min-w-48"
                    >
                      <template v-if="selectedDateRange.start">
                        <template v-if="selectedDateRange.end">
                          {{
                            df.format(selectedDateRange.start?.toDate(getLocalTimeZone()))
                          }}
                          -
                          {{
                            df.format(selectedDateRange.end?.toDate(getLocalTimeZone()))
                          }}
                        </template>
                        <template v-else>
                          {{
                            df.format(selectedDateRange.start?.toDate(getLocalTimeZone()))
                          }}
                        </template>
                      </template>
                      <template v-else> Pick a date </template>
                    </UButton>
                    <template #content>
                      <UCalendar
                        v-model="selectedDateRange"
                        range
                        variant="soft"
                        :min-value="minDate"
                        :max-value="maxDate"
                        class="p-2"
                      />
                    </template>
                  </UPopover>
                  <!-- Sort By -->
                  <UButton
                    color="primary"
                    variant="subtle"
                    icon="lucide:separator-horizontal"
                  >
                    <USelect
                      v-model="selectedSorting"
                      :items="sortByItems"
                      color="primary"
                      variant="none"
                      class="min-w-48"
                      placeholder="Choose SortBy"
                      @change="onSortingChange"
                    />
                  </UButton>
                </div>
              </template>
            </SharedNewsArticleResults>
          </div>
          <!-- Empty Message -->
          <UiMessageBox v-else type="info" message="No Data Available at The Moment." />
        </div>

        <!-- Error Message -->
        <UiMessageBox v-else type="error" :message="apiResponse.error?.message" />
      </template>
      <!-- Loading Box -->
      <UiMessageBox v-else type="loading" message="loading" />
    </div>
  </UiPagePortal>
</template>

<script lang="ts" setup>
import type { NewsItem, ArticleDataResponse } from "@/types";
import { getLocalTimeZone, DateFormatter, today } from "@internationalized/date";
import type { LocationQuery } from "vue-router";

interface DateRange {
  start: Date;
  end: Date;
}
const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

// Composables
const router = useRoute();
const {
  apiResponse,
  isInitiallyLoading,
  isFetchingMore,
  fetchData,
} = usePaginatedArticlesFetcher<ArticleDataResponse>();
const { sortByOptions, endpointBases: { EVERYTHING } } = useAppConfig();

// Refs
const isDatePopoverOpen = ref<boolean>(false);
const currentPage = ref<number>(1);
const selectedDateRange = ref<DateRange>({ start: null, end: null });
const selectedSorting = ref<string>("publishedAt");
const maxDate = today(getLocalTimeZone());
const minDate = maxDate.subtract({ days: 30 });

// Computed properties
const q = computed(() => router.query.q);
const newsData = computed<NewsItem[]>(() => apiResponse.value.data?.articles || []);
const sortByItems = computed(() =>
  Object.entries(sortByOptions || {}).map(([sortByKey, sortByValue]) => ({
    label: sortByKey,
    value: sortByValue,
  }))
);

const searchQueryTitle = computed(() => capFirstLetter(q.value));

// Functions
interface FetchNewsDataFnOptions {
  page?: number;
  isLoadMore?: boolean;
  searchQuery?: LocationQuery | string;
  sortBy?: string;
  dateRange?: DateRange;
}
const formatForNewsApi = (date: Date) => {
  if (!date) return null;
  try {
    const jsDate = date.toDate(getLocalTimeZone());
    return jsDate.toISOString().split("T")[0];
  } catch (e) {
    console.error("Invalid date:", e);
    return null;
  }
};
const fetchNewsData = async ({
  page = 1,
  isLoadMore,
  searchQuery = q.value,
  sortBy = selectedSorting.value,
  dateRange = selectedDateRange.value,
}: FetchNewsDataFnOptions) => {
  const { start, end } = dateRange || {};
  const formattedStart = formatForNewsApi(start);
  const formattedEnd = formatForNewsApi(end);

  await fetchData({
    endpoint: EVERYTHING,
    isLoadMore,
    storedData: newsData.value,
    query: {
      country: "all",
      q: searchQuery,
      ...(sortBy && {
        sortBy: sortBy,
      }),
      ...(formattedStart && {
        from: formattedStart,
      }),
      ...(formattedEnd && {
        to: formattedEnd,
      }),
      page,
    },
  });
};
fetchNewsData({});

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
    fetchNewsData({ page: currentPage.value, isLoadMore: true });
  }
};

const onSortingChange = () => {
  fetchNewsData({});
};

const onDateRangeChange = (isOpen: boolean) => {
  if (isOpen) {
    return;
  }
  fetchNewsData({});
};

// Watchers
watch(
  () => q.value,
  (newQuery: any) => {
    fetchNewsData({ searchQuery: newQuery });
  }
);
</script>
