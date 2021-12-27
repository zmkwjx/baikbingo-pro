<template>
  <el-popover
    :offset="0"
    :show-arrow="false"
    :width="300"
    popper-class="bkpro-popover"
    placement="bottom-start"
    trigger="hover"
  >
    <!-- 触发 -->
    <template #reference>
      <a title="操作记录" class="bkpro-header-btn">
        <pro-icon type="tags-fill" size="18"></pro-icon>
      </a>
    </template>
    <!-- 选择 -->
    <div class="bkpro-tags">
      <div class="bkpro-tags-title">
        <h3>操作记录</h3>
      </div>
      <div class="bkpro-tags-content">
        <div
          class="bkpro-tags__item"
          v-for="(item, index) in tags"
          :key="`__tags_${index}`"
          @click="onJump(item)"
        >
          <div class="bkpro-tags__item-head">
            <div class="bkpro-tags__item-head-name" :title="item.name">
              {{ item.name }}
            </div>
            <div class="bkpro-tags__item-head-more" :title="item.moduleName">
              {{ item.moduleName }}
            </div>
          </div>
          <div class="bkpro-tags__item-path" :title="item.path">
            <i class="el-icon-location-outline"></i>
            {{ item.path }}
          </div>
          <div
            class="bkpro-tags__item-time"
            :title="dateFormat(item.timestamp)"
          >
            <i class="el-icon-time"></i>
            {{ dateFormat(item.timestamp) }}
          </div>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useStore } from "@/store";
import { TagStruct } from "@/types";
import * as util from "@/util/date";

// 获取实例
const $router = useRouter();
const $store = useStore();

// 变量
const tags = ref<TagStruct[]>();
// 格式化日期
const dateFormat = (a: number): string => {
  const date = new Date(a);
  return util.dateFormat(date);
};

// 页面跳转
const onJump = (item: TagStruct) => {
  $router.push({ path: item.path });
};

// 设置数据
const setData = (value: Map<string, TagStruct>) => {
  if (value) {
    const arr = Array.from(value).map((item) => item[1]);
    arr.sort((a, b) => b.timestamp - a.timestamp);
    tags.value = arr.filter((item) => item.path !== "/").slice(0, 50);
  }
};
setData($store.getters.tagList);
watch($store.getters.tagList, (value: Map<string, TagStruct>) =>
  setData(value)
);
</script>
<style lang="scss" scoped>
.bkpro-tags {
  width: 300px;
  &-title {
    padding: 10px;
    h3 {
      display: block;
      font-size: 16px;
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
    }
  }
  &__item {
    cursor: pointer;
    border: 1px solid #344258;
    border-radius: 4px;
    margin-bottom: 15px;
    padding: 10px;
    color: #999999;
    &-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      &-name {
        font-weight: 800;
      }
      &-more {
        font-size: 12px;
      }
    }
    &-path {
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 2px 0;
    }
    &-time {
      font-size: 12px;
    }
  }
  &__item:hover {
    color: #fff;
    border: 1px solid #506483;
  }
  &-content {
    max-height: 500px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px;
  }
}
</style>
