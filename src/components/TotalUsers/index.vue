<template>
  <div>
    <common-cart title="累计用户数" :value="userToday">
      <template>
        <!-- <div id="total-users-chart" :style="{width:'100%',height:'100%'}"></div> -->
        <v-chart :options="getOptions()"></v-chart>
      </template>
      <template v-slot:footer>
        <div class="total-users-footer">
          <span>日同比 </span>
          <span class="emphasis">{{userGrowthLastDay}}</span>
          <div class="increase"></div>
          <span class="month">日同比 </span>
          <span class="emphasis">{{userGrowthLastMonth}}</span>
          <div class="decrease"></div>
        </div>
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
          xAxis: {
            show: false,
            type: 'value',
            boundaryGap: false // 图标距离画布两侧的间距 默认 true
          },
          yAxis: {
            type: 'category',
            show: false
          },
          series: [{
            type: 'bar',
            name: '上月平台用户数',
            stack: '总量', // 多个柱状图合成一个柱状图
            data: [this.userLastMonth], // 柱状图宽度
            barWidth: 10,
            itemStyle: {
              color: '#45c946'
            }
          }, {
            type: 'bar',
            name: '今日平台用户数',
            stack: '总量', // 多个柱状图合成一个柱状图
            data: [this.userTodayNumber], // 柱状图宽度
            // barWidth:10
            itemStyle: {
              color: '#eee'
            }
          }, {
            type: 'custom', // type类型为custom
            data: [this.userLastMonth],
            stack: '总量',
            renderItem: (params, api) => { // 自定义的元素通过renderItem进行绘制
              // params：包含了当前数据信息（如 seriesIndex、dataIndex 等等）和坐标系的信息（如坐标系包围盒的位置和尺寸）。
              // api：是一些开发者可调用的方法集合（如 api.value()、api.coord()）。
              // console.log(params,api);
              const value = api.value(0) // 获取data中的第一号元素
              const endPoint = api.coord([value, 0]) // 获取[200,0]坐标
              // d:'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
              // M0 767.909l512.029-511.913L1024 767.909 0 767.909z
              return {
                type: 'group',
                position: endPoint,
                children: [{
                    type: 'path',
                    shape: {
                      d: 'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
                      x: -5,
                      y: -20,
                      width: 10,
                      height: 10,
                      layout: 'cover' // 默认center，保持原有的svg图标长宽比例, cover,自动填充为自己设置的长宽比例
                    },
                    style: {
                      fill: '#45c946'
                    }
                  },
                  {
                    type: 'path',
                    shape: {
                      d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                      x: -5,
                      y: 10,
                      width: 10,
                      height: 10,
                      layout: 'cover'
                    },
                    style: {
                      fill: '#45c946'
                    }
                  }
                ]
              }
            }
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
    // mounted () {
    //   const chartDom = document.getElementById('total-users-chart')
    //   const chart = this.$echarts.init(chartDom)
    //   chart.setOption({
    //     xAxis:{
    //       show:false,
    //       type:'value',
    //       boundaryGap:false // 图标距离画布两侧的间距 默认 true
    //     },
    //     yAxis:{
    //       type:'category',
    //       show:false
    //     },
    //     series:[{
    //       type:'bar',
    //       stack:'总量', // 多个柱状图合成一个柱状图
    //       data:[200], // 柱状图宽度
    //       barWidth:10,
    //       itemStyle:{
    //         color:'#45c946'
    //       }
    //     }, {
    //       type:'bar',
    //       stack:'总量', // 多个柱状图合成一个柱状图
    //       data:[250], // 柱状图宽度
    //       // barWidth:10
    //       itemStyle:{
    //         color:'#eee'
    //       }
    //     },
    //     // {
    //     //   // 绘制一个元素
    //     //   // 自定义图形元素
    //     //   type:'custom', // type类型为custom
    //     //   data:[200],
    //     //   stack:'总量',
    //     //   renderItem:(params, api) => { // 自定义的元素通过renderItem进行绘制
    //     //     // params：包含了当前数据信息（如 seriesIndex、dataIndex 等等）和坐标系的信息（如坐标系包围盒的位置和尺寸）。
    //     //     // api：是一些开发者可调用的方法集合（如 api.value()、api.coord()）。
    //     //     // console.log(params,api);
    //     //     const value = api.value(0) // 获取data中的第一号元素
    //     //     const endPoint = api.coord([value, 0]) // 获取[200,0]坐标
    //     //     console.log(endPoint);
    //     //     return {
    //     //       type:'path',
    //     //       position:endPoint,
    //     //       shape:{
    //     //         d:'M512 6.4C505.6 0 492.8 0 480 0s-25.6 0-32 6.4c-12.8 6.4-19.2 19.2-25.6 25.6L6.4 761.6c-12.8 19.2-12.8 44.8 0 64 6.4 12.8 12.8 12.8 25.6 19.2s19.2 6.4 32 6.4h819.2c12.8 0 25.6 0 32-6.4 12.8-6.4 19.2-12.8 25.6-19.2 12.8-19.2 12.8-44.8 0-64L537.6 32C531.2 25.6 524.8 12.8 512 6.4z',
    //     //         x:-330.40000000000003,
    //     //         y:10,
    //     //         width:20,
    //     //         height:20
    //     //       },
    //     //       style:{
    //     //         fill:'red'
    //     //       }
    //     //     }
    //     //   }

    //     // },
    //     // 绘制一组元素
    //     {
    //       type:'custom', // type类型为custom
    //       data:[200],
    //       stack:'总量',
    //       renderItem:(params, api) => { // 自定义的元素通过renderItem进行绘制
    //         // params：包含了当前数据信息（如 seriesIndex、dataIndex 等等）和坐标系的信息（如坐标系包围盒的位置和尺寸）。
    //         // api：是一些开发者可调用的方法集合（如 api.value()、api.coord()）。
    //         // console.log(params,api);
    //         const value = api.value(0) // 获取data中的第一号元素
    //         const endPoint = api.coord([value, 0]) // 获取[200,0]坐标
    //         // d:'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
    //         // M0 767.909l512.029-511.913L1024 767.909 0 767.909z
    //         return {
    //           type:'group',
    //           position:endPoint,
    //           children:[
    //             {
    //               type:'path',
    //               shape:{
    //                 d:'M1024 255.996 511.971 767.909 0 255.996 1024 255.996z',
    //                 x:-5,
    //                 y:-20,
    //                 width:10,
    //                 height:10,
    //                 layout:'cover' // 默认center，保持原有的svg图标长宽比例, cover,自动填充为自己设置的长宽比例
    //               },
    //               style:{
    //                 fill:'#45c946'
    //               }
    //             },
    //             {
    //               type:'path',
    //               shape:{
    //                 d:'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
    //                 x:-5,
    //                 y:10,
    //                 width:10,
    //                 height:10,
    //                 layout:'cover'
    //               },
    //               style:{
    //                 fill:'#45c946'
    //               }
    //             }
    //           ]
    //         }
    //       }
    //     }
    //     ],
    //     grid:{
    //       top:0,
    //       bottom:0,
    //       left:0,
    //       right:0
    //     }
    //   })
    // }
  }

</script>

<style lang="scss" scoped>
  .total-users-footer {
    display: flex;
    align-items: center;

    .month {
      margin-left: 10px;
    }
  }

</style>
