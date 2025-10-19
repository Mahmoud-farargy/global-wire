<template>
  <ul
    id="editorialMosaic"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:mx-[-0.75rem] pt-2"
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

/* @media screen and (min-width: 1024px){
  #editorialMosaic > li:nth-child(n+3) {
    grid-row-start: 9;
  }
} */

/* @media screen and (min-width: 768px) and (max-width: 1023px) {
  #editorialMosaic > li:nth-child(n+4)::after {
    content: "";
    position: absolute;
    height: 1px;
    width: calc(100% + 24px);
    background-color: var(--color-divider);
    bottom: 0;
    display: table;
    clear: both;
  }

  #editorialMosaic > li:nth-of-type(odd) {
    margin-right: 24px;
  }

  #editorialMosaic > li:nth-of-type(2n) {
    margin-left: 24px;
  }

  #editorialMosaic > li:nth-of-type(2n)::before {
    content: "";
    display: block;
    position: absolute;
    height: calc(100% - 16px);
    width: 1px;
    background-color: var(--color-divider);
    left: -24px;
  }

  #editorialMosaic > li:nth-of-type(2n):after {
    left: -24px;
  }
}

@media screen and (min-width: 1024px) {
  #editorialMosaic > li {
    padding: 24px 12px;
  }

  #editorialMosaic > li:nth-child(n+4)::after {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    width: calc(100% + 24px);
    background-color: var(--color-divider);
    bottom: 0;
  }

  #editorialMosaic > li:last-of-type {
    padding-bottom: 24px;
  }

  #editorialMosaic > li:nth-of-type(2n)::before {
    content: "";
    display: block;
    position: absolute;
    height: calc(100% - 48px);
    width: 1px;
    background-color: var(--color-divider);
    left: 0;
  }

  #editorialMosaic > li:nth-of-type(2n):after {
    left: -24px;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1279px) {
  #editorialMosaic > li:nth-child(odd):last-child {
    margin-right: 0;
    gap: 24px;
  }

  #editorialMosaic > li:nth-child(odd):last-child::after {
    background-color: transparent;
  }
}
@media screen and (min-width: 1280px) {
  #editorialMosaic > li:last-of-type {
    border-bottom: none;

  }
  
  #editorialMosaic > li:nth-child(n+4)::after {
    content: "";
    display: block;
    position: absolute;
    height: 1px;
    width: calc(100% + 32px);
    background-color: var(--color-divider);
    top: 0;
    left: 0;
  }
  #editorialMosaic > li:nth-of-type(3n + 2) {
    margin-left: 32px;
    margin-right: 32px;
  }

  #editorialMosaic > li:nth-of-type(3n + 2)::before,
  #editorialMosaic > li:nth-of-type(3n + 3)::before {
    content: "";
    display: block;
    position: absolute;
    height: calc(100% - 48px);
    width: 1px;
    background-color: var(--color-divider);
    left: -16px;
  }

  #editorialMosaic > li:nth-of-type(3n + 2):after,
  #editorialMosaic > li:nth-of-type(3n + 3):after {
    left: -32px;
  }

  #editorialMosaic > li:nth-child(odd):last-child::after {
    background-color: var(--color-divider);
  }

  #editorialMosaic > li:nth-of-type(4)::before {
    content: "";
    display: block;
    position: absolute;
    background-color: transparent;
  }

  #editorialMosaic > li:nth-of-type(4)::after {
    left: 0;
  }
} */
</style>
