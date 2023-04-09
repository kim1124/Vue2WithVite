<template>
  <div class="home-view">
    <bar-chart ref="chart" :options="options" />
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
      options: {
        title: {
          text: "Referer of a Website",
          subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  created() {
    window.addEventListener("resize", this.onResizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResizeHandler);
  },
  methods: {
    onResizeHandler() {
      this.$refs.chart.setSize(this.$el.clientWidth, this.$el.clientHeight);
    },
  },
};
</script>
<style scoped>
.home-view {
  width: 100%;
  height: 100%;

  border: 1px solid blue;
}

.home-view-content {
  width: 100%;
  height: 100%;

  border: 1px solid lime;
}
</style>
