<template>
  <div class="bkpro-login-container">
    <div class="bkpro-login-canvas">
      <particles id="tsparticles" :options="options"></particles>
    </div>
    <div class="bkpro-login-wrapper" :class="{ 'show-wrapper': loading }">
      <div class="bkpro-login-wrapper-box">
        <div class="bkpro-login-wrapper-box__inner">
          <h1>baikbingo</h1>
          <p>
            baikbingo福利社开源的一套saas框架，框架集成element-plus、vuex4、particles.vue3等开源组件
          </p>
        </div>
        <div class="bkpro-login-wrapper-box__content"></div>
      </div>
      <!-- <div @click="login">登录</div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { useRouter } from "vue-router";
// import { useStore } from "@/store";
import { ref } from "vue";
import options from "./options.json";

// 缓存
const loading = ref(false);
setTimeout(() => {
  loading.value = true;
}, 100);

// const store = useStore();
// const router = useRouter();
const login = () => {
  // store.commit("SET_TOKEN", "dddddd");
  // router.push({ path: "/" });
};
</script>
