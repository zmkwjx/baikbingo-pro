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
  meta?: {
    title?: string;
    cache?: boolean;
  };
  children?: RouteStruct[];
  redirect?: string;
}

export interface RouterPluginStruct {
  $router: any;
  $store: any;
  install: Function;
}
