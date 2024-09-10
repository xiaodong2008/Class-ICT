<script setup lang="ts">
import Button from "primevue/button";
import Slider from "primevue/slider";
import InputText from "primevue/inputtext";

import { ref } from "vue";

const uname = ref("");
const num = ref(5);
const time = ref(10);

const startQuiz = () => {
  localStorage.setItem(
    "information-system-data",
    JSON.stringify({ num: num.value, time: time.value, username: uname.value })
  );
  router.push("/quiz");
};
</script>

<template>
  <div class="home">
    <h4>Do the quiz online and check your marks easliy</h4>
    <span>Enter Username:</span>
    <InputText v-model="uname" placeholder="Enter your username" />
    <span>Set Question Number: {{ num }}</span>
    <Slider v-model="num" :min="3" :max="10" />
    <span>Set Time Limit: {{ time }} minutes</span>
    <Slider v-model="time" :min="5" :max="30" />
    <Button
      class="button"
      label="Start Quiz"
      icon="pi pi-angle-right"
      icon-pos="right"
      @click="startQuiz"
    />
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
  gap: 10px;

  > * {
    max-width: 360px;
    width: 100%;
  }

  .p-slider {
    margin-bottom: 20px;
  }

  h4 {
    margin-top: 0;
    margin-bottom: 5px;
    max-width: none;
  }

  span {
    display: block;
  }

  .button {
    margin-top: auto;
    margin-bottom: 20px;
  }
}
</style>
