<template>
  <common-cart title="累计订单量" :value="orderToday">
    <template>
      <!-- <div id="total-order-chart" :style="{width:'100%',height:'100%'}"></div> -->
      <v-chart :options="getOptions()"></v-chart>
    </template>
    <template v-slot:footer>
      <span>昨日订单量</span>
      <span class="emphasis">￥ {{orderLastDay}}</span>
    </template>

  </common-cart>

</template>

<script>
  import commonCardMixin from '@/mixins/commonCardMixin'
  import commonDataMixin from '@/mixins/commonDataMixin'
  export default {
    mixins: [commonCardMixin, commonDataMixin],
    methods: {
      getOptions() {
        return this.orderTrend.length ? {
          xAxis: {
            type: 'category',
            show: false,
            boundaryGap: false // 图标距离画布两侧的间距 默认 true
          },
          yAxis: {
            show: false
          },
          series: [{
            type: 'line',
            data: this.orderTrend,
            areaStyle: { // 区域
              color: 'purple'
            },
            lineSTyle: { // 点之间连线的样式
              width: 0
            },
            itemStyle: { // 点的样式
              opacity: 0
            },
            smooth: true // 点之间连线的弧度
          }],
          grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }
        } : null
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>
