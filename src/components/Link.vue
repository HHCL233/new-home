<script setup lang="ts">
import { ref, type CSSProperties } from 'vue'
import Card from './Link/Card.vue'
import linkConfig from '../assets/link/config.json'

const isTicking = ref(false)
const linkRef = ref<HTMLDivElement | null>(null)
const buttonCSS = ref<CSSProperties>({})
const contentCSS = ref<CSSProperties>({})
const cardCSS = ref<CSSProperties>({})
const cardLength = ref(linkConfig.length)
const cardRandomCSS = ref(
  Array.from({ length: cardLength.value }, (_, i) => [Math.random() * 80, Math.random() * 80]),
)

const onMousemove = (e: MouseEvent) => {
  if (isTicking.value) return

  isTicking.value = true
  requestAnimationFrame(() => {
    if (!linkRef.value) return
    const dx = -(e.clientX - linkRef.value.clientWidth / 2) * 0.55
    const dy = -(e.clientY - linkRef.value.clientHeight / 2) * 0.55
    const dx0 = -(e.clientX - linkRef.value.clientWidth / 2) * 0.45
    const dy0 = -(e.clientY - linkRef.value.clientHeight / 2) * 0.45
    const dx1 = -(e.clientX - linkRef.value.clientWidth / 2) * 0.75
    const dy1 = -(e.clientY - linkRef.value.clientHeight / 2) * 0.75

    contentCSS.value = { transform: `translate(${dx}px, ${dy}px)` }
    cardCSS.value = { translate: `${dx0}px ${dy0}px` }
    buttonCSS.value = { transform: `translate(${dx1}px, ${dy1}px)` }

    isTicking.value = false
  })
}

const emit = defineEmits(['go'])
</script>
<template>
  <div id="link" ref="linkRef" @mousemove="onMousemove">
    <p class="link-title" :style="contentCSS">MyFriends</p>
    <Card
      class="link-card"
      v-for="(link, index) in linkConfig"
      :name="String(link?.name)"
      :content="String(link?.content)"
      :avatar="link.avatar"
      :background="link.background"
      :url="link.url"
      :url-name="link.urlName"
      :style="{
        top: `Calc(${cardRandomCSS[index]?.[0]}% - 12px)`,
        left: `Calc(${cardRandomCSS[index]?.[1]}% - 12px)`,
        ...cardCSS,
      }"
    />
    <button ref="linkButtonRef" class="link-button" :style="buttonCSS" @click="emit('go')">
      Next!
    </button>
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
  transform-origin: center;
  animation: goShow ease-out 250ms;
  will-change: transform;
  transition: all 350ms ease-out;
}

.link-card {
  position: fixed;
  top: 0;
  left: 0;
  filter: blur(8px);
  transition: all 300ms ease-out;
  z-index: 0;
  animation: float 4s ease-out infinite;
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
  transition: all 350ms ease-out;
  font-size: 32px;
  backdrop-filter: blur(10px);
  animation: goShow ease-in-out 250ms;
  will-change: transform;
  z-index: 1;
}

.link-button:hover {
  height: 72px;
  width: 312px;
  background-color: rgba(240, 255, 255, 0.75);
  box-shadow: 0px 0px 48px #ffffff7d;
  font-size: 36px;
  transition: all 150ms ease-out;
}

.link-button:active {
  height: 78px;
  width: 324px;
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
