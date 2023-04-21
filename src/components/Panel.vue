<template>
  <div
    v-if="Nav"
    class="text-dark-2 border-dark-3 border-b-[1px] text-left">
    <div
      :class="`grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-10 mt-5 p-2 ml-5 sm:ml-16`">
      <div
        v-for="item in categoriesNav"
        :class="`${item.hide ? 'hidden md:grid' : ''} ${
          item.hidee ? 'hidden sm:grid' : ''
        }`">
        {{ item.title }}
      </div>
      <li class="flex cursor-pointer mx-auto">
        <img
          class="w-4"
          :src="search" />
      </li>
    </div>
  </div>
  <div v-else>
    <div
      @click="setToggle"
      class="text-light-1 bg-dark-4 rounded-lg text-left cursor-pointer select-none">
      <div
        class="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-10 mt-5 p-2 ml-5 sm:ml-16 pan">
        <div class="sm:truncate whitespace-nowrap">{{ PanelData.nom }}</div>
        <div class="truncate hidden sm:grid">{{ PanelData.slug }}</div>
        <div class="truncate hidden md:grid">{{ PanelData.date_creation }}</div>
        <div class="truncate hidden md:grid">{{ PanelData.date_creation }}</div>
        <div class="flex mx-auto">
          <img
            class="w-[10px]"
            :src="drop" />
        </div>
      </div>
    </div>
    <div
      v-if="optionToggle"
      class="flex mt-3 justify-center sm:justify-end gap-5 select-none">
      <button class="bg-light-1 text-dark-0 hover:text-light-0 hover:bg-dark-1">
        Edit
      </button>
      <button
        @click="Delete(PanelData)"
        class="bg-red-0 text-light-1 hover:text-dark-0 hover:bg-light-0">
        Delete
      </button>
    </div>
  </div>
</template>

<script setup>
import { categoriesNav } from '../Constants/constants';
import { search, drop } from '../assets';
import axios from 'axios';
import { ref } from 'vue';
const props = defineProps({
  PanelData: {
    type: Object,
    required: false,
  },
  Nav: {
    type: Boolean,
    required: false,
    default: false,
  },
  Delete: {
    type: Function,
    required: false,
  },
});
const optionToggle = ref(false);
function setToggle() {
  optionToggle.value = !optionToggle.value;
}
</script>
<style scoped>
.pan div {
  margin-top: auto;
  margin-bottom: auto;
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
