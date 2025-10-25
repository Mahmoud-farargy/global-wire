<template>
  <section class="section-container">
    <!-- Layout Groups list for the Homepage 
    => Note: this component takes a list of news and dissect them into multiple layout Groups.
    Since the API only returns one array and we want to create different Grids from it. -->
    <div v-if="items?.length > 0" class="space-y-6 md:space-y-10">
      <template v-for="(layoutSegment, i) in layoutGroups" :key="i">
        <template v-if="layoutSegment.subList?.length > 0">
          <!-- Single item -->
          <ListsNewsGroupsSingleItem
            v-if="layoutSegment.type === 'single'"
            :item="layoutSegment.subList[0]"
          />

          <!-- Grid #1 group-->
          <ListsNewsGroupsTallSidebarGrid
            v-else-if="layoutSegment.type === 'grid1'"
            :items="layoutSegment.subList"
          />

          <!-- Grid #2 group-->
          <ListsNewsGroupsTripleItemsRow
            v-else-if="layoutSegment.type === 'grid2'"
            :items="layoutSegment.subList"
          />

          <!-- Grid #3 group-->
          <ListsNewsGroupsEditorialMosaic
            v-else-if="layoutSegment.type === 'grid3'"
            :items="layoutSegment.subList"
          />

          <!-- Grid #4 & Grid #5 groups-->
          <SectionsHomeContentWithTeasers v-else :layout-segment="layoutSegment" />
        </template>
      </template>
    </div>
    <div v-else>No Data Available</div>
  </section>
</template>

<script lang="ts" setup>
import type { NewsItem, LayoutGroupItem } from "@/types";
interface NewsListProps {
  items: NewsItem[];
}
const { items } = defineProps<NewsListProps>();
const layoutGroups: LayoutGroupItem[] = useLayoutGroupsGenerator(items);
</script>
