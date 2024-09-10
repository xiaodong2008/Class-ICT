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

const questions = ref([
  {
    question: "Which one is not a DBMS software?",
    options: ["MySQL", "Oracle", "Java", "SQL Server"],
    answer: "Java",
    selected: "",
  },
  {
    question: "Which one is not a programming language?",
    options: ["Java", "Python", "C++", "HTML"],
    answer: "HTML",
    selected: "",
  },
  {
    question: "Which one is not a front-end framework?",
    options: ["React", "Vue", "Laravel", "Angular"],
    answer: "Laravel",
    selected: "",
  },
  {
    question: "Which one is not a back-end framework?",
    options: ["Express", "Django", "Spring", "Bootstrap"],
    answer: "Bootstrap",
    selected: "",
  },
]);

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
  localStorage.setItem(
    "information-system-data",
    JSON.stringify({ username, num, time, questions })
  );
  router.push("/result");
};
</script>

<template>
  <div class="home">
    <h4>Welcome, {{ username }}</h4>
    <h4>Time Remaining: {{ timeRemaining }}</h4>
    <div v-for="(question, key) in questions" :key="question.question">
      <h5>{{ question.question }}</h5>
      <div v-for="option in question.options" :key="option">
        <RadioButton
          v-model="question.selected"
          :input-id="key + option"
          :value="option"
          name="option"
          class="ml-2"
        />
        <label :for="key + option" class="ml-2">{{ option }}</label>
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
        @click="endQuiz"
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
