<template>
  <div
    v-if="Product"
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
    class="overflow-auto h-[70vh]"
    v-if="Product">
    <Transition
      name="page"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 gap-10 mx-14 my-10 fadeInBlur mb-16">
      <div id="export-pdf">
        <div
          class="rounded-[20px] md:mr-5 hover:h-[300px] h-56 transition-all hover:transition-all">
          <img
            class="rounded-[20px] object-cover w-full h-full"
            :src="Product.image ? Product.image : productSample"
            alt="Product Image" />
        </div>
        <div class="flex flex-col gap-5 my-auto">
          <div class="lg:flex gap-3">
            <h1
              title="Product Name"
              class="text-xl font-semibold text-light-0">
              {{ Product.nom }}
            </h1>
            <p
              title="Slug"
              class="text-base my-auto text-light-3">
              {{ Product.slug }}
            </p>
          </div>
          <h2 class="font-semibold text-base text-light-3">
            {{ Product.category.nom }}
          </h2>
          <h2 class="font-semibold text-base text-light-1">Description :</h2>
          <p
            title="Description"
            class="text-light-2">
            {{ Product.description }}
          </p>
          <div class="flex flex-col sm:flex-row gap-5">
            <h2 class="font-semibold text-base text-light-1">Date Created :</h2>
            <p
              title="date_creation"
              class="text-light-2 font-semibold">
              {{ Product.date_creation }}
            </p>
          </div>
          <div
            v-if="Product.date_modification"
            class="flex flex-col sm:flex-row gap-5">
            <h2 class="font-semibold text-base text-light-1">Date Edited :</h2>
            <p
              title="date_modification"
              class="text-light-2 font-semibold">
              {{ Product.date_modification }}
            </p>
          </div>
          <div
            v-if="Product.deleted"
            class="flex flex-col sm:flex-row gap-5">
            <h2 class="font-semibold text-base text-red-0">Date Deleted :</h2>
            <p
              title="date_deletion"
              class="text-light-2 font-semibold">
              {{ Product.date_deleted }}
            </p>
          </div>
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
import { productSample } from '../assets';
import jsPDF from 'jspdf';
const route = useRoute();
const Product = ref(null);
const isLoading = ref(true);
function exportPDF() {
  const doc = new jsPDF();
  let pdfHeight = 0;

  if (Product.value.image) {
    const imgData = Product.value.image;
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  }

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#171717');
  doc.text(`${Product.value.nom} `, 15, pdfHeight + 20);
  doc.setFontSize(10);
  doc.setTextColor('#727070');
  doc.text(`${Product.value.slug}`, 15, pdfHeight + 27);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor('#171717');
  doc.text('Description :', 15, pdfHeight + 35);
  doc.setFont('helvetica', 'normal');
  doc.text(`${Product.value.description}`, 15, pdfHeight + 45);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor('#C2C2C2');
  doc.text(
    `Date Created : ${Product.value.date_creation} `,
    15,
    pdfHeight + 55
  );
  if (Product.value.date_modification) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor('#C2C2C2');
    doc.text(
      `Date Edited : ${Product.value.date_modification} `,
      15,
      pdfHeight + 65
    );
  }

  doc.save(`${Product.value.nom}.pdf`);
}
async function fetch() {
  await axios
    .get(`http://localhost:8080/api/products/${route.params.id}`)
    .then(function (response) {
      Product.value = response.data;
    })
    .catch((e) => {
      console.log(e);
      isLoading.value = false;
    });
}
watchEffect(() => fetch(), [route.params.id]);
watchEffect(() => fetch(), []);
</script>
