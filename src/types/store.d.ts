export interface StoreUserStateStruct {
  userInfo: object;
  menu: Array<object>;
  token: string;
}

export interface StoreCommonStateStruct {
  isCollapse: boolean;
}

export interface StoreStateStruct {
  user: StoreUserStateStruct;
  common: StoreCommonStateStruct;
}
