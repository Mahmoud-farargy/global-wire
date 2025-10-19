<template>
  <UiPagePortal :title="`${searchQueryTitle} News`">
    <div class="section-container py-5 md:pt-6">
      <div v-if="status === 'success'">
        <!-- Source news -->
        <div v-if="newsData.length > 0">
          <SharedNewsArticleResults :items="newsData" :title="searchQueryTitle" />
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
const { q } = router.query || {};
const { data, status, error } = await useFetcher(`/everything?q=${q}`);

const newsData = computed(() => data.value?.articles || []);
const searchQueryTitle = computed(() => capFirstLetter(q));
</script>
