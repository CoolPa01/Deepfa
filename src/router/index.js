import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactUs from '@/views/ContactUs.vue'; // 引入联系我们页面
import MyPage from '@/views/MyPage.vue'; // 引入你放在 views 中的页面组件
import Register from '@/views/Register.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactUs
  },
  {
    path: '/my',  // 你想要该页面显示的路径
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  routes
})

export default router
