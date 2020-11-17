<template>
  <div>
    <common-cart
      title="今日交易用户数"
      value="141414"
    >
      <template>
        <div id="today-users-chart" :style="{width:'100%',height:'100%'}"></div>
      </template>
      <template v-slot:footer>
        <span>退货率 </span>
        <span class="emphasis">5.1%</span>
      </template>
    </common-cart>
  </div>
</template>

<script>
  import commonCardMixin from '@/mixins/commonCardMixin'
  export default {
    mixins:[commonCardMixin],
    mounted () {
      const chartDom = document.getElementById('today-users-chart')
      const chart = this.$echarts.init(chartDom)
      chart.setOption({
        color:'#3398DB',
        xAxis:{
          type:'category',
          show:false,
          data:['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'],
          boundaryGap:false // 图标距离画布两侧的间距 默认 true
        },
        yAxis:{
          show:false
        },
        series:[{
          type:'bar',
          data:[620, 131, 435, 657, 324, 536, 758, 132, 456, 675], // 柱状图宽度
          barWidth:'60%'
        }],
        grid:{
          top:0,
          bottom:0,
          left:0,
          right:0
        }
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
