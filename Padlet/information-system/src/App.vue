<script setup lang="ts"></script>

<template>
  <div class="window-wrapper">
    <h2>E-Learning System</h2>
    <p></p>
    <div class="overflow-wrapper">
      <router-view class="window" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.fade-leave-to {
  transform: translateX(-40px);
  opacity: 0;
}

.fade-enter-from {
  transform: translateX(40px);
  opacity: 0;
}

.fade-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.window {
  width: 100%;
  height: 100%;
}

.overflow-wrapper {
  overflow: auto;
  height: 100%;
  width: 100%;
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
