function format(v) {
  // return Number(v).toLocaleString()  //将一个Number转为千分位的数值
  // 123456 => 1 234 56不成立 => 12 345 6 不成立 => 123 456 成立
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  return `${v}`.replace(reg, '$&,')
}

function wrapperNumber(o, k) {
  return o && o[k] ? format(o[k]) : 0
}
function wrapperMoney(o, k) {
  return o && o[k] ? `¥ ${format(o[k])}` : '¥ 0.00'
}
function wrapperPercentage(o, k) {
  return o && o[k] ? `${o[k]}%` : '0%'
}
function wrapperArray(o, k) {
  return o && o[k] ? o[k] : []
}
function wrapperOriginalNumber(o, k) {
  return o && o[k] ? o[k] : 0
}
function wrapperObject(o, k) {
  if (o && k.indexOf('.') >= 0) {
    const keys = k.split('.')
    keys.forEach(key => {
      o = o[key]
    })
    return o
  } else {
    return o && o[k] ? o[k] : {}
  }
}

export default {
  inject: ['getReportData', 'getWordCloud', 'getMapData'],
  filters: {
    format(v) {
      return format(v)
    }
  },
  computed: {
    reportData() {
      return this.getReportData()
    },
    // 累计销售额
    salesToday() {
      return wrapperNumber(this.reportData, 'salesToday')
    },
    salesGrowthLastDay() {
      return wrapperPercentage(this.reportData, 'salesGrowthLastDay')
    },
    salesGrowthLastMonth() {
      return wrapperPercentage(this.reportData, 'salesGrowthLastMonth')
    },
    salesLastDay() {
      return wrapperMoney(this.reportData, 'salesLastDay')
    },
    // 累计订单量
    orderToday() {
      return wrapperNumber(this.reportData, 'orderToday')
    },
    orderLastDay() {
      return wrapperNumber(this.reportData, 'orderLastDay')
    },
    orderTrend() {
      return wrapperArray(this.reportData, 'orderTrend')
    },
    // 今日交易用户数
    orderUser() {
      return wrapperNumber(this.reportData, 'orderUser')
    },
    returnRate() {
      return wrapperPercentage(this.reportData, 'returnRate')
    },
    orderUserTrend() {
      return wrapperArray(this.reportData, 'orderUserTrend')
    },
    orderUserTrendAxis() {
      return wrapperArray(this.reportData, 'orderUserTrendAxis')
    },
    // 累计用户数
    userToday() {
      return wrapperNumber(this.reportData, 'userToday')
    },
    userGrowthLastDay() {
      return wrapperNumber(this.reportData, 'userGrowthLastDay')
    },
    userGrowthLastMonth() {
      return wrapperNumber(this.reportData, 'userGrowthLastMonth')
    },
    userLastMonth() {
      return wrapperOriginalNumber(this.reportData, 'userLastMonth')
    },
    userTodayNumber() {
      return wrapperOriginalNumber(this.reportData, 'userToday')
    },
    // 销售额
    orderFullYear() {
      return wrapperArray(this.reportData, 'orderFullYear')
    },
    orderFullYearAxis() {
      return wrapperArray(this.reportData, 'orderFullYearAxis')
    },
    orderRank() {
      return wrapperArray(this.reportData, 'orderRank')
    },
    // 访问量
    userFullYear() {
      return wrapperArray(this.reportData, 'userFullYear')
    },
    userFullYearAxis() {
      return wrapperArray(this.reportData, 'userFullYearAxis')
    },
    userRank() {
      return wrapperArray(this.reportData, 'userRank')
    },
    // 关键词搜索
    wordCloud() {
      return this.getWordCloud()
    },
    // 分类销售排行 品类
    category1() {
      return wrapperObject(this.reportData, 'category.data1')
    },
    // 分类销售排行 商品
    category2() {
      return wrapperObject(this.reportData, 'category.data2')
    },
    mapData() {
      return this.getMapData()
    }

  }
}
