<template>
  <div class="xs:flex flex-wrap items-center justify-between">
    <h1 :class="` text-2xl font-semibold`">Dashboard</h1>
    <div>{{ todaysDate() }}</div>
  </div>
</template>

<script setup>
import { todaysDate } from '../Constants/Reuseables';
</script>
