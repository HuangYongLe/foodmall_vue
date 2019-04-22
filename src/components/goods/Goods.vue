<template>
  <div class="goods">
    <goods-header></goods-header>
    <goods-tab></goods-tab>
    <goods-content></goods-content>
  </div>
</template>

<script>
import GoodsHeader from './goodsComponents/Header'
import GoodsTab from './goodsComponents/Tab'
import GoodsContent from './goodsComponents/Content'
export default {
  name: 'Goods',
  components: {
    GoodsHeader,
    GoodsTab,
    GoodsContent
  }
}
</script>

<style scoped>
</style>
