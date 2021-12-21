export interface RouteMetaStruct {
  title?: string;
  cache?: boolean;
  isAuth?: boolean;
}

/**
 * 动态路由结构体
 *
 * @export
 * @interface RouteStruct
 */
export interface RouteStruct {
  path: string;
  name: string;
  icon: string;
  meta?: RouteMetaStruct;
  children?: RouteStruct[];
  redirect?: string;
}

export interface RouterPluginStruct {
  $router: any;
  $store: any;
  install: Function;
}
