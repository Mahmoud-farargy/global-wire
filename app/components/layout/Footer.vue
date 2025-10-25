<template>
  <footer class="bg-palette-dark-2">
    <!-- Copyright -->
    <div class="text-center py-3.5 mt-5">
      <a :href="portfolioLink" target="_blank" rel="noopener">
        <span class="text-size--4 font-light text-white">
          Made with
          <span aria-label="heart">
            ❤️
            <span class="sr-only">Love</span>
          </span>
          by Mahmoud Elfarargy {{ currentYear }} &copy;
        </span>
      </a>
    </div>
  </footer>
</template>

<script setup>
const { portfolioLink } = useAppConfig();
const currentYear = computed(() => new Date().getFullYear());
</script>
