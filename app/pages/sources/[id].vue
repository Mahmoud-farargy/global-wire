<template>
  <UiPagePortal :title="`${sourceTitle} News`">
    <div class="section-container py-5 md:pt-6">
      <div v-if="status === 'success'">
        <!-- Source news -->
        <div v-if="newsData.length > 0">
          <SharedNewsArticleResults :items="newsData" :title="sourceTitle" />
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
const { data, status, error } = await useFetcher(`/everything?sources=${id}`);

const newsData = computed(() => data.value?.articles || []);
const sourceTitle = computed(() => {
  const firstItem = newsData.value?.[0];
  const sName = firstItem?.source?.name || firstItem?.author || id;
  return capFirstLetter(sName);
});
</script>
