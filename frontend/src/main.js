import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import EmployeeForm from './components/EmployeeForm.vue';

const routes = [
  { path: '/', redirect: '/form' },
  { path: '/form', component: EmployeeForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
