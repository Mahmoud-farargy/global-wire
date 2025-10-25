<template>
  <div>
    <NuxtLoadingIndicator color="#33302e" />
    <!-- Desktop -->
    <div v-if="!isMobile">
      <LayoutHeader />
      <main class="min-h-screen mt-4">
        <slot />
      </main>
    </div>
    <!-- Mobile -->
    <div v-else>
      <UiMobileSidebarMenu
        mode="drawer"
      >
        <main class="min-h-screen mt-15">
          <slot />
        </main>
      </UiMobileSidebarMenu>
    </div>
    <LayoutFooter />
  </div>
</template>

<script lang="ts" setup>
// Refs
const isMobile = ref(false);

// Functions
const updateIsMobile = () => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
};

onMounted(() => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIsMobile);
});

</script>

