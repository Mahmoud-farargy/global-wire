<template>
  <section class="section-container py-4">
    <!-- Section Title -->
    <UiSectionTitle :title="categoryTitle" />
    <!-- Section Content -->
    <ListsNewsGroupsSimpleGrid :items="items"  />
  </section>
</template>

<script lang="ts" setup>
import type { NewsItem } from "@/types";
interface CategoryNewsGridProps {
  categoryTitle: string;
  items: NewsItem[];
}

const { items, categoryTitle } = defineProps<CategoryNewsGridProps>();
</script>
