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
          @keyup.enter.native="handleLogin(loginForm)"
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
          @keyup.enter.native="handleLogin(loginForm)"
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
      <el-button @click.native.prevent="handleLogin(loginForm)">
        登 录
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";

export default defineComponent({
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, message: "密码长度最少为6位", trigger: "blur" }
        ]
      }
    };
  },
  setup() {
    const loginRef = ref();
    const store = useStore();
    const router = useRouter();

    // 登录方法
    const handleLogin = (data: any) => {
      loginRef.value.validate((valid: any) => {
        if (valid) {
          store.dispatch("LoginByUsername", data).then(() => {
            router.push({ path: "/" });
          });
        }
      });
    };
    return {
      loginRef,
      handleLogin
    };
  }
});
</script>
