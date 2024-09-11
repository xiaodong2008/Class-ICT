<script setup lang="ts">
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";

import { ref, onUnmounted } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

const { username, num, time } = JSON.parse(
  localStorage.getItem("information-system-data")!
);

if (!username || !num || !time) {
  router.push("/");
}

interface Question {
  question: string;
  options: string[];
  answer: string;
  selected?: string | null;
}

const questionsDb: Question[] = [
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
  {
    question: "Which one is not a word in compiler terminology?",
    options: ["Log", "Parse", "Lex", "Finite-state machine FSM"],
    answer: "Log",
  },
  {
    question: "Which keyword is used to delete a table in SQL?",
    options: ["REMOVE", "DELETE", "DROP", "REMOVE TABLE"],
    answer: "DROP",
  },
  {
    question: "Which one is not a keyword in SQL?",
    options: ["SELECT", "INSERT", "UPDATE", "MODIFY"],
    answer: "MODIFY",
  },
  {
    question: "Which one is not a keyword in JavaScript?",
    options: ["Date", "this", "function", "let"],
    answer: "Date",
  },
  {
    question: "Which one is only available in JavaScript commonjs module?",
    options: ["module.exports", "console.log", "Math", "void"],
    answer: "module.exports",
  },
  {
    question: "Which one can only used one time in a web page?",
    options: ["p", "div", "span", "body"],
    answer: "body",
  },
  {
    question: "Which one is not a valid HTML tag?",
    options: ["<container>", "<section>", "<article>", "<div>"],
    answer: "<container>",
  },
];

const questions = ref<Question[]>([]);

while (questions.value.length < num) {
  const randomIndex = Math.floor(Math.random() * questionsDb.length);
  const randomQuestion = questionsDb[randomIndex];
  if (!questions.value.some((q) => q.question === randomQuestion.question)) {
    questions.value.push({
      ...randomQuestion,
      selected: null,
    });
  }
}

const startTime = new Date().getTime();
const endTime = startTime + time * 60 * 1000;
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
    JSON.stringify({
      username,
      num,
      time,
      questions: questions.value,
      startTime,
      endTime: new Date().getTime(),
    })
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
