<script setup lang="ts">
import { useElementStore } from '@/stores/element'
import { onMounted, ref, watch, type CSSProperties } from 'vue'
import Welcome from './components/Welcome.vue'
import Link from './components/Link.vue'
import Sh from './components/Sh.vue'
import Loading from './components/Loading.vue'

const elementStore = useElementStore()
const pages = ref(-1)
const mouseTipCss = ref<CSSProperties>({})
const boundElements = new WeakSet<HTMLElement>()
const isTicking = ref(false)
const mouseenterElement = ref<HTMLElement | null>(null)

window.addEventListener('load', () => {
  pages.value = 0
})

const mousemove = (e: MouseEvent) => {
  if (isTicking.value) return

  isTicking.value = true
  requestAnimationFrame(() => {
    if (mouseenterElement.value) {
      const rect = mouseenterElement.value.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseTipCss.value.transform = `translate(${centerX + (e.clientX - centerX) * 0.1}px, ${centerY + (e.clientY - centerY) * 0.1}px)`
    } else {
      mouseTipCss.value.transform = `translate(${e.clientX}px, ${e.clientY}px) rotate(45deg)`
    }
    isTicking.value = false
  })
}

watch(
  () => elementStore.elements,
  (newVal) => {
    newVal.forEach((value) => {
      if (!boundElements.has(value)) {
        value.addEventListener('mouseenter', (e: MouseEvent) => {
          const rect = value.getBoundingClientRect()
          mouseTipCss.value['--width'] = `${rect.width + 32}px`
          mouseTipCss.value['--height'] = `${rect.height + 32}px`
          mouseenterElement.value = value
        })
        value.addEventListener('mouseleave', (e: MouseEvent) => {
          mouseTipCss.value['--width'] = '36px'
          mouseTipCss.value['--height'] = '36px'
          mouseenterElement.value = null
        })
        value.addEventListener('mousedown', (e: MouseEvent) => {
          const rect = value.getBoundingClientRect()
          mouseTipCss.value['--width'] = `${rect.width + 36}px`
          mouseTipCss.value['--height'] = `${rect.height + 36}px`
          mouseenterElement.value = null
        })
        boundElements.add(value)
      }
    })
  },
  { deep: true },
)
</script>

<template>
  <div @mousemove="mousemove">
    <div class="mouse-tip" :style="mouseTipCss">
      <div class="mouse-tip-1"></div>
      <div class="mouse-tip-2"></div>
      <div class="mouse-tip-3"></div>
      <div class="mouse-tip-4"></div>
    </div>
    <Transition mode="out-in">
      <Loading v-if="pages == -1" />
      <Welcome v-else-if="pages == 0" @go="pages = 1" />
      <Link v-else-if="pages == 1" @go="pages = 2" />
      <Sh v-else-if="pages == 2" @go="pages = 0" />
    </Transition>
  </div>
</template>

<style scoped>
.mouse-tip {
  --width: 36px;
  --height: 36px;
  display: grid;
  position: fixed;
  height: var(--height);
  width: var(--width);
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(2, auto);
  top: calc(var(--height) / -2);
  left: calc(var(--width) / -2);
  z-index: 999;
  gap: 12px;
  transition:
    transform 100ms ease-out,
    width 300ms ease-out,
    height 300ms ease-out,
    top 300ms ease-out,
    left 300ms ease-out;
  pointer-events: none;
  will-change: auto;
}

.mouse-tip > * {
  flex: 1;
}

.mouse-tip-1 {
  border-left: solid aqua 4px;
  border-top: solid aqua 4px;
}

.mouse-tip-2 {
  border-right: solid aqua 4px;
  border-top: solid aqua 4px;
}

.mouse-tip-3 {
  border-left: solid aqua 4px;
  border-bottom: solid aqua 4px;
}

.mouse-tip-4 {
  border-right: solid aqua 4px;
  border-bottom: solid aqua 4px;
}

.v-enter-from {
  transform: translateY(1000px);
}
.v-enter-active {
  transition: transform 0.5s ease;
}
.v-enter-to {
  transform: translateY(0);
}

.v-leave-from {
  transform: translateY(0);
}
.v-leave-active {
  transition: transform 0.5s ease;
}
.v-leave-to {
  transform: translateY(-1000px);
}
</style>
