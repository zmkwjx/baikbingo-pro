<template>
  <div class="bkpro-login-form">
    <el-form
      ref="loginRef"
      :model="loginForm"
      :rules="loginRules"
      status-icon
      label-width="0"
    >
      <el-form-item prop="username">
        <el-input
          @keyup.enter.native="handleLogin"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="请输入用户名"
          clearable
        >
          <template #prefix>
            <pro-icon type="user" size="16" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          @keyup.enter.native="handleLogin"
          v-model="loginForm.password"
          auto-complete="off"
          type="password"
          placeholder="请输入密码"
          show-password
          clearable
        >
          <template #prefix>
            <pro-icon type="lock_fill" size="18" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <!-- 提交 -->
    <div class="bkpro-login-submit">
      <el-button @click.native.prevent="handleLogin">登 录</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { reactive, toRefs, ref } from "vue";
import { useStore } from "@/store";

// 获取实例
const loginRef = ref();
const store = useStore();
const router = useRouter();

// 变量
const loginForm = reactive({
  username: "",
  password: ""
});
const loginRules = reactive({
  username: "",
  password: ""
});
toRefs([loginForm, loginRules]);

// 登录方法
const handleLogin = () => {
  loginRef.value.validate((valid: any) => {
    if (valid) {
      store.dispatch("LoginByUsername", loginForm).then(() => {
        router.push({ path: "/" });
      });
    }
  });
};
</script>
