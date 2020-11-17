<template>
  <div>
    <common-cart
      title="累计销售额"
      value="141414"
    >
      <template >
        <div class="compare-wrapper">
          <div class="compare">
            <span>日同比</span>
            <span  class="emphasis">7.33%</span>
            <div class="increase"></div>
          </div>
          <div class="compare">
            <span>月同比</span>
            <span  class="emphasis">7.33%</span>
            <div class="decrease"></div>
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <span>昨日销售额</span>
        <span class="emphasis">￥ 300，3000</span>
      </template>
    </common-cart>
  </div>
</template>

<script>
  import commonCardMixin from '@/mixins/commonCardMixin'
  export default {
    mixins:[commonCardMixin]
  }
</script>

<style lang="scss" scoped>
.compare-wrapper{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .compare{
    display: flex;
    align-items: center;
    margin-top: 3px;
    font-size: 12px;
    color: #666;

  }
}

</style>
