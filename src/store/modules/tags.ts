import { ActionContext } from "vuex";
import {
  StoreTagStateStruct as State,
  StoreStateStruct as RootState,
  TagStruct
} from "@/types";
import { setCache } from "../cache";

// 异步操作
const actions = {
  SetTag({ commit }: ActionContext<State, RootState>, data: TagStruct) {
    commit("SET_TAG", data);
  },
  SetTagStar({ commit }: ActionContext<State, RootState>, data: TagStruct[]) {
    commit("SET_TAG_STAR", data);
  },
  ClearTag({ commit }: ActionContext<State, RootState>) {
    commit("DEL_ALL_TAG");
    commit("SET_TAG_STAR", []);
    commit("SET_TAG_FIND", []);
  }
};

// 同步操作
const mutations = {
  SET_TAG: (state: State, data: TagStruct) => {
    const { path } = data;
    state.tagList.set(path, data);
    setCache({ name: "tagList", content: state.tagList });
  },
  DEL_TAG: (state: State, path: String) => {
    state.tagList.delete(path);
    setCache({ name: "tagList", content: state.tagList });
  },
  DEL_ALL_TAG: (state: State) => {
    state.tagList = new Map();
    setCache({ name: "tagList", content: state.tagList });
  },
  SET_TAG_STAR: (state: State, data: TagStruct[]) => {
    state.tagStar = data;
    setCache({ name: "tagStar", content: state.tagStar });
  },
  SET_TAG_FIND: (state: State, data: string[]) => {
    state.tagFind = data;
    setCache({ name: "tagFind", content: state.tagFind });
  }
};

// 状态树
const state = () => ({
  tagList: new Map(), // 访问记录
  tagStar: [], // 收藏的标签
  tagFind: [] // 搜索历史
});

export default {
  state,
  actions,
  mutations
};
