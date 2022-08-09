import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/main/TabsPage.vue';
import { backend } from '@/utils/Backend';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home',
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    name: 'Registration',
    path: '/registration',
    component: () => import('@/views/auth/Registration.vue'),
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home',
      },
      {
        path: 'home',
        component: () => import('@/views/main/Home.vue'),
      },
      {
        path: 'library',
        component: () => import('@/views/main/Library.vue'),
      },
      {
        path: 'store',
        component: () => import('@/views/main/Store.vue'),
      },
    ],
  },
  {
    path: '/reader/:id',
    component: () => import('@/views/Reader.vue'),
  },
  {
    name: 'book',
    path: '/book/:id',
    component: () => import('@/views/Book.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  if (
    // make sure the user is authenticated
    !backend.authenticatedUser &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'Login'
  ) {
    // redirect the user to the login page
    return { name: 'Login' };
  }
});

export default router;

