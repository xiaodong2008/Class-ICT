<script setup lang="ts">
import Button from "primevue/button";
import Slider from "primevue/slider";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";

import { ref, onUnmounted } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

const { username, num, time } = JSON.parse(
  localStorage.getItem("information-system-data")
);

if (!username || !num || !time) {
  router.push("/");
}

const endTime = new Date().getTime() + time * 60 * 1000;
let timeRemaining = ref(updateRemainingTime());

function updateRemainingTime() {
  let timeRemaining = endTime - new Date().getTime();
  if (timeRemaining <= 0) {
    router.push("/result");
  }
  return new Date(timeRemaining).toISOString().substr(14, 5);
}

const updateRemainingTimeInterval = setInterval(
  () => (timeRemaining.value = updateRemainingTime()),
  500
);
onUnmounted(() => clearInterval(updateRemainingTimeInterval));

const endQuiz = () => {
  localStorage.setItem("information-system-data", JSON.stringify({}));
  router.push("/result");
};

const selectedCategory = ref("Production");
const categories = ref([
  { name: "Accounting", key: "A" },
  { name: "Marketing", key: "M" },
  { name: "Production", key: "P" },
  { name: "Research", key: "R" },
]);

const questions = [
  {
    question: "Which one is not a DBMS software?",
    options: ["MySQL", "Oracle", "Java", "SQL Server"],
    answer: "Java",
  },
  {
    question: "Which one is not a programming language?",
    options: ["Java", "Python", "C++", "HTML"],
    answer: "HTML",
  },
  {
    question: "Which one is not a front-end framework?",
    options: ["React", "Vue", "Laravel", "Angular"],
    answer: "Laravel",
  },
  {
    question: "Which one is not a back-end framework?",
    options: ["Express", "Django", "Spring", "Bootstrap"],
    answer: "Bootstrap",
  },
];
</script>

<template>
  <div class="home">
    <h4>Time Remaining: {{ timeRemaining }}</h4>
    <!-- <div
          v-for="category in categories"
          :key="category.key"
          class="flex items-center"
        >
          <RadioButton
            v-model="selectedCategory"
            :inputId="category.key"
            name="dynamic"
            :value="category.name"
          />
          <label :for="category.key" class="ml-2">{{ category.name }}</label>
        </div> -->
    <div v-for="question in questions" :key="question.question">
      <h5>{{ question.question }}</h5>
      <div v-for="option in question.options" :key="option">
        <RadioButton
          v-model="selectedCategory"
          :inputId="option"
          name="dynamic"
          :value="option"
        />
        <label :for="option" class="ml-2">{{ option }}</label>
      </div>
    </div>
    <div class="bottom">
      <Button
        class="button"
        severity="secondary"
        label="Back to Home Page"
        icon="pi pi-angle-left"
        icon-pos="left"
        @click="router.push('/')"
      />
      <Button
        class="button"
        label="Submit"
        icon="pi pi-angle-right"
        icon-pos="right"
        @click="startQuiz"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
  text-align: left;

  > * {
    max-width: 360px;
    width: 100%;
  }

  .p-slider {
    margin-bottom: 20px;
  }

  h4 {
    margin: 0;
    max-width: none;
  }

  h5 {
    margin: 4px 0;
    margin-top: 10px;
  }

  span {
    display: block;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    padding-top: 20px;
    margin-bottom: 20px;
  }
}

.ml-2 {
  margin-left: 0.5rem;
}
</style>
