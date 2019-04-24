<template>
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li
        class="menu-item"
        :class="{'current': currentIndex === index}"
        v-for="(item, index) in goods"
        :key="index"
        @click="handleSelectMenu(index)"
      >
        <span class="text border-1px">
          <span
            class="icon"
            v-show="item.type > 0"
            :class="classMap[item.type]"
          ></span>{{item.name}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'GoodsMenu',
  props: {
    goods: Array
  },
  computed: {
    ...mapState(['currentIndex'])
  },
  methods: {
    ...mapMutations(['changeClickMenuIndex']),
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {})
    },
    handleSelectMenu (index) {
      this.changeClickMenuIndex(index)
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  mounted () {
    this._initScroll()
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      width 56px
      height 54px
      line-height 14px
      padding 0 12px
      &.current
        position relative
        margin-top -1px
        z-index 10
        background #fff
        .text
          font-weight 700
          border-none()
      .text
        display table-cell
        width 56px
        vertical-align middle
        font-size 12px
        border-1px(rgba(7, 17, 27, .1))
        .icon
          display inline-block
          width 12px
          height 12px
          vertical-align top
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.special
            bg-image('special_3')
          &.invoice
            bg-image('invoice_3')
          &.guarantee
            bg-image('guarantee_3')
</style>
