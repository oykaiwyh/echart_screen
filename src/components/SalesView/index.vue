<template>
  <div class="sales-view">
    <el-card shadow="hover">
      <template v-slot:header>
        <div class="menu-wrapper">
          <el-menu mode="horizontal" :style="{'line-height':'50px'}" :default-active="activeIndex" @select="onMenuSelect">
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>
          <div class="menu-right">
            <el-radio-group v-model="radioSelect" size="small">
              <el-radio-button label="今日"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="今年"></el-radio-button>
            </el-radio-group>
            <el-date-picker v-model="date" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" :picker-options="pickerOptions" :style="{'margin-left':'10px'}">
            </el-date-picker>

          </div>
        </div>
      </template>
      <template>
        <div :style="{height:'300px'}">
          <div class="sales-view-chart-wrapper">
            <v-chart :options="chartOption"></v-chart>
            <div class="sales-view-list">
              <div class="sales-view-title">排行榜</div>
              <div class="list-item-wrapper">
                <div class="list-item" v-for="item in rankData" :key="item.no">
                  <!-- +item.no 确保类型为Number -->
                  <!-- <div class="list-item-no" :class="+item.no<=3?'top-no':''">{{item.no}}</div> -->
                  <div :class="['list-item-no', +item.no <= 3 ? 'top-no' : '']">{{item.no}}</div>
                  <div class="list-item-name">{{item.name}}</div>
                  <div class="list-item-money">{{item.money}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
  import commonDataMixin from '@/mixins/commonDataMixin'

  export default {
    name: 'SalesView',
    mixins: [commonDataMixin],
    data() {
      return {
        activeIndex: '1',
        radioSelect: '今日',
        date: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end], true)
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              // debugger
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        chartOption: {}

      }
    },
    watch: {
      orderFullYear() {
        this.render(this.orderFullYear, this.orderFullYearAxis, '年度销售额')
      }
    },
    computed: {
      rankData() {
        return this.activeIndex === '1' ? this.orderRank : this.userRank
      }
    },
    methods: {
      onMenuSelect(index) {
        this.activeIndex = index
        if (index === '1') {
          this.render(this.orderFullYear, this.orderFullYearAxis, '年度销售额')
        } else {
          this.render(this.userFullYear, this.userFullYearAxis, '年度用户访问量')
        }
      },
      render(data, axis, title) {
        this.chartOption = {
          title: {
            text: title,
            textStyle: {
              fontSize: 12,
              color: '#666'
            },
            left: 25,
            top: 20
          },
          xAxis: {
            type: 'category',
            data: axis,
            axisTick: {
              alignWithLabel: true,
              lineStyle: {
                color: '#999'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              color: '#333'
            }
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'dotted',
                color: '#eee'
              }
            }
          },
          series: [{
            type: 'bar',
            barWidth: '35%',
            data
          }],
          color: ['#3398DB'],
          grid: {
            top: 70,
            left: 60,
            right: 60,
            bottom: 50
          }
        }
      },
      getOptions() {
        return {
          color: '#3398DB',
          xAxis: {
            type: 'category',
            show: false,
            data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'],
            boundaryGap: false // 图标距离画布两侧的间距 默认 true
          },
          yAxis: {
            show: false
          },
          series: [{
            type: 'bar',
            data: [620, 131, 435, 657, 324, 536, 758, 132, 456, 675], // 柱状图宽度
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
  .sales-view {
    margin-top: 20px;
  }

  .menu-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    align-items: center;

    .el-menu--horizontal {
      border: none;
    }

  }

  .sales-view-chart-wrapper {
    display: flex;
    height: 270px;

    .echarts {
      flex: 0 0 70%;
      width: 70%;
      height: 100%;
    }

    .sales-view-list {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .sales-view-title {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
        font-weight: 500;
      }

      .list-item-wrapper {
        margin-top: 15px;

        .list-item {
          display: flex;
          align-items: center;
          font-size: 12px;
          height: 20px;
          padding: 6px 20px 6px 0;

          .list-item-no {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            color: #333;

            &.top-no {
              background: #000;
              border-radius: 50%;
              color: #fff;
              font-weight: 500;
            }
          }

          .list-item-name {
            margin-left: 10px;
            color: #333;
          }

          .list-item-money {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }

</style>
