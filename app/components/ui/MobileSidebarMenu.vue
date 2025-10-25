<template>
  <UDashboardGroup class="flex flex-col relative" color="primary">
    <UDashboardSidebar v-model:open="isCollapsed" :mode="mode" color="primary">
      <template #header="{ collapsed }">
        <Logo v-if="!collapsed" class="h-5 w-auto" />
        <UIcon
          v-else
          name="i-simple-icons-nuxtdotjs"
          class="size-5 text-primary mx-auto"
        />
      </template>
      <div>
      <SharedSearchBarModal v-model="isSearchOpen" >
          <UButton
            :label="'Search...'"
            icon="i-lucide-search"
            color="neutral"
            variant="outline"
            block
            @click="emitSearchClickEvent"
          >
            <template #trailing>
              <div class="flex items-center gap-0.5 ms-auto">
                <UKbd value="meta" variant="subtle" />
                <UKbd value="K" variant="subtle" />
              </div>
            </template>
          </UButton>
      </SharedSearchBarModal>
      </div>
      <UNavigationMenu :items="mobileMenuList" orientation="vertical" color="primary">
        <template #item="{ item }">
          <NuxtLink
            v-if="item.route"
            :to="item.route"
            class="flex items-center gap-x-2.5 p-2 hover:bg-primary/10 rounded-md transition-colors w-full"
            @click="closeMobileMenu"
          >
            <UIcon v-if="item.icon" :name="item.icon" class="w-4 h-4" />
            <span>{{ item.label }}</span>
          </NuxtLink>
        </template>
      </UNavigationMenu>
    </UDashboardSidebar>

    <UDashboardPanel class="fixed top-0 z-20" color="primary">
      <template #header>
        <UDashboardNavbar class="bg-[#fff1e5]">
          <template #title>
            <NuxtLink :to="routeNames.homepage" class="text-xl font-semibold">
              Global Wire
            </NuxtLink>
          </template>
        </UDashboardNavbar>
      </template>
    </UDashboardPanel>
    <slot />
  </UDashboardGroup>
</template>

<script setup lang="ts">
import type { CategoriesItem } from "~/types";
import type { NavigationMenuItem } from "@nuxt/ui";

// Interfaces
type MenuItem = CategoriesItem | NavigationMenuItem;

// Composables
const { categoriesList, routeNames } = useAppConfig();

// Emits
const emits = defineEmits(["onSearchClick"]);
// Props
defineProps<{
  mode: "drawer" | "slideover" | "modal";
}>();

// Refs
const isSearchOpen = ref<boolean>(false);
const isCollapsed = ref<boolean>(false);

// Shortcuts
defineShortcuts({
  o: () => (isCollapsed.value = !isCollapsed.value),
});
// Computed Properties
const categoriesItems = computed<CategoriesItem[]>(
  () =>
    categoriesList?.map((categoryItem: Record<string, string>) => ({
      ...categoryItem,
      route: `${routeNames.categories}/${categoryItem.value}`,
    })) || []
);
const mobileMenuList = computed<MenuItem[]>(() => [
  { label: "Home", value: "home", route: routeNames.homepage, icon: "i-lucide-house" },
  {
    label: "Sources",
    value: "sources",
    route: routeNames.sources,
    icon: "i-iconamoon:news",
  },
  ...categoriesItems.value,
]);

// Functions
const closeMobileMenu = () => {
  isCollapsed.value = false;
};
const emitSearchClickEvent = () => {
  closeMobileMenu();
  emits("onSearchClick");
};
</script>
<style>
[id^="dashboard-panel-v-"] {
  min-height: auto;
}
[id^="dashboard-panel-v-"],
[id^="dashboard-sidebar-v-"] {
  width: 100%;
}
</style>