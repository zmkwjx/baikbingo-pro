<template>
  <main class="dscloud-layout-overview welhome">
    <div class="dscloud-layout-overview__content">
      <div class="dscloud-layout-overview__content-body">
        <div class="dscloud-layout-overview__content-body-inner">
          <div class="welhome-guide">
            <div class="welhome-guide-left">
              <div class="welhome-guide-left__btns">
                <div
                  class="welhome-guide-left__btns-item"
                  :class="{
                    'welhome-guide-left__btns-selected': item.value === showKey
                  }"
                  v-for="item in modules.filter((s) => s.value === showKey)"
                  :key="item.value"
                  @click="onSelect(item)"
                >
                  数据面板
                </div>
              </div>
              <div class="welhome-guide-left__editor">
                <i class="el-icon-s-tools" style="margin-right: 5px" />
                <span>管理面板</span>
              </div>
            </div>
            <div class="welhome-guide-right"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const showKey = ref("enthome");
const modules = ref([
  {
    label: "企业面板",
    value: "enthome"
  },
  {
    label: "项目面板",
    value: "project"
  }
]);

const onSelect = (item: { label: string; value: string }) => {
  showKey.value = item.value;
};
</script>

<style lang="scss">
.welhome {
  &-guide {
    margin-bottom: 12px;
    align-items: center;
    margin-top: 32px;
    position: relative;
    z-index: 1;
    display: flex;
    &-left {
      flex: 1;
      display: flex;
      text-align: left;
      &__btns {
        margin-right: 10px;
        vertical-align: middle;
        padding-left: 1px;
        display: inline-block;
        font-size: 0;
        margin-bottom: -5px;
        overflow: visible;
        &-selected {
          color: #2e72ff !important;
          border-color: #2e72ff !important;
          background-color: transparent !important;
          z-index: 1 !important;
        }
        &-item:hover {
          border-color: #585858;
          background-color: #262f3e;
          transition: all 0.3s ease-in-out;
        }
        &-item {
          cursor: pointer;
          background-color: transparent;
          border: 1px solid #585858;
          color: #fff;
          max-width: 6em;
          min-width: 24px;
          overflow: hidden;
          text-overflow: ellipsis;
          box-sizing: content-box;
          padding: 0 10px;
          appearance: none;
          text-decoration: none;
          font-size: 12px;
          height: 30px;
          line-height: 30px;
          margin-left: -1px;
          text-align: center;
          z-index: 0;
          border-radius: 2px;
          float: left;
          position: relative;
          margin-bottom: 5px;
          margin-right: 0;
          user-select: none;
        }
      }
      &__editor {
        cursor: pointer;
        background-color: transparent;
        border: 1px solid #585858;
        color: #fff;
        max-width: 6em;
        min-width: 24px;
        overflow: hidden;
        padding: 0 10px;
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 0;
        position: relative;
        margin-bottom: 5px;
        user-select: none;
      }
    }
    &-right {
      flex: 1;
    }
  }
  .card {
    position: relative;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(54, 58, 80, 0.32);
    background-color: #ffffff;
    // box-shadow: 0 2px 12px 0 rgba(110, 110, 110, 0.1);
    .__head {
      margin-bottom: 20px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
    }
    .__body {
      flex: 1;
    }

    .el-table::before {
      height: 0;
    }
    .el-table td,
    .el-table th.is-leaf {
      border-bottom: none;
    }
    .el-table .cell {
      padding-left: 0px;
      padding-right: 0px;
    }
    .el-table td,
    .el-table th {
      padding: 0;
      padding-bottom: 7px;
    }
  }
}
</style>
