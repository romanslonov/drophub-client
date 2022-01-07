import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import AuthRoot from '@/views/auth/Root.vue';
import HomeRoot from '@/views/Root.vue';
import AuthLogin from '@/views/auth/Login.vue';
import AuthRegister from '@/views/auth/Register.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    component: AuthRoot,
    children: [
      {
        name: 'Login',
        path: '/login',
        component: AuthLogin,
      }, {
        name: 'Register',
        path: '/register',
        component: AuthRegister,
      },
    ],
  },
  {
    path: '/',
    component: HomeRoot,
    redirect: { name: 'Home' },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home,
      }, {
        path: '/boards',
        name: 'Boards',
        component: () => import(/* webpackChunkName: "boards" */ '@/views/boards/List.vue'),
      }, {
        path: '/boards/:id',
        component: () => import(/* webpackChunkName: "board" */ '@/views/boards/Root.vue'),
        children: [
          {
            path: '',
            name: 'Board',
            component: () => import(/* webpackChunkName: "board" */ '@/views/boards/Board.vue'),
          },
        ],
      }, {
        path: '/settings',
        name: 'Settings',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings.vue'),
      }, {
        path: '/trash',
        name: 'Trash',
        component: () => import(/* webpackChunkName: "trash" */ '@/views/Trash.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authorized = !!window.localStorage.getItem('token');

  if (!authorized && (to.name === 'Login' || to.name === 'Register')) {
    return next();
  }

  if (authorized && (to.name === 'Login' || to.name === 'Register')) {
    return next({ name: 'Home' });
  }

  if (authorized) {
    return next();
  }

  return next({ name: 'Login' });
});

export default router;
