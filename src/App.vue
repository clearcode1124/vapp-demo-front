<template>
  <div id="app">
    <router-view class="main-view"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  mounted: function() {},
  methods: {}
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  overflow-x: hidden;
  background-color: #fcf3ca;
}
#app {
  height: 100%;
  width: 100%;
  background-color: #fcf3ca;
}
</style>
