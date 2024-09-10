import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "./pages/Home.vue";
import QuizView from "./pages/Quiz.vue";
import ResultView from "./pages/Overview.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/quiz", component: QuizView },
  {
    path: "/result",
    component: ResultView,
  },
];

export default createRouter({
  history: createWebHashHistory("/information-system/"),
  routes,
});
