<template>
  <div v-if="Product">
    <newProduct
      :Edit="true"
      :HandleEdit="HandleEdit"
      :Product="Product" />
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import newProduct from './newProduct.vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
const route = useRoute();
const Product = ref(null);

async function fetch() {
  await axios
    .get(`http://localhost:8080/api/products/${route.params.id}`)
    .then(function (response) {
      Product.value = response.data;
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
