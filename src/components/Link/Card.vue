<script setup lang="ts">
import { openNewPage } from '@/utils/open'
import { computed, ref, onMounted } from 'vue'
import { useElementStore } from '@/stores/element'

const domArray = ref<Array<HTMLElement>>([])
const elementStore = useElementStore()
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  urlName: {
    type: String,
    required: false,
  },
})
const bgUrl = computed(() => `url(${props.background})`)
const avatarUrl = computed(() => `url(${props.avatar})`)

onMounted(() => {
  elementStore.addElement(domArray.value)
})
</script>
<template>
  <div class="link-card">
    <div class="link-user-img"></div>
    <span class="link-user-name">{{ props.name }}</span>
    <span class="link-user-content">{{ props.content ?? '' }}</span>
    <button
      class="link-user-go"
      v-if="props.url"
      @click="openNewPage(props.url)"
      :ref="
        (el) => {
          if (el && !domArray.includes(el as HTMLElement)) domArray.push(el as HTMLElement)
        }
      "
    >
      前往 {{ props.urlName ?? props.url }}
    </button>
  </div>
</template>
<style scoped>
.link-card {
  height: 240px;
  position: relative;
  background-color: rgb(125, 125, 125);
  width: 360px;
  border-radius: 12px;
  box-shadow: 0px 0px 24px #272727;
  display: flex;
  color: white;
  padding: 24px;
  box-sizing: border-box;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
}

.link-card::before {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  content: '';
  background-image: v-bind('bgUrl');
  background-color: rgb(125, 125, 125);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 420px;
  height: 360px;
  border-radius: 12px;
  filter: blur(24px);
}

.link-user-img {
  position: relative;
  border-radius: 50%;
  height: 42px;
  width: 42px;
  background-image: v-bind('avatarUrl');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.link-user-name {
  position: relative;
  font-size: 32px;
}

.link-user-content {
  position: relative;
  font-size: 18px;
}

.link-user-go {
  position: absolute;
  bottom: 24px;
  right: 24px;
  border-radius: 24px;
  border: 0;
  padding: 12px;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  transition: all 300ms ease-in-out;
}

.link-user-go:hover {
  background-color: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
}

.link-user-go:active {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
