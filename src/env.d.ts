/// <reference types="vite/client" />

declare module "particles.vue3";

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@baikbingo/cache" {
  const Cache: any;
  export default Cache;
  export function createCache(): any;
}

declare module "mockjs";
