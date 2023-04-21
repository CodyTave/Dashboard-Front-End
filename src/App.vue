<template>
  <div class="dark:text-light-1 text-dark-0 p-16 h-screen">
    <HeadBar />
    <SiteLayout>
      <mainGet />
    </SiteLayout>
  </div>
</template>
5

<script setup>
import HeadBar from './components/HeadBar.vue';
import SiteLayout from './components/SiteLayout.vue';
import mainGet from './Views/mainGet.vue';
</script>
