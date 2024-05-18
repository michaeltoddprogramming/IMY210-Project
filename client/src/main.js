import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import BootstrapVueNext from 'bootstrap-vue-next'

import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App.vue'
import Home from './views/home.vue'
import Login from './views/login.vue'
import Register from './views/register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'Home', component: Home },
    { path: '/', redirect: '/home' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register }

  ]
});

createApp(App).use(router).use(BootstrapVueNext).mount('#app')
