<template>
  <el-popover
    v-model="state.show"
    :visible-arrow="false"
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
  </el-popover>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from "vue";
import { CaretBottom } from "@element-plus/icons-vue";

const state = reactive({
  show: false
});
toRefs(state);
</script>
