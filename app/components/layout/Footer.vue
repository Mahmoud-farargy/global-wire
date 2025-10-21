<template>
  <footer class="bg-palette-dark-2">
    <!-- Copyright -->
    <div class="text-center py-3.5 mt-5">
      <a :href="portfolioLink" target="_blank" rel="noopener">
        <span class="text-size--4 font-light text-white">
          Mahmoud Elfarargy
        </span>
      </a>
    </div>

    <!-- Sub Footer -->
    <!-- <div class="bg-palette-dark-1 p-1.5" /> -->
  </footer>
</template>

<script setup>
const { portfolioLink } = useAppConfig();
</script>
