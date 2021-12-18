<template>
  <div class="dscloud-wrapper">
    <!-- 顶部导航栏 -->
    <div class="dscloud-header">
      <header-nav />
    </div>
    <!-- 主内容 -->
    <div class="dscloud-container">
      <!-- 内容 -->
      <div class="dscloud-main">
        <div class="dscloud-page-root">
          <!-- 总览页面 -->
          <router-view />
        </div>
      </div>
      <!-- 回到顶部 -->
      <el-backtop target=".dscloud-container"></el-backtop>
    </div>
  </div>
</template>
