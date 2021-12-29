<template>
  <el-dropdown
    ref="dropdownRef"
    class="bkpro-header-avatar"
    @command="onCommand"
  >
    <!-- 触发 -->
    <a title="个人中心" class="bkpro-header-btn" style="margin-left: 5px">
      <el-avatar :size="24" :src="userInfo.avatar" alt=""></el-avatar>
      <el-icon size="6" style="margin-left: 10px"><caret-bottom /></el-icon>
      <!-- <i
        style="font-size: 6px; margin-left: 10px"
        class="el-icon-caret-bottom"
      ></i> -->
    </a>
    <!-- 下拉菜单 -->
    <template #dropdown>
      <el-dropdown-menu class="bkpro-dropdown">
        <el-dropdown-item class="bkpro-header-avatar__info">
          <div class="bkpro-header-avatar__name">
            {{ userInfo.nickname }}
          </div>
          <div class="bkpro-header-avatar__account">
            账号ID ：{{ userInfo.account }}
          </div>
        </el-dropdown-item>
        <!-- 个人信息 -->
        <el-dropdown-item command="info" divided :icon="User">
          个人信息
        </el-dropdown-item>
        <!-- 修改密码 -->
        <el-dropdown-item command="password" :icon="Key">
          修改密码
        </el-dropdown-item>
        <!-- 系统设置 -->
        <!-- <el-dropdown-item command="setting" :icon="User">
          <e-setting ref="setting"></e-setting>
        </el-dropdown-item> -->
        <!-- 退出登录 -->
        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { computed, ref, nextTick } from "vue";
import { User, Key, CaretBottom } from "@element-plus/icons-vue";
import { ElMessageBox } from "element-plus";
import { useStore } from "@/store";
import { resetRouter } from "@/router";

// 获取实例
const $router = useRouter();
const $store = useStore();
const dropdownRef = ref();

// 处理样式
nextTick(() => {
  const dom = dropdownRef.value.$refs.scrollbar.$parent.$el;
  const className = `${dom.className} bkpro-dropdown`;
  dom.setAttribute("class", className);
});

// 变量
const userInfo = computed(() => $store.getters.userInfo);

// 退出登录

const logout = () => {
  ElMessageBox.confirm("退出系统, 是否继续?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    $store.dispatch("LogOut").then(() => {
      resetRouter();
      $router.push({ path: "/login" });
    });
  });
  // this.$confirm(this.$t("logoutTip"), this.$t("tip"), {
  //   confirmButtonText: this.$t("submitText"),
  //   cancelButtonText: this.$t("cancelText"),
  //   type: "warning"
  // }).then(() => {
  //   this.$store.dispatch("LogOut").then(() => {
  //     resetRouter();
  //     this.$router.push({ path: "/login" });
  //   });
  // });
};

// 指令
const onCommand = (key: string) => {
  switch (key) {
    case "info":
      $router.push({ path: "/info/index", query: { tab: "info" } });
      break;
    case "password":
      $router.push({
        path: "/info/index",
        query: { tab: "password" }
      });
      break;
    case "logout":
      logout();
      break;
    default:
      break;
  }
};
</script>
<style lang="scss">
.bkpro-header-avatar__info.el-dropdown-menu__item {
  flex-direction: column;
  align-items: flex-start;
}
.bkpro-header-avatar {
  display: flex;
  &__info {
    width: 180px;
  }
  &__info:hover {
    background-color: transparent !important;
  }
  &__name {
    color: #ffffff;
    font-size: 16px;
  }
  &__account {
    color: #cecece;
    font-size: 12px;
  }
}
</style>
