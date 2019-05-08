<template>
  <div class="cartcontrol">
    <move-animation>
      <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="handleDecreaseCart">
        <span class="iconfont decrease-icon">&#xe610;</span>
      </div>
    </move-animation>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="iconfont cart-add" @click.stop.prevent="handleAddCart">&#xe6f1;</div>
  </div>
</template>

<script>
import Vue from 'vue'
import MoveAnimation from '@/common/animations/MoveAnimation'
export default {
  name: 'CartControl',
  props: {
    food: Object
  },
  components: {
    MoveAnimation
  },
  methods: {
    handleAddCart () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    handleDecreaseCart () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      .decrease-icon
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0, 160, 220)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
</style>
