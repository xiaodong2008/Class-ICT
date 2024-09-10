import "./style.css";
import "primeicons/primeicons.css";

import App from "./App.vue";
import Aura from "@primevue/themes/aura";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import router from "./router";

createApp(App)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .mount("#app");
