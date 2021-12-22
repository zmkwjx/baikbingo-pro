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
            <i class="iconfont icon-user" s></i>
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
            <i class="iconfont icon-lock_fill" style="font-size: 18px"></i>
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
    const handleLogin = () => {
      loginRef.value.validate((valid: any) => {
        if (valid) {
          store.commit("SET_TOKEN", "dddddd");
          router.push({ path: "/" });
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
