<template>
  <div id="app">
    <button v-permission="'orders::update1'">Update11</button>
    <button v-permission="'orders::update'">Update</button>
    <button v-permission="'orders::update'">Update</button>
    <button v-permission="'orders::update'">Update</button>
    <button v-permission="'orders::update'">Update</button>
    <button v-permission="'orders::update'">Update</button>
    <button v-permission="'orders::update'">Update</button>
    <button v-permission="'orders::update'">Update</button>
    <button v-permission="permission">Add11</button>
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
