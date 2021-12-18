import { CommonStoreStruct } from "@/types";

export default {
  state: () => ({
    isCollapse: false
  }),
  mutations: {
    SET_COLLAPSE: (state: CommonStoreStruct) => {
      state.isCollapse = !state.isCollapse;
    }
  }
};
