<template>
  <Teleport to="body">
    <div
      v-if="open"
      @click="toggle(false)"
      class="bg-dark-1 w-screen h-screen fixed top-0 left-0 opacity-60"></div>
    <div
      v-if="open"
      class="modal bg-dark-3 rounded-2xl text-light-0 flex justify-center flex-col gap-5 py-12 px-10 fadeInBlur">
      <p class="font-bold text-xl">
        Are you Sure you want to <span class="text-red-0">Delete</span> this
        item!
      </p>
      <p class="text-light-2">
        Type <i class="text-light-1">delete </i> to confirm
      </p>
      <input
        @input="update"
        v-model.lazy="checkToken"
        class="bg-dark-0 h-8 focus:outline-none px-3" />
      <div
        class="text-light-2 font-semibold"
        v-if="erroLog">
        Input Not matched !
      </div>
      <div class="place-self-end">
        <button
          class="font-light text-sm text-light-1 hover:text-light-3"
          @click="toggle(false)">
          Cancel
        </button>
        <button
          class="bg-red-0 text-light-1 hover:text-dark-0 hover:bg-light-0"
          @click="Check">
          Delete
        </button>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { ref } from 'vue';

const checkToken = ref('');
const erroLog = ref(false);
function Check() {
  if (checkToken.value === 'delete') {
    props.validateDelete();
  } else {
    erroLog.value = true;
  }
}
function update() {
  erroLog.value = false;
}
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
  toggle: {
    type: Function,
    required: true,
  },
  validateDelete: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
}
</style>
