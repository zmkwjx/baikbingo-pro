<template>
  <i
    :class="`iconfont icon-${props.type}`"
    :style="{ fontSize: `${props.size}px`, color: props.color }"
  ></i>
</template>
<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: ""
  },
  size: {
    type: [Number, String],
    default: 14
  },
  color: {
    type: String,
    default: ""
  }
});
</script>
