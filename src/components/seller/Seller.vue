<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star class="star" :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="iconfont favorite-icon" :class="{'active': favorite}">&#xe675;</span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h2 class="title">公告与活动</h2>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li
            class="supports-item border-1px"
            v-for="(item, index) in seller.supports"
            :key="index"
          >
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pictures">
        <h2 class="title">商家实景</h2>
        <div class="wrapper">
          <swiper>
            <swiper-slide v-for="(item, index) in seller.pics" :key="index">
              <img class="swiper-img" :src="item">
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h2 class="title border-1px">商家信息</h2>
        <ul>
          <li class="info-item border-1px" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Star from '@/common/star/Star'
import Split from '@/common/split/Split'
import {saveToLocal, loadFromLocal} from '@/util/store'
export default {
  name: 'Seller',
  props: {
    seller: Object
  },
  data () {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  computed: {
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  components: {
    Star,
    Split
  },
  methods: {
    toggleFavorite () {
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  mounted () {
    setTimeout(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: false
        })
      } else {
        this.scroll.refresh()
      }
    }, 20)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      position relative
      padding 18px
      .title
        margin-bottom 8px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .desc
        padding-bottom 18px
        line-height 18px
        font-size 0
        border-1px(rgba(7, 17, 27, .1))
        .star
          margin-right 8px
          display inline-block
          vertical-align top
        .text
          margin-right 12px
          display inline-block
          vertical-align top
          font-size 10px
          color rgb(77, 85, 93)
      .remark
        display flex
        padding-top 18px
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, .1)
          &:last-child
            border none
          h2
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .content
            line-height 24px
            font-size 10px
            color rgb(7, 17, 27)
            .stress
              font-size 24px
      .favorite
        position absolute
        right 11px
        top 18px
        width 50px
        text-align center
        .favorite-icon
          display block
          margin-bottom 4px
          line-height 24px
          font-size 24px
          color #d4d6d9
          &.active
            color rgb(240, 20, 20)
        .text
          line-height 10px
          font-size 10px
          color rgb(77,85,93)
    .bulletin
      padding 18px 18px 0 18px
      .title
        margin-bottom 8px
        line-height 14px
        color rgb(7, 17, 27)
      .content-wrapper
        padding 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, .1))
        .content
          line-height 24px
          font-size 12px
          color rgb(240, 20, 20)
      .supports
        .supports-item
          padding 16px 12px
          font-size 0
          border-1px(rgba(7, 17, 27, .1))
          &:last-child
            border-none()
          .icon
            display inline-block
            width 16px
            height 16px
            vertical-align top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.special
              bg-image('special_4')
            &.invoice
              bg-image('invoice_4')
            &.guarantee
              bg-image('guarantee_4')
          .text
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
    .pictures
      padding 18px
      .title
        margin-bottom 8px
        line-height 14px
        color rgb(7, 17, 27)
      .wrapper
        overflow: hidden
        width: 100%
        height: 0
        padding-bottom: 90px
        background-color #eee
        .swiper-img
          width: 120px
          height 90px
          margin-right 6px
    .info
      padding 18px 18px 0 18px
      color rgb(7, 17, 27)
      .title
        padding-bottom 12px
        line-height 14px
        font-size 14px
        border-1px(rgba(7, 17, 27, .1))
      .info-item
        padding 16px 12px
        line-height 16px
        font-size 12px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
</style>
