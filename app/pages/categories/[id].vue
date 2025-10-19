<template>
  <UiPagePortal :title="`${categoryTitle} News`">
    <div class="section-container py-5 md:pt-6">
      <div v-if="status === 'success'">
        <!-- Source news -->
        <div v-if="newsData.length > 0">
          <SharedNewsArticleResults :items="newsData" :title="categoryTitle" />
        </div>
        <!-- Empty Message -->
        <UiMessageBox v-else type="info" message="No Data Available at The Moment." />
      </div>
      <!-- Error Message -->
      <UiMessageBox v-else type="error" :message="error?.message" />
    </div>
  </UiPagePortal>
</template>

<script setup>
const router = useRoute();
const { id } = router.params || {};
const { data, status, error } = await useFetcher(`/top-headlines?category=${id}`);

const newsData = computed(() => data.value?.articles || []);
const categoryTitle = computed(() => capFirstLetter(id));
</script>
