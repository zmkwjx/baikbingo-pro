import { Md5 } from "ts-md5/dist/md5";
import { ActionContext } from "vuex";
import { setCache } from "../cache";
import { useAPI } from "@/apis";
import {
  StoreUserStateStruct as State,
  StoreStateStruct as RootState
} from "@/types";

const API = useAPI();

// 异步操作
const actions = {
  // 获取系统菜单
  GetMenu({ commit }: ActionContext<State, RootState>): Promise<any> {
    return new Promise((resolve, reject) => {
      API.system
        .getMenuList()
        .then((res) => {
          const data = res?.data?.data || [];
          commit("SET_MENU", data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 账号密码登录
  LoginByUsername(
    { commit }: ActionContext<State, RootState>,
    value: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      API.user
        .login({
          username: value.username,
          password: Md5.hashStr(value.password)
        })
        .then((res) => {
          const data = res?.data?.data || {};
          // 设置用户数据
          commit("SET_USER_INFO", data);
          // 设置TOKEN
          commit("SET_TOKEN", data?.token);
          commit("SET_KEEP_ALIVE", true);
          // 出口
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  // 登出
  LogOut({ dispatch, commit }: ActionContext<State, RootState>): Promise<any> {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_USER_INFO", {});
      commit("SET_MENU", []);
      commit("SET_KEEP_ALIVE");
      dispatch("ClearTag");
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
  },
  SET_TOKEN: (state: State, value: string) => {
    state.token = value;
    setCache({ name: "token", content: state.token });
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
