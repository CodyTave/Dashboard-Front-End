<template>
  <Transition
    v-if="Product"
    name="page"
    tag="div"
    class="grid grid-cols-1 sm:grid-cols-2 gap-10 mx-14 my-10 fadeInBlur"
  >
    <div>
      <div
        class="bg-dark-3 rounded-[20px] md:mr-5 hover:h-[300px] h-52 transition-all hover:transition-all"
      >
        <img
          class="rounded-[20px] object-cover w-full h-full"
          :src="Product.image ? Product.image : productSample"
          alt="Product Image"
        />
      </div>
      <div class="flex flex-col gap-5 my-auto">
        <div class="lg:flex gap-3">
          <h1 title="Product Name" class="text-xl font-semibold text-light-0">
            {{ Product.nom }}
          </h1>
          <p title="Slug" class="text-base my-auto text-light-3">
            {{ Product.slug }}
          </p>
        </div>
        <h2 class="font-semibold text-base text-light-1">Description :</h2>
        <p title="Description" class="text-light-2">
          {{ Product.description }}
        </p>
        <div class="flex flex-col sm:flex-row gap-5">
          <h2 class="font-semibold text-base text-light-1">Date Created :</h2>
          <p title="date_creation" class="text-light-2 font-semibold">
            {{ Product.date_creation }}
          </p>
        </div>
        <div
          v-if="Product.date_modification"
          class="flex flex-col sm:flex-row gap-5"
        >
          <h2 class="font-semibold text-base text-light-1">Date Edited :</h2>
          <p title="date_modification" class="text-light-2 font-semibold">
            {{ Product.date_modification }}
          </p>
        </div>
      </div>
    </div>
  </Transition>
  <div v-else>
    <Loading :fullScreen="true" />
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, watch, Transition, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Loading from "../components/Loading.vue";
import { productSample } from "../assets";
const route = useRoute();
const Product = ref(null);
const isLoading = ref(true);
async function fetch() {
  await axios
    .get(`http://192.168.1.12:8080/api/products/${route.params.id}`)
    .then(function (response) {
      Product.value = response.data;
    })
    .catch(() => {
      isLoading.value = false;
    });
}
watchEffect(() => fetch(), [route.params.id]);
watchEffect(() => fetch(), []);
</script>
