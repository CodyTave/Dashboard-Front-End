<template>
  <div class="md:flex hidden flex-col justify-between py-3">
    <div class="grid gap-10 justify-start">
      <li v-for="item in Sidebar[0]" class="flex cursor-pointer">
        <span class="mr-4"><img class="w-5" :src="item.icon" /></span>
        <RouterLink :to="`/${item.title}`">
          <h1 class="font-medium hoverSmooth">
            {{ item.title }}
          </h1>
        </RouterLink>
      </li>
    </div>
    <div>
      <li v-for="item in Sidebar[1]" class="flex">
        <span class="mr-4"><img class="w-5" :src="item.icon" /></span>
        <h1 class="font-medium hoverSmooth">
          {{ item.title }}
        </h1>
      </li>
    </div>
  </div>
</template>

<script setup>
import { Sidebar } from "../Constants/constants";
import { RouterLink } from "vue-router";
</script>
