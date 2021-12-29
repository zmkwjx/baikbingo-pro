<template>
  <div
    class="bkpro-sidebar__inner"
    :style="{
      width: isCollapse ? '56px' : '200px'
    }"
  >
    <div class="bkpro-sidebar__inner-head">
      <div class="bkpro-sidebar__inner-head-title" :title="title">
        <pro-icon v-if="isCollapse" :type="titleIcon" size="16"></pro-icon>
        <h2 v-else>{{ title }}</h2>
      </div>
    </div>
    <div class="bkpro-sidebar__inner-body">
      <MenuRender
        class="bkpro-sidebar__inner-body-menu"
        :menu="menu"
        :active="active"
      ></MenuRender>
    </div>
    <div class="bkpro-sidebar__inner-foot">
      <div
        class="bkpro-sidebar__inner-foot-btn"
        @click="showCollapse"
        :title="isCollapse ? '展开' : '收起'"
      >
        <pro-icon
          :type="isCollapse ? 'indent' : 'outdent'"
          size="22"
        ></pro-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { RouterMenuStruct } from "@/types";
import MenuRender from "./Menu";

// 获取实例
const $store = useStore();
const $route = useRoute();

// 侧边菜单展开状态
const isCollapse = computed(() => $store.getters.isCollapse);

// 变量
const title = ref<string>();
const titleIcon = ref<string>("");
const active = ref<string>($route.path);
const menu = ref<RouterMenuStruct[]>();

// 设置标题
const setTitle = (route: RouterMenuStruct) => {
  title.value = route.name;
  titleIcon.value = route.icon;
};

// 设置模块菜单
const setModuleMenu = () => {
  const menus = $store.getters.menu || [];
  const group =
    menus.find((item: RouterMenuStruct) => item.path === $route.matched[1].path)
      ?.children || [];
  const route =
    group.find(
      (item: RouterMenuStruct) => item.path === $route.matched[2].path
    ) || {};
  setTitle(route);
  menu.value = route?.children || [];
};

// 收起
const showCollapse = () => {
  $store.commit("SET_COLLAPSE");
};

// 监听
setModuleMenu();
watch($route, (newVal, oldVal) => {
  if (!oldVal || newVal.matched[2] !== oldVal.matched[2]) {
    setModuleMenu();
  }
});
</script>
