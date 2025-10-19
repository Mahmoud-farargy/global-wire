<template>
  <section ref="sliderContainer" class="bg-palette-paper-3">
    <h2
      class="text-size-0 font-bold text-center text-[#33302e] leading-[1.5rem] my-5 uppercase pt-7"
    >
      {{ categoryTitle }}
    </h2>

    <UiItemsSlider
      :items="items"
      :items-per-view="itemsPerView"
      :gap="10"
      :show-dots="false"
      :loop="false"
      class="section-container py-4"
    >
      <template #item="{ item }">
        <article class="grid grid-cols-12 gap-x-4 px-2 py-0 auto-rows-fr h-full">
          <!-- Image container -->
          <div
            class="relative flex overflow-hidden grow-0 w-full h-full shrink-0 py-0 col-span-4"
          >
            <UiNewsImg
              :src="item.urlToImage"
              :alt="item.description"
              class="block rounded-[0.25rem] max-w-full w-full object-contain object-top h-full select-none aspect-video"
              densities="x1 x2"
            />
          </div>
          <!-- Info -->
          <header class="flex gap-2 flex-col w-full col-span-8">
            <a
              :href="item.url"
              class="max-h-fit text-heading hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              :draggable="false"
            >
              <h3
                class="md:!text-size--3 line-clamp-6 text-size-0 tracking-[-.5px] break-words font-black"
              >
                {{ item.title }}
              </h3>
            </a>
            <!-- Date -->
            <div
              class="flex flex-nowrap text-size--4 font-normal items-center w-full mt-auto mb-2 leading-[1.5rem]"
            >
              <span
                v-if="item.publishedAt"
                class="relative sm:line-clamp-1 capitalize"
                >{{ timeAgo(item.publishedAt) }}</span
              >
            </div>
          </header>
        </article>
      </template>
    </UiItemsSlider>
  </section>
</template>

<script lang="ts" setup>
import type { NewsItem } from "@/types";
interface CategoryNewsSliderProps {
  categoryTitle: string;
  items: NewsItem[];
}
const { items, categoryTitle } = defineProps<CategoryNewsSliderProps>();
const sliderContainer = ref<HTMLElement | null>(null)
const containerWidth = ref<number>(0)
const { debounced: debouncedUpdate, cancel } = useDebounceFn(updateContainerWidth, 50)

let resizeObserver: ResizeObserver | null = null

// Dynamically decide number of items per view
const itemsPerView = computed(() => {
  if (containerWidth.value < 600) return 1
  if (containerWidth.value < 900) return 2
  return 3
})

function updateContainerWidth() {
  if (sliderContainer.value) {
    containerWidth.value = sliderContainer.value.clientWidth
  }
}

onMounted(() => {
  updateContainerWidth()
  if (sliderContainer.value) {
    resizeObserver = new ResizeObserver(debouncedUpdate)
    resizeObserver.observe(sliderContainer.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver && sliderContainer.value) {
    cancel();
    resizeObserver.unobserve(sliderContainer.value)
  }
})
</script>
