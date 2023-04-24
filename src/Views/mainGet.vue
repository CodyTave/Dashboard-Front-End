<template>
  <div>
    <div class="sm:mx-20 mx-5 transition-all my-5">
      <Panel :Nav="true" :NavwImg="Entity === 'products' ? true : false" />
      <TransitionGroup name="list" tag="div">
        <div v-for="(doc, index) in dataDisplay" :key="doc.id">
          <Panel
            :PanelData="doc"
            :index="index"
            :Delete="Delete"
            :setToggle="setToggle"
          />
          <div
            v-if="optionToggle && openedPanel == doc.id"
            class="flex mt-3 justify-center sm:justify-end gap-5 select-none fadeInBlur"
          >
            <RouterLink :to="`/${Entity}/${doc.id}`">
              <button
                class="bg-light-1 text-dark-0 hover:text-light-0 hover:bg-dark-4"
              >
                Open
              </button>
            </RouterLink>
            <button
              class="bg-light-1 text-dark-0 hover:text-light-0 hover:bg-dark-4"
            >
              Edit
            </button>
            <button
              @click="Delete(doc.id)"
              class="bg-red-0 text-light-1 hover:text-dark-0 hover:bg-light-0"
            >
              Delete
            </button>
          </div>
        </div>
      </TransitionGroup>
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
import Panel from "../components/Panel.vue";
import axios from "axios";
import { ref, TransitionGroup, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";

const optionToggle = ref(false);
const openedPanel = ref(null);
const route = useRoute();
const dataDisplay = ref([]);
const isLoading = ref(true);
const errorLog = ref(false);
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
const props = defineProps({
  Entity: {
    type: String,
    required: true,
  },
});

async function fetch() {
  await axios
    .get(`http://192.168.1.12:8080/api/${props.Entity}`)
    .then(function (response) {
      dataDisplay.value = [...response.data];
      isLoading.value = false;
    })
    .catch(() => {
      errorLog.value = true;
    });
}
async function Delete(id) {
  await axios
    .patch(`http://192.168.1.12:8080/api/${props.Entity}/Delete/${id}`)
    .then(function (response) {
      fetch();
    });
  // dataDisplay.value.splice(id, 1);
}

watchEffect(() => fetch(), []);
watch(
  () => route.name,
  () => {
    dataDisplay.value = null;
    isLoading.value = true;
    fetch();
    setToggle();
  }
);
</script>
<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
  width: 63%;
}
button {
  padding: 0.25rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all;
}
button:hover {
  transition: all;
}
</style>
