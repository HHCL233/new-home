<script setup lang="ts">
import { openNewPage } from '@/utils/open'
import { ref, type CSSProperties } from 'vue'

const textCSS = ref<CSSProperties>({})
const welcomeCSS = ref<CSSProperties>({})
const welcomeRef = ref<HTMLDivElement | null>(null)
const welcomeButtonRef = ref<HTMLButtonElement | null>(null)
const welcomeButtonShow = ref(false)
const isTicking = ref(false)

const onMousemove = (e: MouseEvent) => {
  if (isTicking.value) return

  isTicking.value = true
  requestAnimationFrame(() => {
    if (!welcomeRef.value) return
    const dx = -(e.clientX - welcomeRef.value.clientWidth / 2) * 0.5
    const dy = -(e.clientY - welcomeRef.value.clientHeight / 2) * 0.5
    const dx1 = -(e.clientX - welcomeRef.value.clientWidth / 2) * 0.75
    const dy1 = -(e.clientY - welcomeRef.value.clientHeight / 2) * 0.75

    textCSS.value = { transform: `translate(${dx}px, ${dy}px)` }
    welcomeCSS.value = { transform: `translate(${dx1}px, ${dy1}px)` }

    isTicking.value = false
  })
}

const onMouseleave = (e: MouseEvent) => {
  if (!welcomeRef.value) return
  textCSS.value['transform'] = `translate(${0}px, ${0}px)`
}

const onTextMouseenter = (e: MouseEvent) => {
  welcomeButtonShow.value = true
}

const emit = defineEmits(['go'])
</script>

<template>
  <div id="welcome" @mousemove="onMousemove" ref="welcomeRef">
    <svg width="2000" height="300" :style="textCSS" class="svg-text" @mouseenter="onTextMouseenter">
      <text
        x="50%"
        y="50%"
        font-family="OPPO Sans"
        font-size="256"
        fill="transparent"
        stroke="white"
        stroke-width="2"
        text-anchor="middle"
        dominant-baseline="middle"
      >
        HHCL233
      </text>
    </svg>
    <button ref="welcomeButtonRef" class="welcome-button" @click="emit('go')" :style="welcomeCSS">
      Go!
    </button>
    <button
      ref="welcomeButtonRef"
      class="welcome-button"
      @click="openNewPage('https://github.com/HHCL233')"
      :style="welcomeCSS"
    >
      Github!
    </button>
  </div>
</template>

<style scoped>
#welcome {
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  gap: 16px;
}

.svg-text {
  transform-origin: center;
  animation: goShow ease-out 250ms;
  will-change: transform;
  transition: all 350ms ease-out;
}

.welcome-button {
  height: 64px;
  width: 256px;
  transform-origin: center;
  border-radius: 12px;
  border: 0;
  background-color: rgba(240, 255, 255, 0.5);
  color: #000;
  outline: none;
  transition: all 350ms ease-out;
  font-size: 32px;
  backdrop-filter: blur(10px);
  animation: goShow ease-out 250ms;
  will-change: transform;
}

.welcome-button:hover {
  height: 72px;
  width: 312px;
  background-color: rgba(240, 255, 255, 0.75);
  box-shadow: 0px 0px 48px #ffffff7d;
  font-size: 36px;
  transition: all 200ms ease-out;
}

.welcome-button:active {
  height: 78px;
  width: 324px;
  background-color: rgba(240, 255, 255, 0.9);
  box-shadow: 0px 0px 48px #ffffff7d;
  font-size: 36px;
}

@keyframes goShow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
