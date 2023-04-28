<template>
  <div
    v-if="Nav && NavwImg"
    class="fadeInBlur">
    <div
      class="text-dark-2 rounded-lg text-left border-dark-3 border-b-[1px] select-none grid md:grid-cols-5 mt-5 md:gap-5 transition-all">
      <div class="hidden md:grid"></div>
      <div
        :class="`grid ${
          searchToggle ? 'grid-cols-1' : 'grid-cols-2'
        } md:grid-cols-4 sm:grid-cols-3 gap-x-10 gap-y-5 p-2 pan col-span-4  ${
          searchToggle ? 'md:ml-16' : 'ml-16'
        } transition-all`">
        <div
          class="grid md:col-span-3 sm:col-span-2 md:grid-cols-3 sm:grid-cols-2 fadeInBlur gap-x-10"
          v-if="!searchToggle">
          <div class="sm:truncate whitespace-nowrap">Product</div>
          <div class="truncate hidden sm:block">Slug</div>
          <div class="truncate hidden md:block">Created</div>
        </div>
        <input
          @input="emitInput"
          ref="inputElement"
          v-if="searchToggle"
          class="md:col-span-3 sm:col-span-2 text-light-0 px-2 py-1 fadeInBlur" />
        <div
          @click="
            () => {
              if (searchToggle === true) {
                emptyQuery();
              }

              searchToggle = !searchToggle;
            }
          "
          :class="`cursor-pointer mx-auto `">
          <img
            v-if="searchToggle"
            class="w-4 transition-all fadeInBlur"
            :src="cancel" />
          <img
            v-else
            class="w-4 transition-all fadeInBlur"
            :src="search" />
        </div>
      </div>
    </div>
  </div>
  <div
    v-else-if="Nav"
    class="text-dark-2 border-dark-3 border-b-[1px] text-left fadeInBlur">
    <div
      :class="`grid ${
        searchToggle ? 'grid-cols-1' : 'grid-cols-2'
      }  md:grid-cols-5 sm:grid-cols-3 gap-x-10 gap-y-5 mt-5 p-2 ${
        searchToggle ? '' : 'ml-5 sm:ml-16'
      }   `">
      <div
        v-if="searchToggle"
        class="md:col-span-4 sm:col-span-2">
        <input
          ref="inputElement"
          @input="emitInput"
          v-if="searchToggle"
          class="md:col-span-3 sm:col-span-2 text-light-0 px-2 py-1 fadeInBlur w-full" />
      </div>
      <div
        v-else
        v-for="item in NavItems"
        :class="`${item.hideMid ? 'hidden md:grid' : ''} ${
          item.hideSm ? 'hidden sm:grid' : ''
        } fadeInBlur`">
        {{ item.title }}
      </div>
      <div
        @click="
          () => {
            if (searchToggle === true) {
              emptyQuery();
            }
            searchToggle = !searchToggle;
          }
        "
        :class="`cursor-pointer mx-auto
         my-auto `">
        <img
          v-if="searchToggle"
          class="w-4 transition-all fadeInBlur"
          :src="cancel" />
        <img
          v-else
          class="w-4 transition-all fadeInBlur"
          :src="search" />
      </div>
    </div>
  </div>
  <div v-else-if="NavwImg">
    <div
      @click="
        () => {
          setToggle(PanelData.id);
        }
      "
      class="text-light-1 bg-dark-4 rounded-lg text-left cursor-pointer select-none grid md:grid-cols-5 mt-5 md:gap-5">
      <div
        class="bg-light-3 rounded-lg hidden md:grid drop-shadow-[10px_0px_3px_rgba(0,0,0,0.1)]">
        <img
          class="object-cover w-full h-10 rounded-lg"
          :src="PanelData.image || productSample" />
      </div>

      <div
        class="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-10 p-2 pan col-span-4 ml-16">
        <div class="sm:truncate whitespace-nowrap">{{ PanelData.nom }}</div>
        <div class="truncate hidden sm:block">{{ PanelData.slug }}</div>
        <div class="truncate hidden md:block">
          {{ PanelData.date_creation }}
        </div>
        <div class="flex mx-auto">
          <img
            class="w-[10px]"
            :src="drop" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div
      @click="
        () => {
          setToggle(PanelData.id);
        }
      "
      class="text-light-1 bg-dark-4 rounded-lg text-left cursor-pointer select-none">
      <div
        class="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-10 mt-5 p-2 ml-5 sm:ml-16 pan">
        <div class="sm:truncate whitespace-nowrap">{{ PanelData.nom }}</div>
        <div class="truncate hidden sm:block">{{ PanelData.slug }}</div>
        <div class="truncate hidden md:block">
          {{ PanelData.date_creation }}
        </div>
        <div
          v-if="PanelData.deleted"
          class="truncate hidden md:block">
          <div class="truncate">
            {{ PanelData.date_deleted }}
          </div>
        </div>
        <div
          v-else
          class="truncate hidden md:block">
          <div
            v-if="PanelData.date_modification"
            class="truncate">
            {{ PanelData.date_modification }}
          </div>
          <div v-else>Never</div>
        </div>
        <div class="flex mx-auto">
          <img
            class="w-[10px]"
            :src="drop" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { search, drop, productSample, cancel } from '../assets';
import { ref, watchEffect, nextTick } from 'vue';
const emits = defineEmits(['input']);
const inputElement = ref(null);

function emitInput(event) {
  emits('input', event.target.value);
}
function emptyQuery() {
  emits('input', '');
}
watchEffect(() => {
  if (props.searchToggle) {
    nextTick(() => {
      inputElement.value.focus();
    });
  }
});

const props = defineProps({
  PanelData: {
    type: Object,
    required: false,
    default: {},
  },
  NavItems: {
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
  searchToggle: {
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
input {
  background-color: rgb(23 23 23 / var(--tw-bg-opacity));
  border-radius: 5px;
}
input:focus {
  outline: none;
}
</style>
