import { defineAsyncComponent } from "vue";
/**
 * 全局异步组件自动注册
 * 全局组件各个组件按文件夹区分，文件夹名称与组件名无关联，但建议与组件名保持一致
 */
const requireComponent = import.meta.globEager("./**/index.vue");

/**
 * 编写插件
 */
const install = (app: any) => {
  Object.keys(requireComponent).forEach((fileName) => {
    const config = requireComponent[fileName];
    const componentName = fileName
      .replace(/\/index.vue/, "")
      .split("/")
      .pop();
    const component = defineAsyncComponent(() => Promise.resolve(config));
    app.component(componentName, component);
  });
};

/**
 * 导出插件
 */
export default {
  install
};
