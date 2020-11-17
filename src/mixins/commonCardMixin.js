/* eslint-disable space-before-function-paren */

import CommonCart from '../components/CommonCart'

export default {
  components:{
    CommonCart
  },
  mounted() {
    const chartDom = document.getElementById('total-order-chart')
    const chart = this.$echarts.init(chartDom)
    chart.setOption({
      xAxis:{
        type:'category',
        show:false,
        boundaryGap:false // 图标距离画布两侧的间距 默认 true
      },
      yAxis:{
        show:false
      },
      series:[{
        type:'line',
        data:[620, 131, 435, 657, 324, 536, 758, 132, 456, 675],
        areaStyle:{   // 区域
          color:'purple'
        },
        lineSTyle:{   // 点之间连线的样式
          width:0
        },
        itemStyle:{   // 点的样式
          opacity:0
        },
        smooth:true // 点之间连线的弧度
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
