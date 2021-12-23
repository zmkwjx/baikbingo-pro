import request from "@/apis/request";

export default {
  getMenuList: () => {
    return request.get("/mock/system/getMenus");
  }
};
