<template>
  <div>
    <common-cart title="今日交易用户数" :value="orderUser">
      <template>
        <!-- <div id="today-users-chart" :style="{width:'100%',height:'100%'}"></div> -->
        <v-chart :options="getOptions()"></v-chart>
      </template>
      <template v-slot:footer>
        <span>退货率 </span>
        <span class="emphasis">{{returnRate}}</span>
      </template>
    </common-cart>
  </div>
</template>

<script>
  import commonCardMixin from '@/mixins/commonCardMixin'
  import commonDataMixin from '@/mixins/commonDataMixin'

  export default {
    mixins: [commonCardMixin, commonDataMixin],
    methods: {
      getOptions() {
        return {
          color: '#3398DB',
          tooltip: {},
          xAxis: {
            type: 'category',
            show: false,
            data: this.orderUserTrendAxis,
            boundaryGap: false // 图标距离画布两侧的间距 默认 true
          },
          yAxis: {
            show: false
          },
          series: [{
            type: 'bar',
            name: '用户实时交易量',
            data: this.orderUserTrend, // 柱状图宽度
            barWidth: '60%'
          }],
          grid: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }
        }
      }
    }

  }

</script>

<style lang="scss" scoped>

</style>
