<template>
  <div class="overflow-auto h-[70vh]">
    <div class="sm:mx-20 mx-5 transition-all my-5">
      <Panel
        :Nav="true"
        :Nav-items="TrashNav" />
      <TransitionGroup
        name="list"
        tag="div">
        <div
          v-for="(doc, index) in dataDisplay"
          :key="doc.id">
          <Panel
            :PanelData="doc"
            :index="index"
            :Delete="Delete"
            :setToggle="setToggle" />
          <div
            v-if="optionToggle && openedPanel == doc.id"
            class="flex mt-3 justify-center sm:justify-end gap-5 select-none fadeInBlur">
            <RouterLink
              :to="`/${doc.category ? 'products' : 'categories'}/${doc.id}`">
              <button
                class="bg-light-1 text-dark-0 hover:text-light-0 hover:bg-dark-4">
                Open
              </button>
            </RouterLink>
            <button
              @click="Restore(doc)"
              class="bg-light-1 text-dark-0 hover:text-light-0 hover:bg-dark-4">
              Restore
            </button>
            <button
              @click="Delete(doc)"
              class="bg-red-0 text-light-1 hover:text-dark-0 hover:bg-light-0">
              Delete
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div>
      <Modal
        :open="openModal"
        :toggle="Toggle"
        :validateDelete="validateDelete" />
    </div>
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-if="errorLog">
      <Error log="Something Went Wrong, Try Again Later..." />
    </div>
  </div>
</template>

<script setup>
import Panel from '../components/Panel.vue';
import Modal from '../components/Modal.vue';
import Loading from '../components/Loading.vue';
import Error from '../components/Error.vue';
import axios from 'axios';
import { TrashNav } from '../Constants/constants';
import { ref, TransitionGroup, watch, watchEffect } from 'vue';
const optionToggle = ref(false);
const openedPanel = ref(null);
const dataDisplay = ref([]);
const isLoading = ref(true);
const errorLog = ref(false);
const openModal = ref(false);
const docTodelete = ref(null);
function setToggle(id) {
  if (openedPanel.value !== id && optionToggle) {
    optionToggle.value = false;
    openedPanel.value = id;
    optionToggle.value = true;
  } else {
    openedPanel.value = id;
    optionToggle.value = !optionToggle.value;
  }
}
watchEffect(() => fetch(), []);
function Toggle(option) {
  openModal.value = option;
}
async function fetch() {
  try {
    const productsResponse = await axios.get(
      `http://localhost:8080/api/products/Trash`
    );
    const categoriesResponse = await axios.get(
      `http://localhost:8080/api/categories/Trash`
    );

    const products = productsResponse.data;
    const categories = categoriesResponse.data;

    const mergedArray = [...products, ...categories];

    mergedArray.sort((a, b) => {
      return new Date(b.date_deleted) - new Date(a.date_deleted);
    });
    dataDisplay.value = mergedArray;
    isLoading.value = false;
  } catch (error) {
    errorLog.value = true;
  }
}
async function Restore(doc) {
  const Entity = doc.category ? 'products' : 'categories';
  axios
    .patch(`http://localhost:8080/api/${Entity}/${doc.id}`, {
      deleted: false,
    })
    .then((response) => {
      fetch();
      console.log(response.data);
    })
    .catch((error) => {
      errorLog.value = true;
    });
}
async function Delete(doc) {
  docTodelete.value = doc;
  setToggle();
  Toggle(true);
}
async function validateDelete() {
  const Entity = docTodelete.value.category ? 'products' : 'categories';
  await axios
    .delete(`http://localhost:8080/api/${Entity}/${docTodelete.value.id}`)
    .then(function (response) {
      Toggle(false);
      fetch();
    })
    .catch(() => {
      errorLog.value = true;
    });
}
</script>
