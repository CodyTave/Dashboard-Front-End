<template>
  <div class="flex items-center justify-center">{{ log }}</div>
</template>

<script setup>
defineProps({
  log: Text,
  required: false,
});
</script>
