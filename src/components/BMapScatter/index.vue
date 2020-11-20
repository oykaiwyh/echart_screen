<template>
  <ve-bmap :title="title" :tooltip="{}" :serise="chartSeries" :settings="chartSettings" :series="chartSeries" height="100%">
  </ve-bmap>
</template>

<script>
  // import {
  //   data,
  //   geo
  // } from '@/utils/bmaparea.js'
  import commonDataMixin from '../../mixins/commonDataMixin'

  const mapStyle = require('@/utils/bmapStyle.json')
  const convertData = function (data, geo) {
    const res = []
    data.forEach(item => {
      const {
        name,
        value
      } = item
      const coord = geo[name]
      res.push({
        name,
        value: [...coord, value]
      })
    })
    return res
  }
  export default {
    mixins: [commonDataMixin],
    data() {
      return {
        title: {
          text: '慕课外卖销售数据大盘',
          subtext: '销售趋势统计',
          sublink: 'https://www.imooc.com',
          left: 'center'
        },
        chartSettings: {
          key: 'ZpiDOvMDaxGP8TN2EYGxuGTTxDZ32ZUc',
          bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: mapStyle
          }
        },
        chartSeries: []
      }
    },
    watch: {
      mapData() {
        const {
          data,
          geo
        } = this.mapData
        this.chartSeries = [{
          name: '销售额',
          type: 'scatter', // 散点
          coordinateSystem: 'bmap',
          data: convertData(data, geo),
          encode: {
            value: 2
          },
          itemStyle: { // 点的颜色
            color: 'purple'
          },
          symbolSize: function (val) { // 点的大小
            return val[2] / 10
          },
          label: {
            show: false,
            position: 'right',
            formatter: function (v) {
              return `${v.data.name} - ${v.data.value[2]}`
            }
          },
          emphasis: { // 鼠标移上去显示上面的label
            label: {
              show: true
            }
          }
        }, {
          name: 'Top 10',
          type: 'effectScatter', // 波浪点
          coordinateSystem: 'bmap',
          data: convertData(data.sort(function (a, b) {
            return b.value - a.value
          }), geo).slice(0, 10),
          symbolSize: function (val) {
            return val[2] / 10
          },
          encode: {
            value: 2
          },
          label: {
            formatter: function (v) {
              return `${v.data.name} - ${v.data.value[2]}`
            },
            position: 'right',
            show: true
          },
          hoverAnimation: true, // 鼠标移上去的动画
          rippleEffect: { // 波纹
            brushType: 'stroke'
          },
          itemStyle: {
            color: 'purple',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        }]
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>
