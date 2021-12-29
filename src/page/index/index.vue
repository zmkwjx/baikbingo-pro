<template>
  <div class="bkpro-wrapper">
    <!-- 顶部导航栏 -->
    <div class="bkpro-header">
      <header-nav />
    </div>
    <!-- 主内容 -->
    <div class="bkpro-container" :style="ContainerStyle">
      <!-- 侧边菜单 -->
      <div class="bkpro-sidebar">
        <side-bar v-if="$route.matched[3]" :key="$route.matched[3].path" />
      </div>
      <!-- 内容 -->
      <div class="bkpro-main" :style="MainStyle">
        <div class="bkpro-page-root">
          <!-- 总览页面 -->
          <router-view v-if="isHome" />
          <!-- 模块页面 -->
          <section v-else class="bkpro-layout">
            <section class="bkpro-layout__body">
              <main class="bkpro-layout__content">
                <div class="bkpro-layout__content-inner">
                  <div class="bkpro-layout__content-head" id="bkproNav">
                    <pro-layout-nav mode="layout" />
                  </div>
                  <div class="bkpro-layout__content-body" :style="ContentStyle">
                    <div class="bkpro-layout__content-body-inner">
                      <router-view
                        v-if="$route.meta.keepAlive && $store.getters.keepAlive"
                        :key="$store.getters.keepAlive"
                        v-slot="{ Component }"
                      >
                        <keep-alive>
                          <component :is="Component" />
                        </keep-alive>
                      </router-view>
                      <router-view v-else />
                    </div>
                  </div>
                </div>
              </main>
            </section>
          </section>
        </div>
        <!-- 回到顶部 -->
        <el-backtop target=".bkpro-main"></el-backtop>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import headerNav from "./headerNav/index.vue";
import sideBar from "./sideBar/index.vue";

// 获取实例
const $store = useStore();
const $route = useRoute();

// 侧边菜单展开状态
const isCollapse = computed(() => $store.getters.isCollapse);
// 判断是否是预览页面
const isHome = computed(() => $route.path.includes("/dashboard"));
// 主体样式
const ContainerStyle = computed(() => {
  const styles = { left: "-200px" };
  styles.left = isHome.value ? "-200px" : "0px";
  return styles;
});
// 内容样式
const MainStyle = computed(() => {
  const styles = { left: "" };
  if ($route.path.includes("/dashboard")) {
    return styles;
  }
  if (!$route.matched[3]) {
    styles.left = "0px";
    return styles;
  }
  styles.left = isCollapse.value ? "56px" : "200px";
  return styles;
});
// 页面样式
const ContentStyle = computed(() => {
  if ($route.matched[2]) return {};
  return {
    width: "1360px",
    margin: "0 auto"
  };
});
</script>
