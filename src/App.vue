<template>
  <div class="dark:text-light-1 text-dark-0 p-16 h-screen transition-all">
    <HeadBar />
    <SiteLayout>
      <!-- <mainGet /> -->
      <RouterView />
    </SiteLayout>
  </div>
</template>

<script setup>
import HeadBar from "./components/HeadBar.vue";
import SiteLayout from "./components/SiteLayout.vue";
import mainGet from "./Views/mainGet.vue";
import { RouterLink, RouterView } from "vue-router";
</script>
