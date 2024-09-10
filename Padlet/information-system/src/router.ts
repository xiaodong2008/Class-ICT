import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "./pages/Home.vue";
import Overview from "./pages/Overview.vue";
import QuizView from "./pages/Quiz.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/quiz", component: QuizView },
  {
    path: "/overview",
    component: Overview,
  },
];

export default createRouter({
  history: createMemoryHistory(),
  routes,
});
