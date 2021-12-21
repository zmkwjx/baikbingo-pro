import { ActionContext } from "vuex";
import { setCache } from "../cache";
import {
  StoreUserStateStruct as State,
  StoreStateStruct as RootState
} from "@/types";

// 异步操作
const actions = {
  // 获取系统菜单
  GetMenu(
    { commit }: ActionContext<State, RootState>,
    value: any
  ): Promise<any> {
    return new Promise((resolve: any) => {
      commit("SET_MENU", value);
      resolve();
    });
  }
};

// 同步操作
const mutations = {
  SET_USER_INFO: (state: State, value: object) => {
    state.userInfo = value;
    setCache({ name: "userInfo", content: state.userInfo });
  },
  SET_MENU: (state: State, value: Array<object>) => {
    state.menu = value;
    setCache({ name: "menu", content: state.menu });
  }
};

// 状态树
const state = () => ({
  userInfo: {},
  menu: [],
  token: null
});

export default {
  // namespaced: true,
  state,
  actions,
  mutations
};
