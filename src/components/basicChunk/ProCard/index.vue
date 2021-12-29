<template>
  <div class="bkpro-card">
    <div class="bkpro-card__inner">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.bkpro-card {
  &__inner {
    width: 100%;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #ebeff5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    padding: 10px 20px;
    .bkpro-card {
      padding: unset;
    }
  }
}
</style>
