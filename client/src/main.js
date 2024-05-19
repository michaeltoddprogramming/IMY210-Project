import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { BootstrapVue3 } from 'bootstrap-vue-3'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import App from './App.vue'
import Home from './views/home.vue'
import Login from './views/login.vue'
import Register from './views/register.vue'
import Create from './views/create.vue'
import Cart from './views/cart.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'Home', component: Home },
    { path: '/', redirect: '/home' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/create', name: 'Create', component: Create },
    { path: '/cart', name: 'Cart', component: Cart }
  ]
});

createApp(App).use(router).use(BootstrapVue3).mount('#app')
