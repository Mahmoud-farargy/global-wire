<template>
    <ul
      id="SimpleGrid"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 lg:gap-y-0 md:mx-[-0.75rem]"
    >
      <li v-for="(item, i) in items" :key="i" class="relative flex flex-col">
        <article class="relative flex flex-col w-full h-full grow">
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
              class="block rounded-tl-[0.25rem] rounded-tr-[0.25rem] max-w-full w-full h-full object-cover bg-gray-200 aspect-video"
              densities="x1 x2"
            />
          </a>
          <!-- Info -->
          <div class="bg-palette-paper-2 px-4 py-4 rounded-bl-[0.25rem] rounded-br-[0.25rem]">
            <div class="text-size--2 text-primary font-semibold mb-2 line-clamp-1">
              <span>{{ item.author || item.source.name }}</span>
            </div>
            <header class="flex gap-2 flex-col w-full">
              <a
                :href="item.url"
                class="max-h-fit text-heading hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3
                  class="md:!text-size--2 line-clamp-3 text-size-2 tracking-[-.5px] break-words !font-black"
                >
                  {{ item.title }}
                </h3>
              </a>
            </header>
            <div class="text-size--4 w-full justify-self-end mt-2">
              <span v-if="item.publishedAt" class="relative sm:line-clamp-1 capitalize">{{
                timeAgo(item.publishedAt)
              }}</span>
            </div>
          </div>
        </article>
      </li>
    </ul>
</template>

<script lang="ts" setup>
import type { NewsItem } from "@/types";
interface SimpleGridProps {
  items: NewsItem[];
}
const { items } = defineProps<SimpleGridProps>();
</script>
<style scoped>
@media screen and (min-width: 768px) and (max-width: 1023px) {
  #SimpleGrid > li:nth-child(n+4)::after {
    content: "";
    position: absolute;
    height: 1px;
    width: calc(100% + 24px);
    background-color: var(--color-divider);
    bottom: 0;
    display: table;
    clear: both;
  }

  #SimpleGrid > li:nth-of-type(odd) {
    margin-right: 24px;
  }

  #SimpleGrid > li:nth-of-type(2n) {
    margin-left: 24px;
  }

  #SimpleGrid > li:nth-of-type(2n)::before {
    content: "";
    display: block;
    position: absolute;
    height: calc(100% - 16px);
    width: 1px;
    background-color: var(--color-divider);
    left: -24px;
  }

  #SimpleGrid > li:nth-of-type(2n):after {
    left: -24px;
  }
}

@media screen and (min-width: 1024px) {
  #SimpleGrid > li {
    padding: 0 12px 24px 12px;
  }
  #SimpleGrid > li:nth-child(n+4) {
    padding: 24px 12px;
  }

  #SimpleGrid > li:nth-child(n+4)::after {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    width: calc(100% + 24px);
    background-color: var(--color-divider);
    bottom: 0;
  }

  #SimpleGrid > li:last-of-type {
    padding-bottom: 24px;
  }

  #SimpleGrid > li:nth-of-type(2n)::before {
    content: "";
    display: block;
    position: absolute;
    height: calc(100% - 48px);
    width: 1px;
    background-color: var(--color-divider);
    left: 0;
  }

  #SimpleGrid > li:nth-of-type(2n):after {
    left: -24px;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1279px) {
  #SimpleGrid > li:nth-child(odd):last-child {
    margin-right: 0;
    gap: 24px;
  }

  #SimpleGrid > li:nth-child(odd):last-child::after {
    background-color: transparent;
  }
}
@media screen and (min-width: 1280px) {
  #SimpleGrid > li:last-of-type {
    border-bottom: none;
  }
  
  #SimpleGrid > li:nth-child(n+4)::after {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    width: calc(100% + 12px);
    background-color: var(--color-divider);
    top: 0;
    left: 0;
  }
  #SimpleGrid > li:nth-of-type(3n + 2) {
    margin-left: 12px;
    margin-right: 12px;
  }

  #SimpleGrid > li:nth-of-type(3n + 2)::before,
  #SimpleGrid > li:nth-of-type(3n + 3)::before {
    content: "";
    display: block;
    position: absolute;
    height: calc(100% - 48px);
    width: 1px;
    background-color: var(--color-divider);
    left: -6px;
  }

  #SimpleGrid > li:nth-of-type(3n + 2):after,
  #SimpleGrid > li:nth-of-type(3n + 3):after {
    left: -12px;
  }

  #SimpleGrid > li:nth-child(odd):last-child::after {
    background-color: var(--color-divider);
  }

  #SimpleGrid > li:nth-of-type(4)::before {
    content: "";
    display: block;
    position: absolute;
    background-color: transparent;
  }

  #SimpleGrid > li:nth-of-type(4)::after {
    left: 0;
  }
}
</style>
