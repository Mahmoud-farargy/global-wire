<template>
  <ul
    id="tallSidebarGrid"
    class="grid gap-4 gap-x-6 [&>li:nth-child(1)]:[grid-area:item1] [&>li:nth-child(2)]:[grid-area:item2] [&>li:nth-child(3)]:[grid-area:item3] [&>li:nth-child(4)]:[grid-area:item4]"
  >
  <!-- Note: the first item is designed to take half or the column and the entire row, and to have a bigger font-size. -->
    <li v-for="(item, i) in items" :key="i">
      <article class="flex gap-3 flex-col-reverse md:flex-row w-full">
        <header class="flex gap-2 flex-col w-full md:w-1/2">
          <!-- Title -->
          <a :href="item.url" class="max-h-fit text-heading hover:underline" target="_blank" rel="noopener noreferrer">
            <h3
              :class="`${
                i !== 0 ? 'md:!text-size--2 line-clamp-3' : 'md:!text-size-2 line-clamp-4'
              } text-size-2 tracking-[-.5px] break-words !font-black`"
            >
              {{ item.title }}
            </h3>
          </a>
          <!-- content/description -->
          <p
            v-if="item.content && i !== 0"
            :title="item.content"
            class="line-clamp-2 3xl:line-clamp-3"
            v-html="item.content || item.description"
          />
          <div
            class="flex flex-nowrap items-center font-semibold text-size--4 w-full justify-self-end mt-auto"
          >
            <span class="text-primary sm:line-clamp-1">{{
              item.source.name || item.author
            }}</span>
            <span
              v-if="item.publishedAt"
              class="relative pl-3 ml-3 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[2px] before:h-4 before:rounded-[3px] before:bg-gray-300/50 sm:line-clamp-1 capitalize"
              >{{ timeAgo(item.publishedAt) }}</span
            >
          </div>
        </header>

        <!-- Image Container -->
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="relative overflow-hidden w-full md:w-1/2"
        >
          <!-- kicker -->
          <div
            v-if="item.source.name"
            class="absolute block text-size--1 font-black bottom-5 left-3.5 px-2.5 py-0.5 3xl:py-1.5 tracking-[-.25px] leading-[41px] rounded-[0.25rem] bg-primary-2 pointer-events-none [overflow-wrap:break-word] overflow-x-hidden max-h-[calc(100%_-_24px)] max-w-[calc(100%_-_24px)] text-white"
          >
            {{ item.source.name }}
          </div>
          <!-- Image -->
          <UiNewsImg
            :src="item.urlToImage"
            :alt="item.description"
            :class="`${i !== 0 ? 'object-contain' : 'object-cover'} block h-auto rounded-[0.25rem] max-w-full w-full  aspect-video`"
          />
        </a>
      </article>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { NewsItem } from "@/types";
interface TallSidebarGridProps {
  items: NewsItem[];
}
const { items } = defineProps<TallSidebarGridProps>();
</script>
<style scoped>
#tallSidebarGrid {
  grid-template-areas:
    "item1"
    "item2"
    "item3"
    "item4";
}
@media screen and (max-width:100rem) {
  #tallSidebarGrid > li:nth-child(n+2) img {
    max-height: 18rem;
  }
}
@media screen and (min-width: 80rem) {
  #tallSidebarGrid {
    grid-template-columns: 50% 50%;
    grid-template-areas:
      "item1 item2"
      "item1 item3"
      "item1 item4";
  }
  #tallSidebarGrid > li:nth-child(1) article {
    flex-direction: column;
  }
  #tallSidebarGrid > li:nth-child(1) article > header,
  #tallSidebarGrid > li:nth-child(1) article > a {
    width: 100%;
  }
}
</style>
