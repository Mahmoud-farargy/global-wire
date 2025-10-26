<template>
  <NuxtImg
    v-bind="props"
    :src="currentSrc"
    loading="lazy"
    :provider="provider"
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
    const provider = ref<string | undefined>("none");

    const handleError = () => {
      provider.value = undefined;
      currentSrc.value = defaultImg
    }

    watch(() => props.src, (newValue: string) => {
      provider.value = "none";
      currentSrc.value = newValue;
    }, {
      flush: 'post'
    })
</script>
