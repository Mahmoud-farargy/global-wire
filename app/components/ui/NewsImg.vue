<template>
  <NuxtImg
    v-if="!imageFailed"
    v-bind="props"
    :src="currentSrc"
    loading="lazy"
    :fallback="defaultImg"
    :draggable="false"
    @error="handleError"
  />
  <img 
    v-else
    v-bind="props"
    :src="currentSrc"
    loading="lazy"
    :fallback="defaultImg"
    :draggable="false"
  >
</template>

<script lang="ts" setup>
    const defaultImg = "/images/default-article1.jpg";
    interface NewsImgProps  {
        src: string
        [key: string]: any
    }
    const props = defineProps<NewsImgProps>();
    const currentSrc = ref<string>(props.src || '')
    const imageFailed = ref<boolean>(false);

    const handleError = () => {
      imageFailed.value = true;
      currentSrc.value = defaultImg
    }

    watch(() => props.src, (newValue: string) => {
      imageFailed.value = false;
      currentSrc.value = newValue;
    }, {
      flush: 'post'
    })
</script>
