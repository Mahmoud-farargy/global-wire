<template>
  <section v-if="layoutSegment">
    <!-- Section Title -->
    <UiSectionTitle
      :title="layoutSegment.type === 'grid4' ? 'Top Stories' : 'Highlights'"
    />

    <!-- Section Content -->
    <div class="lg:grid lg:grid-cols-12 relative gap-x-5">
      <div class="lg:col-span-9">
        <!-- Grid #4 Group-->
        <ListsNewsGroupsSplitTopGrid
          v-if="layoutSegment.type === 'grid4'"
          :items="contentData"
        />

        <!-- Grid #5 Group-->
        <ListsNewsGroupsSimpleGrid
          v-else-if="layoutSegment.type === 'grid5'"
          :items="contentData"
        />
      </div>
      <!-- Teaser -->
      <aside
        v-if="stickyItemData"
        class="hidden lg:block col-span-3 relative border-l-[1px] border-divider"
      >
        <!-- Sticky Item -->
        <article
          class="sticky top-[1rem] ml-3 border-t-[0.25rem] border-t-palette-teal px-6 py-8 bg-palette-paper-2 overflow-hidden sticky-item-shadow"
        >
          <!-- Image Container -->
          <a
            :href="stickyItemData.url"
            target="_blank"
            rel="noopener noreferrer"
            class="relative overflow-hidden w-full h-full"
          >
            <!-- Image -->
            <UiNewsImg
              :src="stickyItemData.urlToImage"
              :alt="stickyItemData.description"
              class="block max-w-full w-full h-full object-cover bg-gray-200 aspect-video"
              densities="x1 x2"
            />
          </a>
          <!-- Info -->
          <header class="mt-5">
            <a
              :href="stickyItemData.url"
              class="max-h-fit text-heading hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3
                class="md:!text-size--2 line-clamp-5 text-size-2 tracking-[-.5px] break-words font-black"
              >
                {{ stickyItemData.title }}
              </h3>
            </a>
          </header>
        </article>
      </aside>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { NewsItem, LayoutGroupItem } from "@/types";
interface ContentWithSidebarProps {
  layoutSegment: LayoutGroupItem;
}
const { layoutSegment } = defineProps<ContentWithSidebarProps>();

const stickyItemData = computed<NewsItem>(() => layoutSegment.subList?.[0] || {});
const contentData = computed<NewsItem[]>(() => layoutSegment.subList?.slice(1) || []);
</script>
