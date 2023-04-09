<template>
    <div ref="chartWrapper" class="chart-container">
        <div ref="chartInstance" class="chart-instnace"></div>
    </div>
</template>
  
<script>
import CommMixins from '../mixins/comm-mixins'

export default {
    name: 'bar-chart',
    mixins: [CommMixins],
    props: {
        type: {
            type: String,
            default: 'bar'
        }
    },
    methods: {
        async _setOptions() {
            await this.$nextTick()

            let chartOptions = {}

            const _getResizeOptions = this._getResizeOptions()

            if (this.type === 'bar') {
                chartOptions = {
                    grid: {
                        ...this.grid
                    },
                    series: [
                        {
                            type: 'bar',
                            data: this.chartData.map(item => item.value)
                        }
                    ],
                    ..._getResizeOptions,
                    ...this.options
                }
            } else if (this.type === 'column') {
                chartOptions = {
                    grid: {
                        ...this.grid
                    },
                    series: [
                        {
                            type: 'bar',
                            data: this.chartData.map(item => item.value)
                        }
                    ],
                    ..._getResizeOptions,
                    ...this.options
                }
            } else if (this.type === 'pie') {
                chartOptions = {
                    grid: {
                        ...this.grid
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
                    },
                    ..._getResizeOptions,
                    ...this.options
                }
            }

            this.instance.setOption(chartOptions)
        },
        _getResizeOptions(immediately = false) {
            let axisOption = {}

            const wrapperWidth = this.$refs.chartWrapper.clientWidth

            const yLabelWidth = Math.min(wrapperWidth * 0.3)
            const xLabelWidth = (wrapperWidth - yLabelWidth) / this.chartData.length

            if (this.type === 'bar') {
                let rotate = 0

                const data = this.chartData.map(item => item.name)
                const count = data.length;
                const axisWidth = wrapperWidth / count

                for (let i = 0; i < count; i++) {
                    const label = data[i];
                    const prevLabel = data[i - 1] ? data[i - 1] : '';
                    const nextLabel = data[i + 1] ? data[i + 1] : '';

                    const labelWidth = label.length * 12 * 0.6
                    const prevLabelWidth = prevLabel ? prevLabel.length * 12 * 0.6 : 0;
                    const nextLabelWidth = nextLabel ? nextLabel.length * 12 * 0.6 : 0;

                    if (prevLabel && nextLabel && (labelWidth + prevLabelWidth > axisWidth || labelWidth + nextLabelWidth > axisWidth)) {
                        rotate = 45
                        break;
                    } else {
                        rotate = 0
                    }
                }

                axisOption = {
                    xAxis: {
                        show: true,
                        type: 'category',
                        data,
                        axisLabel: {
                            width: xLabelWidth,
                            rotate,
                            interval: 0,
                            overflow: 'truncate',
                            formatter: (value, idx) => {
                                const axis = this.instance.getOption().xAxis[0]

                                return value
                            }
                        }
                    },
                    yAxis: {
                        show: true,
                        type: 'value',
                        axisLabel: {
                            width: yLabelWidth,
                            overflow: 'truncate'
                        }
                    }
                }
            } else if (this.type === 'column') {
                const yLabelWidth = labelWidth * 0.3

                axisOption = {
                    xAxis: {
                        show: true,
                        type: 'value',
                        axisLabel: {
                            hideOverlap: true
                        }
                    },
                    yAxis: {
                        show: true,
                        type: 'category',
                        data: this.chartData.map(item => item.name),
                        axisLabel: {
                            width: yLabelWidth,
                            overflow: 'truncate'
                        }
                    },
                }
            } else {
                axisOption = {
                    xAxis: {
                        show: false
                    },
                    yAxis: {
                        show: false
                    },
                }
            }

            if (immediately) {
                this.instance.setOption(axisOption)
            }

            return axisOption
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
.chart-container {
    width: 100%;
    height: 100% !important;
}
</style>