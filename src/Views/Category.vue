<template>
  <Transition
    v-if="Category"
    class="flex flex-col gap-5 mx-14 my-10 fadeInBlur"
    name="page"
    tag="div">
    <div>
      <div class="flex gap-3">
        <h1
          title="Category Name"
          class="text-xl font-semibold text-light-0">
          {{ Category.nom }}
        </h1>
        <p
          title="Slug"
          class="text-base my-auto text-light-3">
          {{ Category.slug }}
        </p>
      </div>
      <h2 class="font-semibold text-base text-light-1">Description :</h2>
      <p
        title="Description"
        class="text-light-2">
        {{ Category.description }}
      </p>
      <div class="flex gap-5">
        <h2 class="font-semibold text-base text-light-1">Date Created :</h2>
        <p
          title="date_creation"
          class="text-light-2 font-semibold">
          {{ Category.date_creation }}
        </p>
      </div>
      <div
        v-if="Category.date_modification"
        class="flex gap-5">
        <h2 class="font-semibold text-base text-light-1">Date Created :</h2>
        <p
          title="date_modification"
          class="text-light-2 font-semibold">
          {{ Category.date_modification }}
        </p>
      </div>
      <div
        v-if="Category.deleted"
        class="flex flex-col sm:flex-row gap-5">
        <h2 class="font-semibold text-base text-red-0">Date Deleted :</h2>
        <p
          title="date_deletion"
          class="text-light-2 font-semibold">
          {{ Category.date_deleted }}
        </p>
      </div>
    </div>
  </Transition>
  <div v-else>
    <Loading :fullScreen="true" />
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, watch, Transition, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '../components/Loading.vue';
const route = useRoute();
const Category = ref(null);
const isLoading = ref(true);
console.log(Category.deleted);

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
watchEffect(() => fetch(), [route.params.id]);
watchEffect(() => fetch(), []);
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  filter: blur(5px);
  opacity: 0;
}
</style>
