<template>
  <header class="flex p-2 w-full">
    <div class="flex container items-center mx-auto">
      <!-- Search -->
      <div class="flex w-[33.3%]">
        <UModal
          v-model:open="isSearchOpen"
          :overlay="true"
          :close="{
            color: 'primary',
            variant: 'outline',
            class: 'rounded-full',
          }"
          close-icon="i-lucide-arrow-right"
        >
          <UButton class="p-2 text-palette-paper-4" variant="ghost">
            <Icon name="heroicons-solid:search" class="w-6 h-6" />
          </UButton>

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
      </div>

      <!-- App logo -->
      <div
        class="flex justify-center text-palette-paper-4 text-size-2 font-bold items-center select-none w-full md:w-[33.3%]"
      >
        <NuxtLink :to="routeNames.homepage">
          {{ appName }}
        </NuxtLink>
      </div>

      <!-- Countries & Sources -->
      <div class="flex justify-end items-center gap-2 w-full md:w-[33.3%]">
        <USelect v-model="selectedCountry" :items="countriesItems" class="p-2 w-48" />

        <NuxtLink :to="routeNames.sources" class="select-none">
          <UButton variant="ghost" class="cursor-pointer">Sources</UButton>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
// Composables
const { appName, countriesList, routeNames } = useAppConfig();
const router = useRouter();

// Refs
const query = ref<string>("");
const isSearchOpen = ref<boolean>(false);
const selectedCountry = ref<string>("all");

// Computed properties
const countriesItems = computed(() => [
  { label: "All", value: "all" },
  ...Object.entries(countriesList || {}).map(([countryName, abbreviation]) => ({
    label: countryName,
    value: abbreviation,
  })),
]);

// Functions
const onSearchSubmit = () => {
  isSearchOpen.value = false;

  router.replace({
    path: routeNames.search,
    query: {
      q: query.value
    }
  });
}
</script>
