<template>
  <div v-if="Nav && NavwImg" class="fadeInBlur">
    <div
      @click="setToggle(PanelData.id)"
      class="text-dark-2 rounded-lg text-left border-dark-3 border-b-[1px] select-none grid md:grid-cols-5 mt-5 md:gap-5"
    >
      <div class="hidden md:grid"></div>

      <div
        class="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-10 p-2 pan col-span-4 ml-16"
      >
        <div class="sm:truncate whitespace-nowrap">Product</div>
        <div class="truncate hidden sm:grid">Slug</div>
        <div class="truncate hidden md:grid">Created</div>
        <div class="cursor-pointer mx-auto">
          <img class="w-4" :src="search" />
        </div>
      </div>
    </div>
  </div>
  <div
    v-else-if="Nav"
    class="text-dark-2 border-dark-3 border-b-[1px] text-left fadeInBlur"
  >
    <div
      :class="`grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-10 mt-5 p-2 ml-5 sm:ml-16`"
    >
      <div
        v-for="item in categoriesNav"
        :class="`${item.hide ? 'hidden md:grid' : ''} ${
          item.hidee ? 'hidden sm:grid' : ''
        }`"
      >
        {{ item.title }}
      </div>
      <div class="cursor-pointer mx-auto">
        <img class="w-4" :src="search" />
      </div>
    </div>
  </div>
  <div v-else-if="PanelData.image !== undefined">
    <div
      @click="setToggle(PanelData.id)"
      class="text-light-1 bg-dark-4 rounded-lg text-left cursor-pointer select-none grid md:grid-cols-5 mt-5 md:gap-5"
    >
      <div
        class="bg-light-3 rounded-lg hidden md:grid drop-shadow-[10px_0px_3px_rgba(0,0,0,0.1)]"
      >
        <img
          class="object-cover w-full h-10 rounded-lg"
          :src="PanelData.image || productSample"
        />
      </div>

      <div
        class="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-10 p-2 pan col-span-4 ml-16"
      >
        <div class="sm:truncate whitespace-nowrap">{{ PanelData.nom }}</div>
        <div class="truncate hidden sm:grid">{{ PanelData.slug }}</div>
        <div class="truncate hidden md:grid">{{ PanelData.date_creation }}</div>
        <div class="flex mx-auto">
          <img class="w-[10px]" :src="drop" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div
      @click="setToggle(PanelData.id)"
      class="text-light-1 bg-dark-4 rounded-lg text-left cursor-pointer select-none"
    >
      <div
        class="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-10 mt-5 p-2 ml-5 sm:ml-16 pan"
      >
        <div class="sm:truncate whitespace-nowrap">{{ PanelData.nom }}</div>
        <div class="truncate hidden sm:grid">{{ PanelData.slug }}</div>
        <div class="truncate hidden md:grid">{{ PanelData.date_creation }}</div>
        <div class="hidden md:grid">
          <div v-if="PanelData.date_modification" class="truncate">
            {{ PanelData.date_modification }}
          </div>
          <div v-else>Never</div>
        </div>
        <div class="flex mx-auto">
          <img class="w-[10px]" :src="drop" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { categoriesNav } from "../Constants/constants";
import { search, drop, productSample } from "../assets";
const props = defineProps({
  PanelData: {
    type: Object,
    required: false,
    default: {},
  },
  index: {
    type: Number,
    required: false,
  },
  Nav: {
    type: Boolean,
    required: false,
    default: false,
  },
  NavwImg: {
    type: Boolean,
    required: false,
    default: false,
  },
  Delete: {
    type: Function,
    required: false,
  },
  setToggle: {
    type: Function,
    required: false,
  },
});
</script>
<style scoped>
.pan div {
  margin-top: auto;
  margin-bottom: auto;
}
</style>
