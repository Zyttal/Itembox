import { checkAuth } from '@/services/AuthService'
import LoadingService from '@/services/LoadingService'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ItemsView from '@/views/user-views/ItemsView.vue'
import MyItemsView from '@/views/user-views/MyItemsView.vue'
import ProfileView from '@/views/user-views/ProfileView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-items',
      name: 'my-items',
      component: MyItemsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  LoadingService.start();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log('Checking auth for protected route:', to.path);
    const isAuthenticated = await checkAuthStatus();
    console.log('Is authenticated:', isAuthenticated);
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      next('/login');
    } else {
      console.log('Authenticated, proceeding to route');
      next();
    }
    LoadingService.stop();
  } else {
    console.log('No auth required for route:', to.path);
    LoadingService.stop();
    next();
  }
});

async function checkAuthStatus(): Promise<boolean> {
  const user = await checkAuth();
  return user !== null;
}
export default router
