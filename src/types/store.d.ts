import { TagStruct } from "./tag";

export interface StoreUserStateStruct {
  userInfo: object;
  menu: Array<object>;
  token: string;
}

export interface StoreCommonStateStruct {
  isCollapse: boolean;
}

export interface StoreTagStateStruct {
  tagList: Map<String, TagStruct>;
  tagStar: Array<TagStruct>;
  tagFind: Array<String>;
}

export interface StoreStateStruct {
  user: StoreUserStateStruct;
  common: StoreCommonStateStruct;
  tags: StoreTagStateStruct;
}
