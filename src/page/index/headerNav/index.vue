<template>
  <div class="bkpro-header-inner">
    <div class="bkpro-header-inner__start">
      <!-- 商标 -->
      <logo></logo>
      <!-- 总览按钮 -->
      <div class="bkpro-header-btn" @click="goHome">总览</div>
      <!-- 模块菜单 -->
      <menus
        :stars="stars"
        @on-star-add="onStarAdd"
        @on-star-del="onStarDel"
      ></menus>
    </div>
    <div class="bkpro-header-inner__center">
      <!-- 快捷访问 -->
      <quick-enter :stars="stars"></quick-enter>
      <!-- 搜索菜单 -->
      <search></search>
    </div>
    <!-- 更多操作 -->
    <more></more>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "@/store";
import Logo from "./Logo.vue";
import QuickEnter from "./QuickEnter.vue";
import Menus from "./Menus.vue";
import Search from "./Search.vue";
import More from "./more/index.vue";
import { RouterMenuStruct } from "@/types";

// 获取实例
const $router = useRouter();
const $store = useStore();

// 变量
const stars = ref<RouterMenuStruct[]>([]); // 收藏的数据
stars.value = $store.getters.tagStar;

// 返回首页
const goHome = () => {
  $router.push({ path: "/" });
};

// 收藏菜单
const onStarAdd = (item: RouterMenuStruct) => {
  stars.value.push(item);
  $store.dispatch("SetTagStar", stars.value);
};

// 删除收藏菜单
const onStarDel = (item: RouterMenuStruct) => {
  const index = stars.value.findIndex(
    (s: RouterMenuStruct) => s.id === item.id
  );
  stars.value.splice(index, 1);
  $store.dispatch("SetTagStar", stars.value);
};
</script>
