<template>
  <div>
    <article v-if="item" class="single-article grid gap-4 md:gap-6">
      <!-- Image Container -->
      <a
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="relative overflow-hidden"
      >
        <!-- Image -->
        <UiNewsImg
          :src="item.urlToImage"
          :alt="item.description"
          class="block h-auto rounded-[0.25rem] max-w-full w-full object-contain bg-gray-200 aspect-video"
        />
        <!-- kicker -->
        <div
          v-if="item.source.name"
          class="absolute block text-size-2 font-black bottom-6 left-3.5 px-3.5 py-1 3xl:py-4 tracking-[-.25px] leading-[41px] rounded-[0.25rem] bg-primary-2 pointer-events-none [overflow-wrap:break-word] overflow-x-hidden max-h-[calc(100%_-_24px)] max-w-[calc(100%_-_24px)] text-white"
        >
          {{ item.source.name }}
        </div>
      </a>
      <!-- Title -->
      <header>
        <a
          :href="item.url"
          class="max-h-fit text-heading hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3
            class="text-size-2 md:!text-size-3 tracking-[-.5px] break-words !font-black line-clamp-6"
          >
            {{ item.title }}
          </h3>
        </a>
      </header>
    </article>
  </div>
</template>

<script lang="ts" setup>
import type { NewsItem } from "@/types";
interface Single {
  item?: NewsItem;
}
const { item } = defineProps<Single>();
</script>

<style scoped>
article.single-article {
  grid-template-areas:
    "story-image"
    "info";
}
article.single-article img {
  grid-area: story-image;
}
article.single-article h3 {
  grid-area: info;
}
@media screen and (min-width: 80rem) {
  article.single-article {
    grid-template-columns:
      [story-image] minmax(520px, auto)
      [info] minmax(355px, auto);
    grid-template-areas: "story-image info";
  }
}
@media screen and (min-width: 90rem) {
  article.single-article {
    grid-template-columns: [story-image] minmax(60%, auto) [info] minmax(40%, auto);
  }
}
</style>
