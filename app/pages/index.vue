<template>
  <!-- HOMEPAGE -->
  <UiPagePortal title="Home">
    <div v-if="status === 'success'" class="pt-5 md:pt-6">
      <div v-if="!areAllListsEmpty">
        <!-- Top Headlines -->
        <SectionsHomeTopHeadlines :items="topNewsList" />
        <!-- Category News - Slider -->
        <SectionsHomeCategoryNewsSlider
          :items="firstCategoryList"
          category-title="Test"
        />
        <!-- Category News - Grid -->
        <SectionsHomeCategoryNewsGrid
          :items="secondCategoryList"
          category-title="Test2"
        />
      </div>
      <!-- Empty Message -->
      <UiMessageBox v-else type="info" message="No Data Available at The Moment." />
    </div>
    <!-- Error message -->
    <UiMessageBox
      v-else
      type="error"
      :message="error?.message || 'Unable to fetch data. Please try again later!'"
      class="section-container"
    />
  </UiPagePortal>
</template>

<script setup>
const { categoriesList } = useAppConfig();
const { data, status, error } = await useAsyncData("homepage", async () => {
  const [topHeadlines, newsFirstCategory, newsSecondCategory] = await Promise.all([
    useFetcher(`/api/news/top-headlines?country=us&pageSize=40`),
    useFetcher(`/api/news/top-headlines?country=us&category=${categoriesList[1]}&pageSize=10`),
    useFetcher(`/api/news/top-headlines?country=us&category=${categoriesList[3]}&pageSize=9`),
  ]);

  return {
    topHeadlines: topHeadlines?.data?.value?.articles ?? [],
    newsFirstCategory: newsFirstCategory?.data?.value?.articles ?? [],
    newsSecondCategory: newsSecondCategory?.data?.value?.articles ?? [],
  };
});

const topNewsList = computed(() => data.value?.topHeadlines || []);
const firstCategoryList = computed(() => data.value?.newsFirstCategory || []);
const secondCategoryList = computed(() => data.value?.newsSecondCategory || []);
const areAllListsEmpty = computed(
  () =>
    !(
      topNewsList.value?.length &&
      firstCategoryList.value?.length &&
      secondCategoryList.value?.length
    )
);
</script>
