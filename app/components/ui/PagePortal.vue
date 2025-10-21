<template>
  <slot />
</template>

<script lang="ts" setup>
const { appName } = useAppConfig();
interface PagePortalProps {
  title: string;
  description?: string;
}
const props = defineProps<PagePortalProps>();
useHead({
  title: computed(() => (props.title ? `${props.title} | ${appName}` : appName)),
  meta: [{ name: "description", content: computed(() => props.description || "") }],
});
</script>
