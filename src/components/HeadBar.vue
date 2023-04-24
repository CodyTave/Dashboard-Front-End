<template>
  <div class="xs:flex flex-wrap items-center justify-between">
    <RouterLink :to="`/`">
      <h1 :class="` text-2xl font-semibold hoverSmooth`">Dashboard</h1>
    </RouterLink>
    <div>{{ todaysDate() }}</div>
  </div>
</template>

<script setup>
import { todaysDate } from "../Constants/Reuseables";
import { RouterLink } from "vue-router";
</script>
