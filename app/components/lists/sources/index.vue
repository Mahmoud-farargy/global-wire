<template>
  <ul class="grid gap-6 grid-cols-1sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <li v-for="(source, i) in sources" :key="source.id || i">
      <article
        v-if="source"
        class="flex flex-col group relative overflow-hidden rounded-2xl h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <div class="p-5 flex flex-col h-full grow-1">
          <NuxtLink :to="`${routeNames.sources}/${source.id}`">
            <h3
              class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-primary transition-colors hover:underline"
            >
              {{ source.name }}
            </h3>
          </NuxtLink>

          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
            {{ source.description }}
          </p>

          <div class="mt-auto flex items-center justify-between text-sm">
            <NuxtLink
              :to="`${routeNames.categories}/${source.category}`"
              class="text-primary hover:underline font-medium"
            >
              <span
                class="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 capitalize"
              >
                {{ source.category }}
              </span>
            </NuxtLink>

            <a
              :href="source.url"
              target="_blank"
              rel="noopener"
              class="text-primary hover:underline font-medium"
            >
              Visit Site →
            </a>
          </div>
        </div>
      </article>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { SourceItem } from "@/types";
interface SourcesListProps {
  items: SourceItem[];
}
const { items: sources } = defineProps<SourcesListProps>();
const { routeNames } = useAppConfig();
</script>
