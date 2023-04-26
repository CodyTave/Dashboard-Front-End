<template>
  <div class="flex items-center justify-center h-full fadeInBlur">
    <div v-if="isLoading">
      <Loading :fullScreen="true" />
    </div>
    <div
      v-else
      class="flex flex-col gap-5 mx-auto fadeInBlur">
      <input
        @input="
          () => {
            erroLog = false;
          }
        "
        v-model.lazy="nom"
        class="h-10"
        placeholder="Category Name" />
      <textarea
        @input="
          () => {
            erroLog = false;
          }
        "
        v-model.lazy="description"
        class=""
        placeholder="Category Description" />
      <div
        class="text-light-2 font-semibold Notif"
        v-if="erroLog">
        Complete All the Form inputs !
      </div>
    </div>
  </div>
  <div class="absolute bottom-0 right-0 mb-5 mr-10 fadeInBlur">
    <button
      @click="Cancel"
      class="font-light text-sm text-light-1 hover:text-light-3">
      Cancel
    </button>

    <button
      @click="HandleSubmit"
      class="bg-light-1 text-dark-0 hover:text-light-0 hover:bg-dark-4">
      Save
    </button>
  </div>
</template>

<script setup>
import Loading from '../components/Loading.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
const isLoading = ref(false);
const router = useRouter();
const erroLog = ref(false);
const nom = ref('');
const description = ref('');
function Cancel() {
  router.go(-1);
}
if (props.Edit) {
  nom.value = props.Category.nom;
  description.value = props.Category.description;
}
async function HandleSubmit() {
  if ((nom.value === '') | (description.value === '')) {
    erroLog.value = true;
    return;
  }
  if (props.Edit) {
    if (
      nom.value === props.Category.nom &&
      description.value === props.Category.description
    ) {
      router.push('/Categories');
      return;
    }
    const editCategory = new FormData();
    editCategory.append('nom', nom.value);
    editCategory.append('description', description.value);
    isLoading.value = true;
    await axios
      .patch(
        `http://localhost:8080/api/categories/${props.Category.id}`,
        editCategory
      )
      .then((result) => {
        isLoading.value = false;
        router.push('/Categories');
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });

    return;
  }
  const newCategory = new FormData();
  newCategory.append('nom', nom.value);
  newCategory.append('description', description.value);
  isLoading.value = true;

  await axios
    .post('http://localhost:8080/api/categories', newCategory)
    .then((result) => {
      router.push('/Categories');
      isLoading.value = false;
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
}
const props = defineProps({
  Edit: {
    type: Boolean,
    required: false,
    default: false,
  },
  HandleEdit: {
    type: Function,
    required: false,
  },
  Category: {
    type: Object,
    required: false,
  },
});
</script>
<style scoped>
input,
textarea {
  background-color: rgb(23 23 23 / var(--tw-bg-opacity));
  width: 500px;
  border-radius: 20px;
  padding-top: 1.5rem /* 24px */;
  padding-bottom: 1.5rem /* 24px */;
  padding: 1.25rem /* 20px */;
  resize: none;
}
input,
textarea:focus {
  outline: none;
}
</style>
