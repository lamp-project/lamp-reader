import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '@/views/main/TabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/library',
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
  {
    name: 'review',
    path: '/review',
    component: () => import('@/views/Review.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach(async (to) => {
//   if (
//     // make sure the user is authenticated
//     !backend.authenticatedUser &&
//     // ❗️ Avoid an infinite redirect
//     !['Login', 'Registration'].includes(to.name as string)
//   ) {
//     // redirect the user to the login page
//     return { name: 'Login' };
//   }
// });

export default router;
