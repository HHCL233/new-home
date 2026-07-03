<script setup lang="ts">
import { ref } from 'vue'
import Welcome from './components/Welcome.vue'
import Link from './components/Link.vue'

const pages = ref(0)
</script>

<template>
  <Transition mode="out-in">
    <Welcome v-if="pages == 0" @go="pages = 1" />
    <Link v-else-if="pages == 1" />
  </Transition>
</template>

<style scoped>
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
