<template>
  <UModal
    :overlay="true"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
    close-icon="i-lucide-arrow-right"
    :open="modelValue"
    @update:open="onModalOpen"
  >
  <slot/>

    <template #content>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">Search</h3>
        <UInput
          v-model="query"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Type to search..."
          autofocus
          class="w-full p-1"
          size="xl"
          @keydown.enter="onSearchSubmit"
        />
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
interface SearchBarModalProps {
  modelValue: boolean;
}
const { routeNames } = useAppConfig();
const router = useRouter();
const query = ref<string>("");
const emits = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
const { modelValue } = defineProps<SearchBarModalProps>();

const onModalOpen = (isModalOpen: boolean) => {
  emits("update:modelValue", isModalOpen);
};
const onSearchSubmit = () => {
  onModalOpen(false);

  router.replace({
    path: routeNames.search,
    query: {
      q: query.value,
    },
  });
};
</script>
