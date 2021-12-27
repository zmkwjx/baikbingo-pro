<template>
  <div ref="quickRef" class="bkpro-header-quick-enter">
    <div style="display: flex">
      <ul class="bkpro-header-quick-enter__list">
        <li v-for="item in showData" :key="item.id" :title="item.name">
          <a class="bkpro-header-btn" @click="onSelect(item)">
            {{ item.name }}
          </a>
        </li>
      </ul>
      <el-dropdown
        v-if="dropData[0]"
        ref="dropdownRef"
        class="bkpro-header-quick-enter__op"
        @command="onCommand"
      >
        <a class="bkpro-header-btn">
          <pro-icon type="ellipsis" size="18"></pro-icon>
        </a>
        <template #dropdown>
          <el-dropdown-menu class="bkpro-dropdown">
            <el-dropdown-item
              v-for="item in dropData"
              :key="item.id"
              :command="item.id"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, PropType, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import mixins from "./mixins";
import { RouterMenuStruct } from "@/types";

// 变量
const quickRef = ref();
const dropdownRef = ref();
const clientWidth = ref(0);

// 处理样式
nextTick(() => {
  const dom = dropdownRef.value.$refs.scrollbar.$parent.$el;
  const className = `${dom.className} bkpro-dropdown`;
  dom.setAttribute("class", className);
});

// 获取实例
const $router = useRouter();

// 传入值
const $props = defineProps({
  stars: {
    type: Array as PropType<RouterMenuStruct[]>,
    required: true
  }
});

// 计算属性
const showIndx = computed(() => {
  let s = 0;
  const l = clientWidth.value - 65;
  const n = $props.stars.length;
  for (let i = 0; i < $props.stars.length; i += 1) {
    s += $props.stars[i].name.length * 12 + 26;
    if (s > l) {
      return i;
    }
  }
  return n;
});
const showData = computed(() => {
  return $props.stars.slice(0, showIndx.value);
});
const dropData = computed(() => {
  return $props.stars.slice(showIndx.value);
});

// 初始化
let timer: any;
const onInit = () => {
  nextTick(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      clientWidth.value = quickRef.value.clientWidth;
    });
  });
};
// 加载浏览器窗口变化自适应
window.addEventListener("resize", () => {
  onInit();
});
// 选中菜单
const onSelect = (item: any) => {
  const { path } = mixins.findLast(item);
  $router.push({ path });
};
const onCommand = (id: string) => {
  const item = $props.stars.find((s) => s.id === id);
  onSelect(item);
};
// 监听传入参数
onInit();
watch($props.stars, () => {
  onInit();
});
</script>
