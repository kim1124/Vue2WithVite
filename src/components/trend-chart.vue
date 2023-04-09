<template>
  <div ref="chartWrapper" class="chart-container">
    <div ref="chartInstance" class="chart-instnace"></div>
  </div>
</template>

<script>
import CommMixins from '../mixins/comm-mixins'

export default {
  name: 'trend-chart',
  mixins: [CommMixins],
  props: {
    type: {
      type: String,
      default: 'bar'
    }
  },
  mounted() {
    this.chartData = this.data
    this._setOptions()
  },
  methods: {
    async _setOptions() {
      await this.$nextTick()

      let chartOptions = {}

      if (this.type === 'bar') {
        chartOptions = {
          xAxis: {
            show: true,
            type: 'category',
            data: this.chartData.map(item => item.name)
          },
          yAxis: {
            min: 0,
            max: 100,
            show: true,
            type: 'value'
          },
          series: [
            {
              type: 'bar',
              data: this.chartData.map(item => item.value)
            }
          ]
        }
      } else if (this.type === 'column') {
        chartOptions = {
          xAxis: {
            show: true,
            type: 'value'
          },
          yAxis: {
            show: true,
            type: 'category',
            data: this.chartData.map(item => item.name)
          },
          series: [
            {
              type: 'bar',
              data: this.chartData.map(item => item.value)
            }
          ]
        }
      } else if (this.type === 'pie') {
        chartOptions = {
          xAxis: {
            show: false
          },
          yAxis: {
            show: false
          },
          legend: {
            left: 'right',
            orient: 'vertical'
          },
          series: [
            {
              type: 'pie',
              data: this.chartData
            }
          ],
          tooltip: {
            trigger: 'item'
          }
        }
      }

      this.instance.setOption(chartOptions)
    }
  },
  watch: {
    type() {
      this._setOptions()
    }
  }
}
</script>

<style scoped>
.chart-container,
.chart-instnace {
  width: 100%;
  height: 100%;
}
</style>