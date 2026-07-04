<script setup lang="ts"></script>
<template>
  <div id="loading">
    <span class="loading-tip">Loading...</span>
  </div>
</template>
<style scoped>
#loading {
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
  z-index: 100;
}

.loading-tip {
  color: white;
  animation: loading 1.5s ease-in-out infinite;
  font-size: 36px;
}

@keyframes loading {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-50px);
  }
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.75;
  }
  100% {
    opacity: 0;
  }
}
</style>
