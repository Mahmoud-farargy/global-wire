<template>
  <slot />
</template>

<script lang="ts" setup>
    const { appName } = useAppConfig();
    interface PagePortalProps {
        title: string;
        description?: string;
    }
    const { title, description } = defineProps<PagePortalProps>();
    useHead({
        title: title ? `${title} | ${appName}`: appName,
        meta: [
            { name: 'description', content: description || '' }
        ]
        
    })
</script>