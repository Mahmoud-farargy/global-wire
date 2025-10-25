<template>
  <ul
    id="editorialMosaic"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:mx-[-0.75rem]"
  >
    <!-- Note: the second item is designed to expand 60% vertically & horizontally, and to have a bigger font-size. -->
    <li v-for="(item, i) in items" :key="i" class="relative flex flex-col">
      <article class="relative flex gap-3 flex-col w-full h-full grow">
        <!-- Image Container -->
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="relative overflow-hidden w-full h-full"
        >
          <!-- Image -->
          <UiNewsImg
            :src="item.urlToImage"
            :alt="item.description"
            class="block rounded-[0.25rem] max-w-full w-full h-full object-cover bg-gray-200 aspect-video"
            densities="x1 x2"
          />
        </a>
        <!-- Info -->
        <header class="flex gap-2 flex-col w-full mt-1 text-center">
          <div class="text-size--2 text-primary font-semibold mb-1 line-clamp-1">
            <span>{{ item.author || item.source.name }}</span>
          </div>
          <a
            :href="item.url"
            class="max-h-fit text-heading hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3
              class="md:!text-size--3 line-clamp-2 text-size-2 tracking-[-.5px] break-words font-black"
            >
              {{ item.title }}
            </h3>
          </a>
        </header>
      </article>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { NewsItem } from "@/types";
interface EditorialMosaicProps {
  items: NewsItem[];
}
const { items } = defineProps<EditorialMosaicProps>();
</script>
<style scoped>
@media screen and (min-width: 1024px) {
  #editorialMosaic > li:nth-child(1),
  #editorialMosaic > li:nth-child(2) {
    grid-column: span 6;
    grid-row-start: 1;
  }
  #editorialMosaic > li:nth-child(n + 3) {
    grid-column: span 4;
    grid-row-start: 3;
  }
}
</style>
