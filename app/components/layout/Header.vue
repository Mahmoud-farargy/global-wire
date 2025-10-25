<template>
  <header id="header" class="w-full hidden md:block">
    <div >
      <div class="border-b-[1px] border-b-divider py-3 md:py-4">
        <div class="flex p-2 container text-palette-paper-4 items-center mx-auto">
          <!-- Search -->
            <div class="flex w-[33.3%]">
              <SharedSearchBarModal v-model="isSearchOpen" >
                <UButton class="p-2 cursor-pointer" color="secondary" variant="ghost">
                  <Icon name="heroicons-solid:search" class="w-6 h-6" />
                </UButton>
              </SharedSearchBarModal>
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
            <USelect
              v-if="showCountriesSelector"
              v-model="selectedCountry"
              :items="countriesItems"
              color="primary"
              trailing-icon="i-lucide:globe"
              class="p-2 w-52"
              @change="onCountryChange"
            />

            <NuxtLink
              :to="routeNames.sources"
              class="flex items-center gap-2 select-none font-size-0 font-medium text-inherit"
            >
              <Icon name="i-iconamoon:news" class="w-7 h-7" />
              Sources
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- Category Nav List - Desktop -->
      <nav class="block border-b-[1px] border-b-divider w-full">
        <div
          class="relative flex container mx-auto before:content-[''] before:flex before: after:content-[''] after:clear-both after:flex"
        >
          <ul
            class="table list-none float-left [&>li:nth-child(n+2)]:[padding-left:0.750rem]"
          >
            <li
              v-for="categoryItem in desktopMenuList"
              :key="categoryItem.value"
              class="table-cell align-middle"
            >
              <NuxtLink
                :to="categoryItem.route"
                class="block relative uppercase text-base text-heading font-semibold py-3 whitespace-nowrap antialiased"
              >
                {{ categoryItem.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { CategoriesItem } from "~/types";

// Composables
const { appName, countriesList, categoriesList, routeNames } = useAppConfig();
const router = useRouter();
const route = useRoute();
const countrySavedCookie = useCookie("global-wire-country", {
  secure: true,
});

// Refs
const isSearchOpen = ref<boolean>(false);
const selectedCountry = ref<string>(countrySavedCookie.value || "all");

// Computed properties
const countriesItems = computed(() => [
  { label: "All", value: "all" },
  ...Object.entries(countriesList || {}).map(([countryName, abbreviation]) => ({
    label: countryName,
    value: abbreviation,
  })),
]);

const categoriesItems = computed<CategoriesItem[]>(
  () =>
    categoriesList?.map((categoryItem: Record<string, string>) => ({
      ...categoryItem,
      route: `${routeNames.categories}/${categoryItem.value}`,
    })) || []
);

const desktopMenuList = computed(() => [
  { label: "Home", value: "home", route: routeNames.homepage, icon: "i-lucide-house" },
  ...categoriesItems.value,
]);

const showCountriesSelector = computed(() => {
  return !(
    route.path === routeNames.homepage ||
    route.path.startsWith(routeNames.search) ||
    route.path.startsWith(`${routeNames.categories}/`) ||
    route.path.startsWith(`${routeNames.sources}/`)
  );
});

// Functions
const onCountryChange = () => {
  countrySavedCookie.value = selectedCountry.value || "us";
  router.go(0);
};

if(!countrySavedCookie.value){
  countrySavedCookie.value = "all";
}

onMounted(() => {
  if(selectedCountry.value){
    selectedCountry.value = countrySavedCookie.value;
  }
});
</script>
