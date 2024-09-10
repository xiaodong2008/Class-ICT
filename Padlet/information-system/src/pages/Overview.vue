<script setup lang="ts">
import Button from "primevue/button";
import Slider from "primevue/slider";
import InputText from "primevue/inputtext";
import RadioButton from "primevue/radiobutton";

import { ref, onUnmounted } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

const { username, num, time, questions, startTime, endTime } = JSON.parse(
  localStorage.getItem("information-system-data")
);

const usedMinutes = Math.round((endTime - startTime) / 60000) || 1;
const isSmallerThanOneMinute = endTime - startTime < 60000;

if (!username || !num || !time) {
  router.push("/");
}

function tryAgain() {
  localStorage.setItem(
    "information-system-data",
    JSON.stringify({ num, time, username })
  );
  router.push("/quiz");
}
</script>

<template>
  <div class="home">
    <h4>Nice one, {{ username }}</h4>
    <h4>
      Time Taken: {{ isSmallerThanOneMinute && "< " }}{{ usedMinutes }} min
    </h4>
    <h4>
      Score: {{ questions.filter((q) => q.answer === q.selected).length }} /
      {{ questions.length }}
    </h4>
    <div v-for="(question, key) in questions" :key="question.question">
      <h5>{{ question.question }}</h5>
      <div
        style="display: flex; align-items: center; gap: 5px"
        v-for="option in question.options"
        :key="option"
      >
        <RadioButton
          v-model="question.selected"
          :input-id="key + option"
          :value="option"
          :disabled="true"
          name="option"
        />
        <label :for="key + option" class="ml-2">{{ option }}</label>
        <span class="lb green" v-if="question.answer === option"
          >Correct Answer</span
        >
        <span class="lb red" v-else-if="question.selected === option"
          >Your Answer</span
        >
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
        label="Try Again"
        icon="pi pi-replay"
        icon-pos="right"
        @click="tryAgain"
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
.lb {
  font-size: 0.8rem;
  margin-left: 5px;
  align-self: end;

  &.green {
    color: rgb(61, 225, 61);
  }

  &.red {
    color: rgb(230, 20, 20);
  }
}
</style>
