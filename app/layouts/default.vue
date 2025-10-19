<template>
  <div>
    <NuxtLoadingIndicator />
    <LayoutHeader />
    <main class="min-h-screen">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<script lang="ts" setup/>
