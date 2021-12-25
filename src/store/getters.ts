import { StoreStateStruct as State } from "@/types";

const getters = {
  // 用户模块
  userInfo: (state: State) => state.user.userInfo,
  menu: (state: State) => state.user.menu,
  token: (state: State) => state.user.token,
  // 工具模块
  isCollapse: (state: State) => state.common.isCollapse,
  // 标签模块
  tagList: (state: State) => state.tags.tagList,
  tagStar: (state: State) => state.tags.tagStar,
  tagFind: (state: State) => state.tags.tagFind
};

export default getters;
