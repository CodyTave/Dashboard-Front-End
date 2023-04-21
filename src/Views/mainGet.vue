<template>
  <div>
    <div class="sm:mx-20 mx-5 transition-all my-5">
      <Panel :Nav="true" />
      <TransitionGroup
        name="list"
        tag="div">
        <Panel
          v-for="(doc, index) in dataDisplay"
          :PanelData="doc"
          :key="index" />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import Panel from '../components/Panel.vue';
import axios from 'axios';
import { ref } from 'vue';
import { TransitionGroup } from 'vue';
const dataDisplay = ref([]);
async function fetch() {
  await axios
    .get('http://localhost:8080/api/products')
    .then(function (response) {
      dataDisplay.value = [
        ...response.data,
        ...response.data,
        ...response.data,
      ];
    });
}
fetch();
</script>
<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
