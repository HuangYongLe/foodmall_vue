<template>
  <div class="goods">
    <goods-menu :goods="goods"></goods-menu>
    <goods-foods :goods="goods"></goods-foods>
    <goods-shopcart
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
      :selectFoods="selectFoods"
    ></goods-shopcart>
  </div>
</template>

<script>
import GoodsMenu from './goodsComponents/Menu'
import GoodsFoods from './goodsComponents/Foods'
import GoodsShopcart from '@/components/shopcart/Shopcart'
export default {
  name: 'Goods',
  props: {
    seller: Object,
    goods: Array
  },
  components: {
    GoodsMenu,
    GoodsFoods,
    GoodsShopcart
  },
  computed: {
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
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
