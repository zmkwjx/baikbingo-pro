<template>
  <div class="bkpro-header-inner">
    <div class="bkpro-header-inner__start">
      <!-- 商标 -->
      <logo></logo>
      <!-- 总览按钮 -->
      <div class="bkpro-header-btn" @click="goHome">总览</div>
      <!-- 模块菜单 -->
      <menus></menus>
    </div>
    <div class="bkpro-header-inner__center">
      <!-- 快捷访问 -->
      <!-- 搜索菜单 -->
    </div>
    <!-- 更多操作 -->
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import Logo from "./Logo.vue";
import Menus from "./Menus.vue";

const router = useRouter();

// 返回首页
const goHome = () => {
  router.push({ path: "/" });
};
</script>
