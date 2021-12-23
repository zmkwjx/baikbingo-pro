import { useRouter } from "vue-router";
import { RouteStruct } from "@/types";

const router = useRouter();

// 是否隐藏
const ishide = (item: any) => {
  return item.remark !== "hide";
};

// 找到最后一个
const findLast = (item: RouteStruct): RouteStruct => {
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
const onJump = (item: RouteStruct) => {
  router.push({ path: item.path });
};

export default {
  ishide,
  findLast,
  onJump
};
