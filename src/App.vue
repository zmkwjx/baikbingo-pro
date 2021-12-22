<template>
  <router-view />
</template>
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useStore } from "@/store";

const store = useStore();
store.dispatch("GetMenu", [
  {
    path: "/test",
    name: "test",
    icon: "icon",
    children: [
      {
        path: "/test/test2",
        name: "test2",
        icon: "icon"
      }
    ]
  },
  {
    path: "/test1",
    name: "test1",
    icon: "icon"
  }
]);
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>
