<template>
  <div class="bkpro-login-container">
    <div class="bkpro-login-canvas">
      <particles id="tsparticles" :options="options"></particles>
    </div>
    <div class="bkpro-login-wrapper" :class="{ 'show-wrapper': loading }">
      <div class="bkpro-login-wrapper-box">
        <div class="bkpro-login-wrapper-box__inner">
          <h1>Baikbingo Pro</h1>
          <p>
            baikbingo福利社开源的一套saas框架，框架集成element-plus、vuex4、particles.vue3等开源组件，初始账号密码：root/123456
          </p>
        </div>
        <div class="bkpro-login-wrapper-box__content">
          <div class="bkpro-login-main">
            <div class="bkpro-login-logo">
              <h2>Baikbingo 福利社</h2>
            </div>
            <div class="bkpro-login-type">
              <h3>账户登录</h3>
            </div>
            <user-login></user-login>
          </div>
        </div>
      </div>
      <!-- <div @click="login">登录</div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import options from "./options.json";
import userLogin from "./userLogin.vue";

// 缓存
const loading = ref(false);
setTimeout(() => {
  loading.value = true;
}, 100);
</script>
