<template>
  <el-empty description="Sorry, something went wrong.">
    <h2>500</h2>
    <el-button type="primary" @click="goHome()">Back Home</el-button>
  </el-empty>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>
