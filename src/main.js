import { createApp } from 'vue'
import App from './App.vue'
import GTM from "@/plugins/gtm.js";
import router from "@/router/index.js";

createApp(App)
    .use(router)
    .use(GTM)
    .mount('#app')
