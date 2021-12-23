<template>
  <el-result icon="error" title="500" sub-title="Sorry, something went wrong.">
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
