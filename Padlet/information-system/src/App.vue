<script setup lang="ts"></script>

<template>
  <div class="window-wrapper">
    <h2>E-Learning System</h2>
    <p></p>
    <router-view class="window"></router-view>
  </div>
</template>

<style scoped>
.window {
  width: 100%;
  height: 100%;
}

.window-wrapper {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid #979292;
  padding: 14px 20px;
  max-width: 600px;
  max-height: 460px;
  width: 80%;
  height: 80%;
}

h2 {
  margin: 0;
  text-align: left;
}

p {
  width: 100%;
  border-top: 1px solid #979292;
  margin: 10px 0;
}
</style>
