import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import api from "@/api.js";
import VueApexCharts from "vue3-apexcharts";
api.connect()

createApp(App).use(store).use(Antd).use(VueApexCharts).mount('#app')
