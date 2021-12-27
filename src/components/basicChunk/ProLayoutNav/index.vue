<template>
  <div ref="headRef" class="bkpro-layout__header" :id="accesskey">
    <slot name="title">
      <div class="bkpro-layout__header-title">{{ title }}</div>
    </slot>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, nextTick, watch } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  mode: {
    type: String,
    default: "module"
  }
});

const route = useRoute();
const accesskey = ref(props.mode === "layout" ? "layout" : route.path);
const headRef = ref();

// 标题
const title = computed(() => {
  const { name, query } = route;
  if (name === "iframe") {
    return query.name || name;
  }
  return name;
});
// 渲染模块
const initModule = () => {
  const dom = document.getElementById("dscloudNav");
  if (!dom) return;
  const log = dom.children[0];
  if (log && log.id === "layout") {
    dom.innerHTML = "";
    dom.appendChild(headRef.value);
  }
};
// 渲染页面
const initLayout = () => {
  const dom = document.getElementById("dscloudNav");
  if (!dom) return;
  const log = dom.children[0];
  if (log && log.id !== route.path) {
    dom.innerHTML = "";
    dom.appendChild(headRef.value);
  } else {
    dom.innerHTML = "";
    dom.appendChild(log);
  }
};
// 初始化
const init = () => {
  nextTick(() => {
    if (props.mode === "layout") {
      initLayout();
    } else {
      initModule();
    }
  });
};
// 监听
init();
watch(route, () => {
  if (props.mode === "layout") {
    initLayout();
  }
});
</script>
