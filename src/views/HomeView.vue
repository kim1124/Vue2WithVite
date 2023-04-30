<template>
  <div class="home-view">
    <div>
      <select v-model="type" style="margin-right: 10px">
        <option value="bar">Bar</option>
        <option value="column">Column</option>
        <option value="pie">Pie</option>
      </select>
      <button @click="generateSampleData">데이터 생성</button>
    </div>
    <div style="display: flex; height: 100%;">
      <bar-chart :type="type" :data="data" :auto-resize="true" />
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/bar-chart.vue";

export default {
  name: "HomeView",
  components: {
    BarChart,
  },
  data() {
    return {
      type: 'bar',
      data: []
    };
  },
  mounted() {
    setInterval(this.generateSampleData, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    generateSampleData() {
      const dataCount = Math.round(Math.random(0, 10) * 10);
      const sampleData = [];

      for (let i = 0; i < dataCount; i++) {
        sampleData.push({
          name: `아주 기이이이이이이이이이이이이이이이이이이이이이 Sample Data ${i}`,
          value: Math.round(Math.random(0, 100) * 100),
        });
      }

      this.data = sampleData
    },
  },
};
</script>
<style scoped>
.home-view {
  width: 100%;
  height: 100%;
}
</style>
