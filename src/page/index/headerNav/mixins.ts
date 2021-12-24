import { useRouter } from "vue-router";
import { RouteStruct, TagStruct } from "@/types";

// 是否隐藏
export const ishide = (item: any) => {
  return item.remark !== "hide";
};

// 找到最后一个
export const findLast = (item: RouteStruct): RouteStruct => {
  const child = item.children || [];
  for (let i = 0; i < child.length; i += 1) {
    if (!ishide(child[i])) {
      continue;
    } else if (child[i].children) {
      return findLast(child[i]);
    } else {
      return child[i];
    }
  }
  return item;
};

// 页面跳转
export const onJump = (item: RouteStruct) => {
  const router = useRouter();
  router.push({ path: item.path });
};

// 序列化标签
export const tagMapToArr = (data: Map<string, TagStruct>): TagStruct[] => {
  const arr = [...data.values()];
  arr.sort((a: TagStruct, b: TagStruct) => b.timestamp - a.timestamp);
  return arr.slice(0, 50);
};
