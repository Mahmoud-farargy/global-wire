<template>
  <TransitionGroup
    id="stackedVerticalGrid"
    tag="ul"
    name="news-article-list"
    class="grid grid-cols-1 gap-3 lg:gap-0 lg:grid-cols-2 md:-mx-4 lg:-mx-5"
  >
    <!-- => Note: the second item is designed to expand 60% vertically & horizontally, and to have a bigger font-size. -->
    <li v-for="(item, i) in items" :key="i" class="relative md:p-4 lg:px-5">
      <article class="grid md:grid-cols-12 gap-3 w-full h-full">
        <!-- Image Container -->
        <a
          :href="item.url"
          target="_blank"
          rel="noopener noreferrer"
          class="relative overflow-hidden w-full h-full md:col-span-4"
        >
          <!-- Image -->
          <UiNewsImg
            :src="item.urlToImage"
            :alt="item.description"
            class="block rounded-[0.25rem] max-w-full w-full object-contain h-full aspect-video object-top"
            densities="x1 x2"
          />
        </a>
        <!-- Info -->
        <header class="flex gap-2 flex-col w-full mt-1 md:col-span-8">
          <div class="flex w-full items-center justify-between">
            <h2 class="text-primary text-size--3 sm:line-clamp-1 font-semibold">
              {{ item.source.name || item.author }}
            </h2>
            <Icon class="w-6 h-6 lg:w-8 lg:h-8" name="i-lucide-bookmark" />
          </div>
          <a
            :href="item.url"
            class="max-h-fit text-heading hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3
              class="md:!text-size--4 line-clamp-3 text-size-2 tracking-[-.5px] break-words !font-black md:w-[94%]"
            >
              {{ item.title }}
            </h3>
          </a>
          <!-- content -->
          <p
            v-if="item.content"
            :title="item.content"
            class="line-clamp-2 3xl:line-clamp-3 md:w-[94%]"
            v-html="item.content || item.description"
          />
          <span v-if="item.publishedAt" class="relative sm:line-clamp-1 capitalize">{{
            timeAgo(item.publishedAt)
          }}</span>
        </header>
      </article>
    </li>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import type { NewsItem } from "@/types";
interface StackedVerticallyProps {
  items: NewsItem[];
}
const { items } = defineProps<StackedVerticallyProps>();
</script>
