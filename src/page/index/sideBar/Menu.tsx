import { defineComponent, computed, PropType } from "vue";
import { useStore } from "@/store";
import { RouterMenuStruct } from "@/types";

// 是否隐藏
const ishide = (item: RouterMenuStruct): boolean => {
  return item.remark !== "hide";
};

export default defineComponent({
  props: {
    menu: {
      type: Array as PropType<RouterMenuStruct[]>,
      default: () => []
    },
    active: String
  },
  setup(props) {
    // 获取实例
    const $store = useStore();

    // 侧边菜单展开状态
    const isCollapse = computed(() => $store.getters.isCollapse);

    // 子集判断
    const itemRender = (data: RouterMenuStruct, icon: boolean = true) => {
      return (
        <el-menu-item
          index={data.path}
          style="padding-left: 20px;"
          v-slots={{
            title: () => <span>{data.name}</span>
          }}
        >
          {icon ? <pro-icon type={data.icon || "location"}></pro-icon> : null}
        </el-menu-item>
      );
    };

    // 下拉渲染
    const itemSubRender = (data: RouterMenuStruct) => {
      const jsxdom = [];
      const children = data?.children || [];
      for (let i = 0; i < children.length; i++) {
        const item = children[i];
        ishide(item) && jsxdom.push(itemRender(children[i], false));
      }
      return (
        <el-sub-menu
          index={data.path}
          v-slots={{
            title: () => {
              const render = [];
              render.push(<pro-icon type={data.icon || "location"}></pro-icon>);
              isCollapse.value || render.push(<span>{data.name}</span>);
              return render;
            }
          }}
        >
          {...jsxdom}
        </el-sub-menu>
      );
    };

    // 分组渲染
    const itemGroupRender = (data: RouterMenuStruct) => {
      const jsxdom = [];
      const children = data?.children || [];
      for (let i = 0; i < children.length; i++) {
        const item = children[i];
        if (item.children && item.children[0]) {
          ishide(item) && jsxdom.push(itemSubRender(item));
        } else {
          ishide(item) && jsxdom.push(itemRender(item));
        }
      }
      return (
        <el-menu-item-group
          v-slots={{
            title: () =>
              isCollapse.value ? (
                <pro-icon type="minus" />
              ) : (
                <span>{data.name}</span>
              )
          }}
        >
          {jsxdom}
        </el-menu-item-group>
      );
    };

    // 返回结果
    const menuRender = (menu: RouterMenuStruct[]) => {
      const jsxdom = [];
      for (let i = 0; i < menu.length; i += 1) {
        const item = menu[i];
        if (item.children && item.children[0]) {
          ishide(item) && jsxdom.push(itemGroupRender(item));
        } else {
          ishide(item) && jsxdom.push(itemRender(item));
        }
      }
      return jsxdom;
    };

    // 菜单
    const content = menuRender(props.menu);
    return () => (
      <el-menu
        unique-opened
        default-active={props.active}
        mode="vertical"
        show-timeout={200}
        collapse={isCollapse.value}
        router
      >
        {...content}
      </el-menu>
    );
  }
});
