<template>
  <div class="goods">
    <goods-menu :goods="goods"></goods-menu>
    <goods-foods :goods="goods"></goods-foods>
  </div>
</template>

<script>
import GoodsMenu from './goodsComponents/Menu'
import GoodsFoods from './goodsComponents/Foods'
export default {
  name: 'Goods',
  props: {
    seller: Object,
    goods: Array
  },
  components: {
    GoodsMenu,
    GoodsFoods
  }
}
</script>

<style lang="stylus" scoped>
  .goods
    display flex
    overflow hidden
    position absolute
    top 174px
    bottom 46px
    width 100%
</style>
