import { useUserStore } from './../stores/user';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/main/MainIndex.vue'),
    redirect: '/channels',
    children: [
      {
        path: '/channels',
        name: 'channels',
        component: () => import('../views/main/Channels.vue'),
      },
      {
        path: '/channels/:channelId',
        name: 'channel',
        component: () => import('../views/main/Channel.vue'),
      },
      {
        path: '/me',
        name: 'account',
        component: () => import('../views/main/Account.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  window.document.title = "Taco'bout it";

  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired) {
    const token = localStorage.getItem('token');

    if (!token) {
      return next('/login');
    }

    if (!useUserStore().currentUser) {
      await useUserStore().getCurrentUser();
    }

    return next();
  }

  next();
});

export default router;
