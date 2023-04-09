<template>
  <div class="chart-leak-app">
    <div class="chart-leak-link">
      <router-link to="/" style="margin-right: 10px">TOP N 차트</router-link>
      <router-link to="/About">Trend 차트</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import HomeView from "./views/HomeView.vue";

export default {
  components: {
    HomeView: HomeView,
  },
};
</script>
<style scoped>
.chart-leak-app {
  width: 100%;
  height: calc(100% - 24px);
}
.chart-leak-link {
  display: flex;
  flex-direction: row;
}
</style>
