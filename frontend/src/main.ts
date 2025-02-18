import './assets/stylings/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueSpinnersPlugin } from 'vue3-spinners';


const app = createApp(App)
  app.use(VueSpinnersPlugin)
  app.use(router)
  app.mount('#app');
