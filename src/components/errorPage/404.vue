<template>
  <el-result
    icon="error"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <el-button type="primary" @click="goHome()">Back Home</el-button>
    </template>
  </el-result>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => {
  router.push("/");
};
</script>
