<template>
  <NuxtImg
    v-bind="props"
    :src="currentSrc"
    loading="lazy"
    :provider="isExternal(currentSrc) ? undefined : 'none'"
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

    const isExternal = (url: string) => /^https?:\/\//.test(url);

    const handleError = () => {
      currentSrc.value = defaultImg
    }

    watch(() => props.src, (newValue: string) => {
      currentSrc.value = newValue;
    }, {
      flush: 'post'
    })
</script>
