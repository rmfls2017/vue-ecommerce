import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Buy from "@/views/Buy.vue";
import Sell from "@/views/Sell.vue";
import Meet from "@/views/Meet.vue";
import Trend from "@/views/Trend.vue";
import OrderComplete from "@/views/OrderComplete.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/buy',
        name: 'Buy',
        component: Buy
    },
    {
        path: '/sell',
        name: 'Sell',
        component: Sell
    },
    {
        path: '/meet',
        name: 'Meet',
        component: Meet
    },
    {
        path: '/trend',
        name: 'Trend',
        component: Trend
    },
    {
        path: '/order-complete',
        name: 'OrderComplete',
        component: OrderComplete
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router