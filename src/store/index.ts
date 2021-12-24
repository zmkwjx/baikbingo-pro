import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { StoreStateStruct as State } from "@/types";
import getters from "./getters";
import common from "./modules/common";
import user from "./modules/user";
import tags from "./modules/tags";
import { readAllCache, getCache } from "./cache";

// vuex 的 key
export const storeKey: InjectionKey<Store<State>> = Symbol("this is vuex key");

// 自定义使用vuex的钩子
export function useStore() {
  return baseUseStore(storeKey);
}

// 返回vuex实例
const store = createStore({
  getters,
  modules: {
    common,
    user,
    tags
  }
});
export default store;

// 初始化缓存
let isCache: boolean = true;
export const initStore = (): Promise<any> => {
  if (isCache) {
    return readAllCache().then(() => {
      store.state.user.userInfo = getCache({ name: "userInfo" }) || {};
      store.state.user.menu = getCache({ name: "menu" }) || [];
      store.state.user.token = getCache({ name: "token" }) || null;
      store.state.tags.tagList = getCache({ name: "tagList" }) || new Map();
      store.state.tags.tagStar = getCache({ name: "tagStar" }) || [];
      store.state.tags.tagFind = getCache({ name: "tagFind" }) || [];
      isCache = false;
    });
  }
  return Promise.resolve();
};
