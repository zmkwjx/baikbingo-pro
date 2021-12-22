<template>
  <div class="bkpro-wrapper">
    <!-- 顶部导航栏 -->
    <div class="bkpro-header">
      <header-nav />
    </div>
    <!-- 主内容 -->
    <div class="bkpro-container">
      <!-- 内容 -->
      <div class="bkpro-main">
        <div class="bkpro-page-root">
          <!-- 总览页面 -->
          <router-view />
        </div>
      </div>
      <!-- 回到顶部 -->
      <el-backtop target=".bkpro-container"></el-backtop>
    </div>
  </div>
</template>
