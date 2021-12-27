<template>
  <router-view
    v-if="$route.meta.keepAlive && $store.getters.keepAlive"
    :key="$store.getters.keepAlive"
    v-slot="{ Component }"
  >
    <transition name="bounce">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <router-view v-else />
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
