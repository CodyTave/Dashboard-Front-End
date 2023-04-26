import { createRouter, createWebHistory } from 'vue-router';
import mainGet from '../Views/mainGet.vue';
import Product from '../Views/Product.vue';
import Category from '../Views/Category.vue';
import notFound from '../components/notFound.vue';
import newCategory from '../Views/newCategory.vue';
import newProduct from '../Views/newProduct.vue';
import editProduct from '../Views/editProduct.vue';
import editCategory from '../Views/editCategory.vue';
import Trash from '../Views/Trash.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'products' },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: notFound },
    {
      path: '/Products',
      name: 'products',
      component: mainGet,
      props: {
        Entity: 'products',
      },
    },
    {
      path: '/Products/:id',
      component: Product,
      props: true,
    },
    {
      path: '/Products/:id/Edit',
      component: editProduct,
      props: true,
    },
    {
      path: '/Products/New',
      component: newProduct,
    },
    {
      path: '/Categories',
      name: 'categories',
      component: mainGet,
      props: {
        Entity: 'categories',
      },
    },
    {
      path: '/Categories/:id',
      component: Category,
      props: true,
    },
    {
      path: '/Categories/:id/Edit',
      component: editCategory,
      props: true,
    },
    {
      path: '/Categories/New',
      component: newCategory,
    },
    {
      path: '/Trash',
      name: 'trash',
      component: Trash,
      props: {
        Entity: 'trash',
      },
    },
  ],
});

export default router;
