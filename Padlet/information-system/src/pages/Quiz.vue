<script setup lang="ts">
import Button from "primevue/button";
import Slider from "primevue/slider";
import InputText from "primevue/inputtext";

import { ref } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

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
    <h4>You're now doing quiz online</h4>
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

  .bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: auto;
    margin-bottom: 20px;
  }
}
</style>
