<template>
  <ul id="splitTopGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:gap-x-4 gap-y-4">
    <!-- Note: the second item is designed to expand 60% vertically & horizontally, and to have a bigger font-size. -->
    <li
      v-for="(item, i) in items"
      :key="i"
      :class="`${i === 1 ? 'col-span-2 row-span-2' : ''}`"
    >
      <article class="flex gap-3 flex-col w-full h-full">
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
            class="block rounded-[0.25rem] max-w-full w-full object-cover h-full bg-gray-200 aspect-video"
            densities="x1 x2"
          />
        </a>
        <!-- Info -->
        <header class="flex gap-2 flex-col w-full mt-1">
          <a :href="item.url" class="max-h-fit text-heading hover:underline" target="_blank" rel="noopener noreferrer">
            <h3
              :class="`${
                i === 1 ? 'md:!text-size-2 line-clamp-3' : 'md:!text-size--3 line-clamp-2'
              } text-size-2 tracking-[-.5px] break-words !font-black`"
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
interface SplitTopGridProps {
  items: NewsItem[];
}
const { items } = defineProps<SplitTopGridProps>();
</script>
