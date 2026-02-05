<template>
  <UiPagePortal title="Sources">
    <div class="section-container py-5 md:pt-6">
      <template v-if="status === 'success'">
        <!-- Source Items -->
        <ListsSources
          v-if="sourcesData?.length > 0"
          :items="sourcesData"
          class="rounded-lg"
        />
        <!-- Empty Message -->
        <UiMessageBox v-else type="info" message="No Data Available at The Moment." />
      </template>
      <!-- Error Message -->
      <UiMessageBox v-else type="error" :message="error?.message" />
    </div>
  </UiPagePortal>
</template>

<script setup>
const { endpointBases: { SOURCES } } = useAppConfig();
const { data, status, error } = await useFetcher(SOURCES);
const sourcesData = computed(() => data.value?.sources || []);
</script>
