<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// import tabBar from "./components/common/tabBar.vue";
export default {
  name: "App",
  // components: { tabBar },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  min-width: 1910px;
  min-height:960px;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
