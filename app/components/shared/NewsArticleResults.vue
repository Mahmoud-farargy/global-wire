<template>
  <section>
    <h1 class="text-size-1 font-light text-heading ">{{ title }}</h1>
    <ListsNewsStackedVertically :items="items" />
  </section>
</template>

<script lang="ts" setup>
import type { NewsItem } from "@/types";
interface StackedListProps {
  title: string;
  items: NewsItem[];
}
const { items, title } = defineProps<StackedListProps>();
</script>
