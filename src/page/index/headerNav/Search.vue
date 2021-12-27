<template>
  <div class="bkpro-header-search-wrap">
    <el-popover
      v-model:visible="show"
      :show-arrow="false"
      :offset="0"
      :width="600"
      popper-class="bkpro-popover"
      placement="bottom-start"
      trigger="hover"
    >
      <!-- 触发 -->
      <template #reference>
        <div class="bkpro-header-search">
          <el-input
            placeholder="搜索模块、页面"
            v-model="searchVal"
            @focus="onFocus"
            clearable
            @change="onSearch"
          >
            <template #append>
              <el-button :icon="SearchIcon" @click="onSearch"></el-button>
            </template>
          </el-input>
        </div>
      </template>
      <!-- 选择 -->
      <div class="bkpro-header-search-panel">
        <!-- 搜索结果 -->
        <div v-if="searchMsg" class="bkpro-header-search-panel__result">
          <div class="bkpro-header-search-panel__result-tips">
            <pro-icon type="info-circle" style="margin-right: 5px"></pro-icon>
            <span v-html="searchMsg"></span>
          </div>
          <div v-if="searchArr[0]" class="bkpro-header-search-panel-history">
            <div class="bkpro-header-search-panel-history-head">
              <div class="bkpro-header-search-panel-history-head__title">
                <h3>查询结果</h3>
              </div>
            </div>
            <ul class="bkpro-header-search-panel-history-list">
              <li
                v-for="item in searchArr"
                :key="item.id"
                @click="onSelect(item)"
              >
                <a class="bkpro-header-search-panel-history-list__item">
                  <span>{{ item.name }}</span>
                  <p>{{ getParentName(item) }}</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 搜索历史 -->
        <div v-else class="bkpro-header-search-panel__start">
          <div class="bkpro-header-search-panel-history">
            <div class="bkpro-header-search-panel-history-head">
              <div class="bkpro-header-search-panel-history-head__title">
                <h3>搜索历史</h3>
              </div>
              <div
                class="bkpro-header-search-panel-history-head__clear"
                title="清除所有历史记录"
              >
                <i class="el-icon-delete-solid" @click="clearSearchHistory"></i>
              </div>
            </div>
            <ul
              v-if="searchHistory[0]"
              class="bkpro-header-search-panel-history-list"
            >
              <li
                v-for="(name, index) in searchHistory"
                :key="`__history_${index}`"
              >
                <a class="bkpro-header-search-panel-history-list__item">
                  <span @click="useSearchHistory(index)">{{ name }}</span>
                  <button @click="delSearchHistory(index)">清除</button>
                </a>
              </li>
            </ul>
            <div v-else class="bkpro-header-search-panel-history-status">
              暂无搜索历史
            </div>
          </div>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { Search as SearchIcon } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { useStore } from "@/store";
import { RouterMenuStruct } from "@/types";
import mixins from "./mixins";

// 获取实例
const $router = useRouter();
const $store = useStore();

// 变量
const show = ref<boolean>(false);
const searchVal = ref<string>("");
const searchMsg = ref<string>("");
const searchArr = ref<RouterMenuStruct[]>([]); // 搜索结果
const dataSource = ref<RouterMenuStruct[]>([]); // 源数据
const searchHistory = ref<Array<string>>($store.getters.tagFind || []); // 搜索记录

// 拆分结构
const childrenToArray = (data: RouterMenuStruct[] = []): RouterMenuStruct[] => {
  const cache = [];
  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    cache.push(item);
    if (data[i].children) {
      cache.push(...childrenToArray(data[i].children));
    }
  }
  return cache;
};

const onFocus = () => {
  show.value = true;
};
// 返回父级名字
const getParentName = (item: RouterMenuStruct): string => {
  const res = dataSource.value.find((s) => s.id === item.pid);
  if (res) {
    return res.name || "";
  }
  return "";
};
// 存储搜索记录
const logSearchHistory = () => {
  $store.dispatch("SetTagFind", searchHistory.value);
};
// 添加搜索记录
const addSearchHistory = () => {
  if (searchVal.value && !searchHistory.value.includes(searchVal.value)) {
    searchHistory.value.push(searchVal.value);
  }
  logSearchHistory();
};
// 清空搜索记录
const clearSearchHistory = () => {
  searchHistory.value = [];
  logSearchHistory();
};
// 删除搜索记录
const delSearchHistory = (index: number) => {
  searchHistory.value.splice(index, 1);
  logSearchHistory();
};
// 选中菜单
const onSelect = (item: any) => {
  show.value = false;
  const { path } = mixins.findLast(item);
  $router.push({ path });
  addSearchHistory();
};
// 开始查询
const onSearch = (value: string) => {
  searchVal.value = value.replace(/^\s+|\s+$/g, "");
  if (searchVal.value) {
    searchArr.value = dataSource.value.filter((item) => {
      const flag1 = item.name.includes(searchVal.value);
      const flag2 = item.pid !== 0;
      return flag1 && flag2;
    });
    searchMsg.value = `搜索“${searchVal.value}”，共找到<em>${searchArr.value.length}</em>条结果`;
  } else {
    searchMsg.value = "";
    searchArr.value = [];
  }
};
// 选择某条记录
const useSearchHistory = (index: number) => {
  onSearch(searchHistory.value[index]);
};
// 初始化源数据
const initData = (value: RouterMenuStruct[]) => {
  const data = childrenToArray(JSON.parse(JSON.stringify(value)));
  dataSource.value = data.filter((item) => mixins.ishide(item)) || [];
  addSearchHistory();
};
initData($store.getters.menu || []);
// 监听
watch($store.getters.menu, (data: RouterMenuStruct[]) => {
  if (data[0]) {
    initData(data.filter((item) => mixins.ishide(item)));
  }
});
</script>
