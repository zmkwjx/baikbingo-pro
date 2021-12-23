<template>
  <main class="bkpro-layout-overview dashboard">
    <div class="bkpro-layout-overview__content">
      <div class="bkpro-layout-overview__content-body">
        <div class="bkpro-layout-overview__content-body-inner">
          <div class="dashboard-guide">
            <div class="dashboard-guide-left">
              <div class="dashboard-guide-left__btns">
                <div
                  class="dashboard-guide-left__btns-item"
                  :class="{
                    'dashboard-guide-left__btns-selected':
                      item.value === showKey
                  }"
                  v-for="item in modules"
                  :key="item.value"
                  @click="onSelect(item)"
                >
                  {{ item.label }}
                </div>
              </div>
              <div class="dashboard-guide-left__editor">
                <pro-icon
                  type="setting-o"
                  size="12"
                  style="margin-right: 5px"
                />
                <span>管理面板</span>
              </div>
            </div>
            <div class="dashboard-guide-right"></div>
          </div>
          <div class="dashboard-main">
            <div class="element">
              <div class="item1 card">1</div>
              <div class="item2 card">2</div>
              <div class="item3 card">3</div>
              <div class="item4 card">4</div>
              <div class="item5 card">5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const showKey = ref("test1");
const modules = ref([
  {
    label: "数据面板",
    value: "test1"
  },
  {
    label: "监控面板",
    value: "test2"
  }
]);

const onSelect = (item: { label: string; value: string }) => {
  showKey.value = item.value;
};
</script>

<style lang="scss">
.dashboard-main {
  position: relative;
  width: 100%;
  height: 100%;
  .element {
    width: 100%;
    height: 100%;
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: repeat(81, calc(100% / 81));
    grid-template-columns: repeat(166, calc(100% / 166));
    .item1 {
      height: 600px;
      grid-area: 1 / 1 / 82 / 116;
    }
    .item2 {
      height: 90px;
      grid-area: 1 / 117 / 13 / 167;
    }
    .item3 {
      height: 90px;
      grid-area: 14 / 117 / 26 / 167;
    }
    .item4 {
      height: 170px;
      grid-area: 27 / 117 / 50 / 167;
    }
    .item5 {
      height: 230px;
      grid-area: 51 / 117 / 82 / 167;
    }
  }
  .compile {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
}

.dashboard {
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
