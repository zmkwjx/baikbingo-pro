<template>
  <el-popover
    v-model:visible="show"
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
            <ul v-if="stars[0]" class="bkpro-menus-overlay-box__table">
              <li
                v-for="item in stars"
                :key="`__star_${item.id}`"
                style="opacity: 1"
              >
                <div :title="item.name" class="bkpro-menus-overlay-box__btn">
                  <span @click="onSelect(item)">{{ item.name }}</span>
                  <pro-icon
                    type="close-circle-fill"
                    title="从快捷访问移除"
                    @click="onStarDel(item)"
                  ></pro-icon>
                </div>
              </li>
            </ul>
            <div v-else class="dscloud-menus-overlay-box__tips">
              暂无数据，您可以通过右侧模块列表添加快捷访问
            </div>
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
            <div class="bkpro-menus-overlay-panel__header--right">
              <el-input
                v-model="searchVal"
                placeholder="搜索模块、页面"
                clearable
                @change="onSearch"
                :suffix-icon="Search"
              ></el-input>
            </div>
          </div>
          <!-- 模块菜单 -->
          <div class="bkpro-menus-overlay-panel__body">
            <div
              v-if="searchMsg"
              class="bkpro-menus-overlay-panel__search-tips"
            >
              <pro-icon
                type="info-circle"
                style="margin-right: 5px; margin-top: 3px"
              ></pro-icon>
              <span>{{ searchMsg }}</span>
            </div>
            <div class="bkpro-menus-overlay-grid">
              <div
                class="bkpro-menus-overlay-grid__item"
                v-for="i in 5"
                :key="`__group_${i}`"
              >
                <div
                  class="bkpro-menus-overlay-grid__box"
                  v-for="group in getCellData(i)"
                  :key="group.id"
                >
                  <div class="bkpro-menus-overlay-box__group">
                    <div
                      :title="group.name"
                      class="bkpro-menus-overlay-box__label"
                    >
                      <pro-icon :type="group.icon"></pro-icon>
                      <span>{{ group.name }}</span>
                    </div>
                    <ul class="bkpro-menus-overlay-list">
                      <li
                        class="bkpro-menus-overlay-list-item"
                        v-for="child in group.children"
                        :key="child.id"
                      >
                        <pro-icon
                          v-if="isStar(child)"
                          type="star-fill"
                          title="已添加至快捷访问"
                          style="color: rgb(234, 122, 32); opacity: 1"
                          @click="onStarDel(child)"
                        ></pro-icon>
                        <pro-icon
                          v-else
                          type="star"
                          title="添加至快捷访问"
                          @click="onStarAdd(child)"
                        ></pro-icon>
                        <span :title="child.name" @click="onSelect(child)">
                          {{ child.name }}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import { Search, CaretBottom } from "@element-plus/icons-vue";
import { ref, computed, PropType, defineEmits, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { RouterMenuStruct } from "@/types";
import mixins from "./mixins";

// 获取实例
const $store = useStore();
const $router = useRouter();

// 传入值
const $props = defineProps({
  stars: {
    type: Array as PropType<RouterMenuStruct[]>,
    required: true
  }
});

// 变量
const show = ref<boolean>(false);
const searchVal = ref<string>();
const searchMsg = ref<string | boolean>(false);
// 菜单源数据
const dataSource = ref<RouterMenuStruct[]>([]);
// 过滤菜单
const menus = ref<RouterMenuStruct[]>([]);
// 系统工具
const tools = ref<RouterMenuStruct[]>([]);

// 计算属性
const tags = computed(() => {
  const data = mixins.tagMapToArr($store.getters.tagList);
  const temp = new Map();
  for (let i = 0; i < data.length; i += 1) {
    const { modulePath, moduleName } = data[i];
    if (modulePath && moduleName) {
      temp.set(modulePath, { name: moduleName, path: modulePath });
    }
  }
  return [...Array.from(temp).map((a) => a[1])];
});

// 选中菜单
const onSelect = (item: any) => {
  show.value = false;
  const { path } = mixins.findLast(item);
  $router.push({ path });
};

// 查询
const onSearch = (value: string = "") => {
  let nums = 0;
  const data = [];
  // 筛选方法
  const search = (item: RouterMenuStruct): boolean => {
    const flag1 = mixins.ishide(item);
    const flag2 = item.name.includes(value.replace(/^\s+|\s+$/g, ""));
    const child = item.children || [];
    const flag3 = !child[0] || child.findIndex((s) => s.remark !== "hide") > -1;
    return flag1 && flag2 && flag3;
  };
  // 遍历
  for (let i = 0; i < dataSource.value.length; i += 1) {
    const cache = [];
    const child = dataSource.value[i].children || [];
    // 筛选子项
    for (let j = 0; j < child.length; j += 1) {
      if (search(child[j])) {
        cache.push(child[j]);
      }
    }
    // 筛选添加
    if (cache[0] && mixins.ishide(dataSource.value[i])) {
      nums += cache.length;
      data.push({ ...dataSource.value[i], children: cache });
    }
  }
  menus.value = data;
  searchMsg.value = value ? `搜索“${value}”，共找到 ${nums} 个模块` : false;
};

// 初始化数据
const initData = (value: RouterMenuStruct[]) => {
  dataSource.value = value.filter(
    (item) => item.remark !== "tools" && mixins.ishide(item)
  );
  // 设置工具栏
  const toolsTemp = value.find((item) => item.remark === "tools");
  if (toolsTemp && toolsTemp.children && toolsTemp.children[0]) {
    tools.value = toolsTemp.children;
  }
  // 开始搜索
  onSearch();
};
initData(JSON.parse(JSON.stringify($store.getters.menu)));
watch($store.getters.menu, (data: RouterMenuStruct[]) => {
  initData(JSON.parse(JSON.stringify(data)));
});

// 返回数据
const getCellData = (i: number): RouterMenuStruct[] => {
  // 分页数
  const g = [0, 0, 0, 0, 0];
  // 总数
  const n = Number(menus.value.length);
  // 平分剩余
  let d = Math.floor(n % 5);
  // 均分
  const l = Math.floor((n - d) / 5);
  // 计算每个分页数量
  for (let k = 0; k < 5; k += 1) {
    g[k] = l;
    if (d > 0) {
      g[k] += 1;
      d -= 1;
    }
  }
  // 返回结果
  const s = g.reduce((a, b, k) => (k < i - 1 ? a + b : a));
  const e = g.reduce((a, b, k) => (k < i ? a + b : a));
  return menus.value.slice(i > 1 ? s : 0, e);
};

// 是否已经收藏
const isStar = (item: RouterMenuStruct): boolean => {
  const i = $props.stars.findIndex((s) => s.id === item.id);
  return i > -1;
};

// 获取 emit
const emit = defineEmits(["on-star-add", "on-star-del"]);

// 删除收藏菜单
const onStarDel = (item: RouterMenuStruct) => {
  emit("on-star-del", item);
};

// 收藏菜单
const onStarAdd = (item: RouterMenuStruct) => {
  emit("on-star-add", item);
};
</script>
