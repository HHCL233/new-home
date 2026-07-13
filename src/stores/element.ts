import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useElementStore = defineStore('element', () => {
  const elements = ref<Array<HTMLElement>>([])
  function addElement(element: Array<HTMLElement>) {
    console.log([...elements.value, ...element])
    elements.value = [...elements.value, ...element]
  }

  return { elements, addElement }
})
