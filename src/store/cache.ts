import { createCache } from "@baikbingo/cache";
import { toRaw } from "@vue/reactivity";
import config from "@/config";

// 返回实例
const keyName = `${config.clientName}-`;
export const cache = createCache();

// 遍历缓存
export const readAllCache = () => {
  return cache.readAll();
};

// 获取缓存
export const getCache = ({ name }: { name: string }) => {
  const key = keyName + name;
  return cache.syncGet(key);
};

// 设置缓存
export const setCache = ({ name, content }: { name: string; content: any }) => {
  const key = keyName + name;
  return cache.set(key, toRaw(content));
};

// 删除缓存
export const delCache = ({ name }: { name: string }) => {
  const key = keyName + name;
  return cache.del(key);
};

// 清空缓存
export const clearCache = () => {
  return cache.clearCache();
};
