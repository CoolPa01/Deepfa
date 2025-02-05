<template>
  <div id="app">
    <!-- 路由视图，会根据路由显示相应的页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;  /* 可以换成渐变或高级色调背景 */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* 可以加一个更高级的字体 */
  padding: 20px;  /* 加点边距，使得界面不会紧贴四周 */
  box-sizing: border-box; /* 防止 padding 造成的尺寸变化 */
}

body {
  margin: 0; /* 去除默认的 body 边距 */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
