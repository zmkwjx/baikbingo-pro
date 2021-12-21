const getters = {
  // 用户模块
  userInfo: (state: any) => state.user.userInfo,
  menu: (state: any) => state.user.menu,
  token: (state: any) => state.user.token,
  // 工具模块
  isCollapse: (state: any) => state.common.isCollapse
};

export default getters;
