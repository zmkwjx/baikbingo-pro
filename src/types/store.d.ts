import { RouterMenuStruct } from "./router";
import { TagStruct } from "./tag";

export interface StoreUserStateStruct {
  userInfo: object;
  menu: Array<object>;
  token: string;
}

export interface StoreCommonStateStruct {
  isCollapse: boolean;
  keepAlive: boolean | string;
}

export interface StoreTagStateStruct {
  tagList: Map<String, TagStruct>;
  tagStar: RouterMenuStruct[];
  tagFind: Array<String>;
}

export interface StoreStateStruct {
  user: StoreUserStateStruct;
  common: StoreCommonStateStruct;
  tags: StoreTagStateStruct;
}
