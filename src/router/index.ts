import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import AuthRoot from '@/views/auth/Root.vue';
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
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
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
