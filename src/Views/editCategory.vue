<template>
  <div
    class="flex items-center justify-center h-full"
    v-if="Category">
    <newCategory
      :Edit="true"
      :Category="Category" />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import newCategory from './newCategory.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
const route = useRoute();
const Category = ref(null);

async function fetch() {
  await axios
    .get(`http://localhost:8080/api/categories/${route.params.id}`)
    .then(function (response) {
      Category.value = response.data;
    })
    .catch(() => {
      isLoading.value = false;
    });
}

function HandleEdit() {
  console.log('Edit triggered');
}
watchEffect(() => fetch(), []);
</script>
