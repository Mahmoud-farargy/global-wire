<template>
  <section>
    <!-- Title -->
    <h1 class="text-size-1 font-light text-heading mb-2.5">{{ title }}</h1>
    <!-- List Items -->
    <ListsNewsStackedVertically :items="items" :class="[isLoading ? 'opacity-55' : '']" />
    <!-- Loading Indicator -->
    <div v-show="isLoading" class="text-center mt-3 md:mt-5 lg:mt-7">
      <Icon
        name="i-lucide-loader-circle"
        class="w-6 h-6 md:w-10 md:h-10 mx-auto animate-spin text-primary/80"
      />
    </div>
    <!-- List-bottom Censor -->
    <div ref="listBottom" />
  </section>
</template>

<script lang="ts" setup>
import type { NewsItem } from "@/types";
interface StackedListProps {
  title: string;
  items: NewsItem[];
  isLoading?: boolean;
}
const { items, title, isLoading } = defineProps<StackedListProps>();

const listBottom = ref<HTMLDivElement | null>(null);
const emits = defineEmits(["onLoadMore"]);

useIntersectionObserver(listBottom, {
  rootMargin: "-20px 0px 0px 0px",
  onIntersect() {
    emits("onLoadMore");
  },
});
</script>
