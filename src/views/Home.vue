<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
  import TopView from '../components/TopView'
  import SalesView from '../components/SalesView'
  import BottomView from '../components/BottomView'
  import MapView from '../components/MapView'
  import {
    wordclound,
    mapScatter,
    mapData
  } from '../api'
  export default {
    name: 'Home',
    components: {
      TopView,
      SalesView,
      BottomView,
      MapView
    },
    data() {
      return {
        reportData: null,
        wordCloud: null,
        mapData: null
      }
    },
    mounted() {
      mapData().then(data => {
        this.reportData = data
      })
      wordclound().then(data => {
        this.wordCloud = data
      })
      mapScatter().then(data => {
        this.mapData = data
      })
    },
    provide() {
      return {
        getReportData: this.getReportData,
        getWordCloud: this.getWordCloud,
        getMapData: this.getMapData
      }
    },
    methods: {
      getReportData() {
        return this.reportData
      },
      getWordCloud() {
        return this.wordCloud
      },
      getMapData() {
        return this.mapData
      }
    }

  }

</script>
<style lang="scss" scoped>
  .home {
    width: 100%;
    // height: 100%;
    padding: 20px;
    background: #eee;
    box-sizing: border-box;
  }

</style>
