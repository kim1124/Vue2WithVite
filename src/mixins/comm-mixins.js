import * as ECharts from 'echarts'
import { debounce, cloneDeep } from 'lodash-es'

export default {
  data() {
    return {
      instance: null,
      chartData: [],
    }
  },
  props: {
    grid: {
      type: Object,
      default: () => ({
        top: '5%',
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      }),
    },
    data: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    events: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
    autoResize: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    await this.$nextTick()

    if (this.autoResize) {
      window.addEventListener('resize', this.onResizeHandler)
      this.onResizeHandler()
    }

    const width = this.$el.clientWidth
    const height = this.$el.clientHeight

    this.instance = ECharts.init(this.$refs.chartInstance, null, {
      width,
      height,
      renderer: 'svg',
    })

    this.chartData = this.cloneDeep(this.data)
    this._setOptions()
  },
  beforeDestroy() {
    if (this.autoResize) {
      window.removeEventListener('resize', this.onResizeHandler)
    }

    this.instance.clear()
    this.instance.dispose()
    this.instance = null

    this.chartData = []
  },
  methods: {
    debounce,
    cloneDeep,
    setSize(width, height) {
      this.instance.resize({ width, height })
    },
    setOption(options) {
      this.instance.setOption(options)
    },
    async onResizeHandler() {
      await this.$nextTick()

      const width = this.$refs.chartWrapper.clientWidth
      const height = this.$refs.chartWrapper.clientHeight

      this.setSize(width, height)
      this._getResizeOptions(true)
    },
  },
  watch: {
    data(value) {
      this.chartData = this.cloneDeep(value)
      this._setOptions()
    },
    options(value) {
      this._setOptions()
    },
  },
}
