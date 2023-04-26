<template>
  <div class="flex items-center justify-center font-semibold text-2xl">
    {{ log }}
  </div>
</template>

<script setup>
defineProps({
  log: Text,
  required: false,
});
</script>
