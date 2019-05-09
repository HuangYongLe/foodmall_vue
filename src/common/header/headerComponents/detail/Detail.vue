<template>
  <fade-animation>
    <div class="detail" v-show="detailShow" @click="closeDetail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <detail-title :text="detailText[0]"></detail-title>
          <ul v-if="seller.supports" class="supports">
            <li
              class="supports-item"
              v-for="(item, index) in seller.supports"
              :key="index"
            >
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <detail-title :text="detailText[1]"></detail-title>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="closeDetail">
        <span class="iconfont close-icon">&#xe615;</span>
      </div>
    </div>
  </fade-animation>
</template>

<script>
import Star from '@/common/star/Star'
import FadeAnimation from '@/common/animations/FadeAnimation'
import DetailTitle from './DetailTitle'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'HeaderDetail',
  props: {
    seller: Object
  },
  data () {
    return {
      detailText: ['优惠信息', '商家公告']
    }
  },
  computed: {
    ...mapState(['detailShow'])
  },
  components: {
    Star,
    DetailTitle,
    FadeAnimation
  },
  methods: {
    closeDetail () {
      this.changeDetailShow(false)
    },
    ...mapMutations(['changeDetailShow'])
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .detail
    position fixed
    top 0
    left 0
    z-index 100
    width 100%
    height 100%
    overflow auto
    background rgba(7, 17, 27, .8)
    backdrop-filter blur(10px)
    .detail-wrapper
      width 100%
      min-height 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          line-height 16px
          text-align center
          font-size 16px
          font-weight 700
        .star-wrapper
          margin-top 18px
          padding 2px 0
          text-align center
        .supports
          width 80%
          margin 0 auto
          .supports-item
            padding 0 12px
            margin-bottom 12px
            font-size 0
            &:last-child
              margin-bottom 0
            .icon
              display inline-block
              width 16px
              height 16px
              vertical-align top
              margin-right 6px
              background-size 16px 16px
              background-repeat no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.special
                bg-image('special_2')
              &.invoice
                bg-image('invoice_2')
              &.guarantee
                bg-image('guarantee_2')
            .text
              line-height 16px
              font-size 12px
        .bulletin
          width 80%
          margin 0 auto
          .content
            padding 0 12px
            line-height 24px
            font-size 12px
    .detail-close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      text-align center
      .close-icon
        font-size 32px
        color rgba(255, 255, 255, .5)
</style>
