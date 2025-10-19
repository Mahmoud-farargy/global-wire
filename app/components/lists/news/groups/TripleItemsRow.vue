<template>
  <ul id="tripleItemsRow" class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    <li v-for="(item, i) in items" :key="i" class="shadow-xl">
      <article class="flex gap-3 flex-col-reverse md:flex-row w-full h-full group">
        <!-- Image Container -->
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="relative overflow-hidden w-full h-full"
        >
          <!-- backdrop -->
          <div
            class="w-full h-full inset-0 absolute bg-black/35 group-hover:bg-transparent transition-colors duration-250 z-[1]"
          />
          <!-- Image -->
          <UiNewsImg
            :src="item.urlToImage"
            :alt="item.source.name"
            class="block rounded-[0.3rem] max-w-full w-full h-full object-cover aspect-video bg-gray-200 "
          />
          <!-- Info -->
          <header
            class="absolute bottom-0 text-shadow-2xs z-[2] px-3 pt-2 pb-4 text-white w-full overflow-hidden transition-[background-image] duration-250 group-hover:bg-gradient-to-t from-black/60 from-25% via-black/20 via-80% to-transparent to-100%"
          >
            <!-- Source & Date -->
            <div
              class="flex flex-nowrap text-size--4 font-light items-center w-full mb-1.5"
            >
              <span class="sm:line-clamp-1">{{ item.source.name || item.author }}</span>
              <span
                v-if="item.publishedAt"
                class="relative pl-3 ml-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-4 before:rounded-[3px] before:bg-gray-300/50 sm:line-clamp-1 capitalize"
                >{{ timeAgo(item.publishedAt) }}</span
              >
            </div>
            <!-- Description -->
            <p
              v-if="item.description"
              :title="item.description"
              class="text-size--2 sm:text-size--3 line-clamp-2 3xl:line-clamp-3 font-bold w-full"
            >
              {{ item.description }}
            </p>
          </header>
        </a>
      </article>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { NewsItem } from "@/types";
interface TripleItemsRowProps {
  items: NewsItem[];
}
const { items } = defineProps<TripleItemsRowProps>();
</script>
