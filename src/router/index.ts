import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/main/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'home',
        component: () => import('@/views/main/Home.vue')
      },
      {
        path: 'library',
        component: () => import('@/views/main/Library.vue')
      },
      {
        path: 'store',
        component: () => import('@/views/main/Store.vue')
      }
    ]
  },
  {
    path: '/reader/:id',
    component: () => import('@/views/Reader.vue')
  },
  {
    name: 'book',
    path: '/book/:id',
    component: () => import('@/views/Book.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
