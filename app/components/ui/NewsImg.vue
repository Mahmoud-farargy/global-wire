<template>
  <NuxtImg
    v-bind="props"
    :src="currentSrc"
    loading="lazy"
    :fallback="defaultImg"
    :draggable="false"
    @error="handleError"
  />
</template>

<script lang="ts" setup>
    const defaultImg = "/images/default-article1.jpg";
    interface NewsImgProps  {
        src: string
        [key: string]: any
    }
    const props = defineProps<NewsImgProps>();
    const currentSrc = ref<string>(props.src || '')

    const handleError = () => {
      console.log("currentSrc >>", currentSrc.value);
      currentSrc.value = defaultImg
    }

    watch(() => props.src, (newValue: string) => {
      currentSrc.value = newValue;
    }, {
      flush: 'post'
    })
</script>
