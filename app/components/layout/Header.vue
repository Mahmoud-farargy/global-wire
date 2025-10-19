<template>
  <header class="flex p-2 w-full">
    <div class="flex container mx-auto">
      <!-- Search -->
      <div class="flex w-[33.3%]">
        <UDashboardSearchButton collapsed />
      </div>

      <!-- App logo -->
      <div
        class="flex justify-center text-[#33302e] text-size-2 font-bold items-center select-none w-full md:w-[33.3%]"
      >
        <NuxtLink :to="routeNames.homepage">
          {{ appName }}
        </NuxtLink>
      </div>

      <!-- Countries & Sources -->
      <div class="flex justify-end items-center gap-2 w-full md:w-[33.3%]">
        <USelect v-model="selectedCountry" :items="countriesItems" class="p-2 w-48" />

        <NuxtLink to="/sources" class="select-none">
          <UButton variant="ghost" class="cursor-pointer">Sources</UButton>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const { appName, countriesList, routeNames } = useAppConfig();
const selectedCountry = ref("all");
const countriesItems = computed(() => [
  { label: "All", value: "all" },
  ...Object.entries(countriesList || {}).map(([countryName, abbreviation]) => ({
    label: countryName,
    value: abbreviation,
  })),
]);
</script>
