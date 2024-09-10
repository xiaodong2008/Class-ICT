import "./style.css";
import "primeicons/primeicons.css";

import { createMemoryHistory, createRouter } from "vue-router";

import AboutView from "./pages/Exercise.vue";
import App from "./App.vue";
import Aura from "@primevue/themes/aura";
import HomeView from "./pages/Home.vue";
import PrimeVue from "primevue/config";
import { createApp } from "vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

createApp(App)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .mount("#app");
