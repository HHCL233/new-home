<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TypeIt from 'typeit'
import type { El } from 'typeit/dist/types'

const typeitElement = ref<El | null>(null)
const typeitText = ref(`>>> from Hhcl233 import hhcl233
... 
... hhcl = Hhcl233()
... print(hhcl.get_skills())
['JavaScript','TypeScript','Vue3','Godot','Python']
`)

onMounted(() => {
  if (!typeitElement.value || typeitElement.value == null) return

  let htmlStr = typeitText.value.replace(/\r\n|\r|\n/g, '<br>')
  new TypeIt(typeitElement.value, {
    strings: [htmlStr],
    speed: 100,
    loop: false,
    breakLines: true,
    lifeLike: true,
    cursor: false,
  }).go()
})
const emit = defineEmits(['go'])
</script>
<template>
  <div id="sh">
    <div class="typeit">
      <span ref="typeitElement" class="typeit-element"></span>
      <div class="typeit-cursor"></div>
    </div>
    <button class="sh-button" @click="emit('go')">go</button>
  </div>
</template>
<style scoped>
#sh {
  height: 100vh;
  background-color: black;
  display: flex;
  overflow: hidden;
  position: relative;
  color: white;
  gap: 16px;
  flex-direction: column;
  padding: 24px;
}

.typeit-element {
  font-size: 18px;
  font-family: monospace;
  user-select: text;
}

.sh-button {
  height: 28px;
  background-color: white;
  color: black;
  font-size: 16px;
  font-family: monospace;
  text-align: left;
  border: none;
  outline: none;
}

.sh-button:hover {
  background-color: rgb(216, 216, 216);
}

.sh-button:active {
  transform: translate(4px, 4px);
}

.typeit:hover .typeit-cursor {
  background-color: white;
}

.typeit-cursor {
  display: inline-block;
  width: 8px;
  height: 18px;
  margin-left: 4px;
  transform: translateY(2px);
  border: 2px solid white;
}
</style>
