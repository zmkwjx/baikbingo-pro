<template>
  <i
    :class="`${customClass} iconfont bkico-${props.type}`"
    :style="{ fontSize: `${props.size}px`, color: props.color }"
  ></i>
</template>
<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: ""
  },
  customClass: {
    type: String,
    default: ""
  },
  size: {
    type: [Number, String],
    default: ""
  },
  color: {
    type: String,
    default: ""
  }
});
</script>
