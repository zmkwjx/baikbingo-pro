<template>
  <router-view v-slot="{ Component }">
    <transition name="bounce">
      <keep-alive
        v-if="$route.meta.cache && $store.getters.keepAlive"
        :key="$store.getters.keepAlive"
      >
        <component :is="Component" />
      </keep-alive>
      <component v-else :is="Component" />
    </transition>
  </router-view>
</template>
<script lang="ts" setup>
import { useStore } from "@/store";

const $store = useStore();
</script>
<style lang="scss">
.bounce-enter-active {
  animation: bounce-in 0.2s;
}
.bounce-leave-active {
  opacity: 0;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
