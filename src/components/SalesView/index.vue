<template>
  <!-- 默认600px*400px -->
  <!-- <v-chart
    :options="data"
  ></v-chart> -->
  <ve-line :data="chartData"></ve-line>
</template>

<script>
  export default {
    name:'SalesView',
    data () {
      return {
        data:{
          xAxis:{},
          yAxis:{},
          series:[{
            type:'line',
            data:[100, 313, 456, 567]
          }]
        },
        chartData: {
          columns: ['日期', '销售额'],
          rows: [
            { '日期': '1月1日', '销售额': 123 },
            { '日期': '1月2日', '销售额': 1223 },
            { '日期': '1月3日', '销售额': 2123 },
            { '日期': '1月4日', '销售额': 4123 },
            { '日期': '1月5日', '销售额': 3123 },
            { '日期': '1月6日', '销售额': 7123 }
          ]
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
