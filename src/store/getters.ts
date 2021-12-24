const getters = {
  // 用户模块
  userInfo: (state: any) => state.user.userInfo,
  menu: (state: any) => state.user.menu,
  token: (state: any) => state.user.token,
  // 工具模块
  isCollapse: (state: any) => state.common.isCollapse,
  // 标签模块
  tagList: (state: any) => state.tags.tagList,
  tagStar: (state: any) => state.tags.tagStar,
  tagFind: (state: any) => state.tags.tagFind
};

export default getters;
