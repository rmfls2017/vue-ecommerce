import { createApp } from 'vue'
import App from './App.vue'
import GTM from "@/plugins/gtm.js";

createApp(App)
    .use(GTM)
    .mount('#app')
