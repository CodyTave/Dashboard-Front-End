import { createRouter, createWebHistory } from 'vue-router'
import mainGet from '../Views/mainGet.vue'
import Product from '../Views/Product.vue'
import Category from '../Views/Category.vue'
import notFound from '../components/notFound.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: mainGet,
      props:{
        Entity:"products"
      },
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: notFound },
    {
      path: '/Products',
      name: 'products',
      component: mainGet,
      props:{
        Entity:"products"
      },
    },
    {
      path: '/Products/:id',
      component: Product,
      props: true
    },
    {
      path: '/Categories',
      name: 'categories',
      component: mainGet,
      props:{
        Entity:"categories"
      }
    },
    {
      path: '/Categories/:id',
      component: Category,
      props: true
    },
    {
      path: '/Trash',
      name: 'trash',
      component: mainGet,
      props:{
        Entity:"trash"
      }
    },
    
  ]
})

export default router
