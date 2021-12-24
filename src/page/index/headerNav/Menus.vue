<template>
  <el-popover
    v-model="state.show"
    :show-arrow="false"
    :offset="0"
    :width="1000"
    popper-class="bkpro-menus-overlay"
    placement="bottom-start"
    trigger="hover"
  >
    <!-- 触发 -->
    <template #reference>
      <div class="bkpro-header-dropdown">
        <div class="bkpro-header-dropdown-item">
          模块
          <el-icon size="12" style="top: 2px"><caret-bottom /></el-icon>
        </div>
      </div>
    </template>
    <!-- 内容 -->
    <div class="bkpro-menus-overlay-box">
      <!-- 侧边 -->
      <div class="bkpro-menus-overlay-panel">
        <div class="bkpro-menus-overlay-panel__start">
          <!-- 快捷访问 -->
          <div class="bkpro-menus-overlay-box__group">
            <div class="bkpro-menus-overlay-box__label">快捷访问</div>
          </div>
        </div>
        <!-- 面板 -->
        <div class="bkpro-menus-overlay-panel__end">
          <!-- 面板头部 -->
          <div class="bkpro-menus-overlay-panel__header">
            <!-- 最近访问 -->
            <div class="bkpro-menus-overlay-panel__header--left">
              <div class="bkpro-menus-overlay-box__label" style="width: 78px">
                最近访问
              </div>
              <div class="bkpro-menus-overlay-panel__lately">
                <div
                  :title="item.name"
                  class="bkpro-menus-overlay-panel__lately-item"
                  v-for="(item, index) in tags"
                  :key="`__tags_${index}`"
                  @click="onSelect(item)"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <!-- 搜索框 -->
            <!-- 搜索框 -->
            <div class="bkpro-menus-overlay-panel__header--right">
              <el-input
                v-model="state.searchVal"
                placeholder="搜索模块、页面"
                clearable
                @change="onSearch"
              >
                <template #suffix>
                  <el-icon class="el-input__icon">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { Search, CaretBottom } from "@element-plus/icons-vue";
import { reactive, toRefs, computed } from "vue";
import { useStore } from "@/store";
import { onJump, findLast, tagMapToArr } from "./mixins";

// 获取实例
const store = useStore();

// 变量
const state = reactive({
  show: false,
  searchVal: null,
  searchMsg: null
});
toRefs(state);

// 计算属性
const tags = computed(() => {
  const data = tagMapToArr(store.getters.tagList);
  const temp = new Map();
  for (let i = 0; i < data.length; i += 1) {
    const { modulePath, moduleName } = data[i];
    if (modulePath && moduleName) {
      temp.set(modulePath, { name: moduleName, path: modulePath });
    }
  }
  return [...temp.values()];
});

// 选中菜单
const onSelect = (item: any) => {
  state.show = false;
  onJump(findLast(item));
};

// 查询
const onSearch = () => {};
</script>
