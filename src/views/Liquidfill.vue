<template>
  <!-- 水球图是一个echarts的插件; npm; i; echarts-liquidfill;@2.0.6; https://github.com/ecomfe/echarts-liquidfill-->
  <div id="container" :style="{height:'300px'}">

  </div>
</template>

<script>
  import 'echarts-liquidfill'
  export default {
    mounted() {
      const Dom = document.getElementById('container')
      const chart = this.$echarts.init(Dom)
      const data = [0.68, 0.5, {
        value: 0.2, // 单独设置每一个的属性
        itemStyle: {
          opacity: 0.3
        },
        direction: 'left' // 波浪的移动方向
      }] // 必须从大到小排列，最右边的显示是在最外层
      chart.setOption({
        series: [{
          type: 'liquidFill',
          data,
          color: ['red', '#0f0', 'yellow'], // 和data一一对应的颜色
          itemStyle: {
            opacity: 0.6
          },
          emphasis: { // 鼠标移上去的强调属性默认和上面的itemStyle相同
            itemStyle: {
              opacity: 0.9
            }
          },
          backgroundStyle: { // 背景的设置
            borderWidth: 5,
            // borderColor: 'red'
            color: 'yellow'
          },
          outline: { // 外层的边框样式
            show: true,
            borderDistance: 2, // 外边框与内圆的间距 为2px
            itemStyle: {
              borderWidth: 2,
              borderColor: 'red',
              shadowBlur: 'none' // 阴影
              // color: 'yellow'
            }

          },
          // shape: 'rect',
          amplitude: 10 // 波浪的弧度
          // waveAnimation: false, // 禁止波浪动画
          // animationDuration: 0, // 禁止波浪动画
          // animationDurationUpdate: 0 // 禁止波浪动画
        }]
      })
    }
  }

</script>

<style lang="scss" ; scoped>

</style>;
