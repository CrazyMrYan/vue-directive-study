<template>
  <div id="app">
    <button v-permission="'orders::update'">更新</button>
    <button v-permission="'orders::add'">新增</button>
    <button v-permission="'orders::delete'">删除</button>
    <button v-permission="'orders::query'">查询</button>
    <button v-permission="'orders::detail'">详情</button>
    <button v-permission="'orders::enable'">启用</button>
    <button v-permission="'orders::disable'">禁用</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      permission: "orders::add",
    };
  },

  mounted() {
    setTimeout(() => {
      this.permission = "orders::data";
    }, 2000);
    setTimeout(() => {
      this.permission = "orders::add";
    }, 4000);
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
