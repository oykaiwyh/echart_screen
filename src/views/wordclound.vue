<template>
  <!-- 词云图是一个echarts的插件; npm i echarts-wordcloud@1.1.3; https://github.com/ecomfe/echarts-wordcloud-->
  <div id="container" :style="{height:'300px'}">

  </div>
</template>

<script>
  import 'echarts-wordcloud'
  export default {
    mounted() {
      const Dom = document.getElementById('container')
      const chart = this.$echarts.init(Dom)
      const data = [{
        name: 'mukewang',
        value: 100
      }, {
        name: 'mukewang',
        value: 50
      }, {
        name: 'mukewang',
        value: 25
      }] // 必须从大到小排列，最右边的显示是在最外层
      chart.setOption({
        series: [{
          type: 'wordCloud',
          data,
          shape: 'circle', // 词云的形状
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              // Color can be a callback function or a color string
              color: function () {
                // Random color
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')'
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          }
        }]
      })
    }
  }

</script>

<style lang="scss" ; scoped>

</style>;
