<template>
  <!-- HOMEPAGE -->
  <UiPagePortal title="Home">
    <div v-if="!pending">
      <div v-if="status === 'success'" class="pt-5 md:pt-6">
        <div v-if="allHomeListsAvailability[0]">
          <!-- Top Headlines -->
          <SectionsHomeTopHeadlines :items="topNewsList" />
          <!-- Category News - Slider -->
          <SectionsHomeCategoryNewsSlider
            v-if="allHomeListsAvailability[1]"
            :items="firstCategoryList"
            :category-title="randomizedCategoryItems?.[0].label"
          />
          <!-- Category News - Grid -->
          <SectionsHomeCategoryNewsGrid
            v-if="allHomeListsAvailability[2]"
            :items="secondCategoryList"
            :category-title="randomizedCategoryItems?.[1].label"
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
    </div>
    <!-- Loading box -->
    <UiMessageBox v-else type="loading" message="Loading...'" class="section-container" />
  </UiPagePortal>
</template>

<script setup>
const { categoriesList } = useAppConfig();
const randomizedCategoryItems = computed(() =>
  getRandomItems(categoriesList.slice(1), 2)
);
const { data, status, error, pending } = await useAsyncData("homepage", async () => {
  const [firstCategoryItem, secondCategoryItem] = randomizedCategoryItems.value;
  const [topHeadlines, newsFirstCategory, newsSecondCategory] = await Promise.all([
    useFetcher(`/api/news/top-headlines?country=us&pageSize=40`),
    useFetcher(`/api/news/top-headlines?country=us&category=${firstCategoryItem?.value}&pageSize=10`),
    useFetcher(`/api/news/top-headlines?country=us&category=${secondCategoryItem?.value}&pageSize=9`),
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
const allHomeListsAvailability = computed(() => [
  !!topNewsList.value?.length,
  !!firstCategoryList.value?.length,
  !!secondCategoryList.value?.length,
]);
</script>
