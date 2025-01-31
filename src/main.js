import { createApp } from 'vue'
import {changePage} from "@/plugins/changePage.js";
import App from './App.vue'
import GTM from "@/plugins/gtm.js";
import router from "@/router/index.js";
import './assets/base.css'

createApp(App)
    .use(router)
    .use(GTM)
    .use(changePage)
    .mount('#app')
