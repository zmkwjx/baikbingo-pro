import { v4 as uuidv4 } from "uuid";
import { StoreCommonStateStruct as State } from "@/types";
import { setCache } from "../cache";

// 同步操作
const mutations = {
  SET_KEEP_ALIVE: (state: State, value: boolean) => {
    state.keepAlive = value ? uuidv4() : false;
    setCache({ name: "keepAlive", content: state.keepAlive });
  },
  SET_COLLAPSE: (state: State) => {
    state.isCollapse = !state.isCollapse;
  }
};

// 状态树
const state = () => ({
  isCollapse: false,
  keepAlive: true
});

export default {
  state,
  mutations
};
