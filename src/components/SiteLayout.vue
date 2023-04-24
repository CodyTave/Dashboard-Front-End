<template>
  <div class="mt-16 grid md:grid-cols-5 transition-all">
    <SideBar />
    <div
      class="bg-dark-1 col-span-5 md:col-span-4 h-[70vh] overflow-auto transition-all"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import SideBar from "./SideBar.vue";
</script>
