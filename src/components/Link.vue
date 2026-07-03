<script setup lang="ts">
import { ref } from 'vue'
import Card from './Link/Card.vue'
</script>
<template>
  <div id="link">
    <p class="link-title">MyFriends</p>
    <div class="link-cards">
      <Card
        class="link-card"
        v-for="value in 10"
        :name="String(value)"
        :content="String(value)"
        avatar="/img/hhcl233.jpg"
        background="/img/hhcl233.jpg"
        url="test"
        url-name="test"
        :style="{
          top: `Calc(${Math.random() * 80}% - 12px)`,
          left: `Calc(${Math.random() * 80}% - 12px)`,
        }"
      />
    </div>
    <button ref="linkButtonRef" class="link-button">Next!</button>
  </div>
</template>
<style scoped>
#link {
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  color: white;
  gap: 24px;
  flex-direction: column;
}

.link-title {
  font-size: 64px;
  z-index: 1;
  text-shadow: 0px 0px 48px #000000;
}

.link-card {
  position: fixed;
  top: 0;
  left: 0;
  filter: blur(8px);
  transition: all 300ms ease-out;
  z-index: 0;
  animation: float 4s ease-in-out infinite;
}

.link-card:hover {
  filter: blur(0px);
  z-index: 2;
}

.link-button {
  height: 64px;
  width: 256px;
  transform-origin: center;
  border-radius: 12px;
  border: 0;
  background-color: rgba(240, 255, 255, 0.5);
  color: #000;
  outline: none;
  transition: all 350ms ease-in-out;
  font-size: 32px;
  backdrop-filter: blur(10px);
  animation: goShow ease-in-out 250ms;
  will-change: transform;
}

.link-button:hover {
  transform: scale(1.1);
  background-color: rgba(240, 255, 255, 0.75);
  box-shadow: 0px 0px 48px #ffffff7d;
  font-size: 36px;
  transition: all 150ms ease-out;
}

.link-button:active {
  transform: scale(1.2);
  background-color: rgba(240, 255, 255, 0.9);
  box-shadow: 0px 0px 48px #ffffff7d;
  font-size: 36px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(50px);
  }
}
</style>
