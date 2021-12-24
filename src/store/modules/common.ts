import { StoreCommonStateStruct as State } from "@/types";

// 同步操作
const mutations = {
  SET_COLLAPSE: (state: State) => {
    state.isCollapse = !state.isCollapse;
  }
};

// 状态树
const state = () => ({
  isCollapse: false
});

export default {
  state,
  mutations
};
