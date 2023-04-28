<template>
  <div
    v-if="Category"
    class="absolute bottom-0 left-0 w-full bg-dark-1 z-50">
    <div class="flex gap-5 sm:mr-5 p-3 items-end justify-end">
      <button
        @click="exportPDF"
        class="bg-light-1 text-dark-0 hover:text-light-0 hover:bg-dark-4">
        Export PDF
      </button>
    </div>
  </div>
  <div
    v-if="Category"
    class="overflow-auto h-[70vh]">
    <Transition
      class="flex flex-col gap-5 mx-14 my-10 fadeInBlur"
      name="page"
      tag="div">
      <div ref="pdfElement">
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
          <h2 class="font-semibold text-base text-light-1">Date Edited :</h2>
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
  </div>
  <notFound v-else-if="isLoading === false" />
  <div v-if="isLoading">
    <Loading :fullScreen="true" />
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, Transition, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '../components/Loading.vue';
import notFound from '../components/notFound.vue';

import jsPDF from 'jspdf';
const route = useRoute();
const Category = ref(null);
const isLoading = ref(true);
const pdfElement = ref(null);
function exportPDF() {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#171717');
  doc.text(`${Category.value.nom} `, 15, 20);
  doc.setFontSize(10);
  doc.setTextColor('#727070');
  doc.text(`${Category.value.slug}`, 15, 27);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#171717');
  doc.text('Description :', 15, 35);
  doc.setFont('helvetica', 'normal');
  doc.text(`${Category.value.description}`, 15, 45);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor('#C2C2C2');
  doc.text(`Date Created : ${Category.value.date_creation} `, 15, 55);
  if (Category.value.date_modification) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor('#C2C2C2');
    doc.text(`Date Edited : ${Category.value.date_modification} `, 15, 65);
  }
  doc.save(`${Category.value.nom}.pdf`);
}

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
