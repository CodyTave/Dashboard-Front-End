<template>
  <div>
    <div>
      <div v-if="isLoading">
        <Loading :fullScreen="true" />
      </div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 m-10 fadeInBlur">
          <div>
            <div
              @mouseenter="HoveredImage = true"
              @mouseleave="HoveredImage = false"
              :class="`bg-dark-3 rounded-[20px] w-full ${
                imageUrl ? 'hover:h-[300px]' : ''
              } h-52 flex items-center justify-center transition-all hover:transition-all`">
              <div
                v-if="imageUrl"
                class="w-full h-full relative">
                <img
                  :src="imageUrl"
                  class="rounded-[20px] object-cover w-full h-full"
                  alt="Uploaded Image" />
                <div
                  v-if="HoveredImage"
                  class="onPic fadeInBlur">
                  <button
                    class="border border-light-1 hover:bg-light-0 hover:text-dark-1"
                    @click="openFileDialog">
                    Change Image
                  </button>
                  <button
                    v-if="!Edit"
                    class="font-light text-sm hover:text-red-0"
                    @click="
                      () => {
                        imageUrl = '';
                        fileInputRef = null;
                        fileChanged = true;
                      }
                    ">
                    Remove
                  </button>
                </div>
                <div
                  v-if="HoveredImage && imageUrl"
                  :class="`Overlay bg-black w-full h-full rounded-[20px] blur-md transition-all
                    opacity-40`" />
              </div>
              <button
                v-if="!imageUrl"
                class=""
                @click="openFileDialog">
                Upload Image
              </button>
              <input
                type="file"
                ref="fileInputRef"
                accept="image/*"
                style="display: none"
                @change="handleFileUpload" />
            </div>
          </div>
          <div class="grid gap-5">
            <input
              @input="
                () => {
                  erroLog = false;
                }
              "
              v-model.lazy="nom"
              class="h-10"
              placeholder="Product Name" />
            <select
              v-model.lazy="category"
              class="text-sm block text-light-2 h-12">
              <option
                value=""
                selected
                disabled>
                Choose a Category
              </option>
              <option
                v-for="item in categoriesItems"
                :value="item.id">
                {{ item.nom }}
              </option>
            </select>
            <textarea
              @input="
                () => {
                  erroLog = false;
                }
              "
              v-model.lazy="description"
              class=""
              placeholder="Product Description" />
          </div>
          <div
            class="text-light-2 font-semibold Notif"
            v-if="erroLog">
            Complete All the Form inputs !
          </div>
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
  </div>
</template>

<script setup>
import Loading from '../components/Loading.vue';
import { useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';
import axios from 'axios';
const isLoading = ref(false);
const router = useRouter();
const erroLog = ref(false);
const categoriesItems = ref(null);
const nom = ref(null);
const category = ref('');
const description = ref(null);
const imageUrl = ref('');
const fileChanged = ref(false);
if (props.Edit) {
  nom.value = props.Product.nom;
  category.value = props.Product.category.id;
  description.value = props.Product.description;
  imageUrl.value = props.Product.image;
}
const fileInputRef = ref(null);
const HoveredImage = ref(false);
function Cancel() {
  router.go(-1);
}

const openFileDialog = () => {
  fileInputRef.value.click();
  HoveredImage.value = false;
};
const handleFileUpload = () => {
  fileChanged.value = true;
  const file = fileInputRef.value.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    imageUrl.value = reader.result;
  };

  reader.readAsDataURL(file);
};

async function HandleSubmit() {
  if (
    (nom.value === '') |
    (description.value === '') |
    (category.value === '')
  ) {
    erroLog.value = true;
    return;
  }
  if (props.Edit) {
    if (
      nom.value === props.Product.nom &&
      description.value === props.Product.description &&
      category.value === props.Product.category.id &&
      fileChanged.value === false
    ) {
      router.push('/Products');
      return;
    }
    const editProduct = new FormData();
    editProduct.append('nom', nom.value);
    editProduct.append('description', description.value);
    editProduct.append('category', category.value);
    editProduct.append('file', fileInputRef.value.files[0]);
    isLoading.value = true;
    await axios
      .patch(
        `http://localhost:8080/api/products/${props.Product.id}`,
        editProduct
      )
      .then((result) => {
        isLoading.value = false;
        router.push('/Products');
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });

    return;
  }
  const newProduct = new FormData();
  newProduct.append('nom', nom.value);
  newProduct.append('description', description.value);
  newProduct.append('category', category.value);
  newProduct.append('file', fileInputRef.value.files[0]);
  isLoading.value = true;

  await axios
    .post('http://localhost:8080/api/products', newProduct)
    .then((result) => {
      router.push('/Products');
      isLoading.value = false;
      console.log(result);
    })
    .catch((e) => {
      console.log(e);
    });
}
async function fetch() {
  await axios
    .get(`http://localhost:8080/api/categories`)
    .then(function (response) {
      categoriesItems.value = [...response.data];
    })
    .catch((e) => {
      console.log(e);
    });
}
watchEffect(() => fetch(), []);

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
  Product: {
    type: Object,
    required: false,
  },
});
</script>
<style scoped>
input,
textarea {
  background-color: rgb(23 23 23 / var(--tw-bg-opacity));
  border-radius: 20px;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  padding: 1.25rem;
  resize: none;
}
option,
select {
  background-color: rgb(23 23 23 / var(--tw-bg-opacity));
  border-radius: 20px;
  padding: 12px;
}
input,
textarea,
select,
option:focus {
  outline: none;
}
.onPic {
  position: absolute;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.Overlay {
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
