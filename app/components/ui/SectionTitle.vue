<template>
  <div>
    <div class="separator-dotted mt-0" />
    <h2
      :class="`text-size-0 font-bold text-center text-[#33302e] leading-[1.5rem] mt-5 mb-7 uppercase ${headerClass}`"
    >
      {{ title }}
    </h2>
  </div>
</template>

<script lang="ts" setup>
interface SectionTitleProps {
  headerClass?: string;
  title: string;
}
const { title, headerClass } = defineProps<SectionTitleProps>();
</script>
