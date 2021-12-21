import { RouteStruct } from "@/types";
import mockDataMenus from "./data/system/menus.json";

const getMenus = {
  url: "/mock/system/getMenus",
  method: "get",
  response: () => {
    let data: Array<RouteStruct> = [];
    data = mockDataMenus;
    return {
      code: 200,
      msg: "success",
      data
    };
  }
};

const mock = [];
mock.push(getMenus);
export default mock;
