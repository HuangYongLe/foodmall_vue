<template>
  <move-x-animation>
    <div class="food" v-show="showFlag" ref="foodWrapper">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <div class="back-wrapper" @click="hide">
            <span class="iconfont back-icon">&#xe602;</span>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">{{food.price | currency('￥', 0)}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice | currency('￥', 0)}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cart-control :food="food"></cart-control>
          </div>
          <fade-animation>
            <div class="buy" v-if="!food.count || food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
          </fade-animation>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h2 class="title">商品信息</h2>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h2 class="title">商品评价</h2>
          <rating-select
            :selectType="selectType"
            :onlyContent="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
            @changeRatingType="changeRatingType"
            @changeOnlyContent="changeOnlyContent"
          ></rating-select>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li
                class="rating-item border-1px"
                v-for="(rating, index) in food.ratings"
                :key="index"
                v-show="needShow(rating.rateType, rating.text)"
              >
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span class="iconfont up-icon" v-if="rating.rateType === 0">&#xe6e3;</span><span class="iconfont down-icon" v-else>&#xe682;</span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </move-x-animation>
</template>

<script>
import Vue from 'vue'
import BScroll from 'better-scroll'
import MoveXAnimation from '@/common/animations/MoveXAnimation'
import FadeAnimation from '@/common/animations/FadeAnimation'
import Split from '@/common/split/Split'
import CartControl from '@/components/cartcontrol/CartControl'
import RatingSelect from '@/components/ratingSelect/RatingSelect'
import {formatDate} from '@/util/date'
const ALL = 2
export default {
  name: 'FoodInfo',
  props: {
    food: Object
  },
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodWrapper, {
            click: false
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst () {
      Vue.set(this.food, 'count', 1)
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    changeRatingType (type) {
      this.selectType = type
      setTimeout(() => {
        this.scroll.refresh()
      }, 20)
    },
    changeOnlyContent (onlyContent) {
      this.onlyContent = onlyContent
      setTimeout(() => {
        this.scroll.refresh()
      }, 20)
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    MoveXAnimation,
    FadeAnimation,
    CartControl,
    Split,
    RatingSelect
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    width 100%
    z-index 20
    background #fff
    .img-header
      position relative
      width 100%
      height 0
      background #efefef
      padding-bottom 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back-wrapper
        position absolute
        top 10px
        left 0
        .back-icon
          display block
          padding 10px
          font-size 20px
          color #fff
    .content
      padding 18px
      position relative
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        height 10px
        line-height 10px
        font-size 0
        .sell-count, .rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 21
        height 24px
        line-height 24px
        padding 0 12px
        box-sizing border-box
        border-radius 12px
        font-size 10px
        color #fff
        background rgb(0, 160, 220)
    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color rgb(7, 17, 27)
      .text
        line-height 24px
        padding 0 8px
        font-size 12px
        color rgb(77, 85, 93)
    .rating
      padding-top 18px
      .title
        line-height 14px
        margin-left 18px
        font-size 14px
        color rgb(7, 17, 27)
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          padding 16px 0
          border-1px(rgba(7, 17, 27, .1))
          .user
            position absolute
            right 0
            top 16px
            line-height 12px
            font-size 0
            .name
              display inline-block
              margin-right 6px
              vertical-align top
              font-size 10px
              color rgb(147, 153, 159)
            .avatar
              border-radius 50%
          .time
            margin-bottom 6px
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
          .text
            line-height 16px
            font-size 12px
            color rgb(7, 17, 27)
            .up-icon, .down-icon
              margin-right 4px
              line-height 16px
              font-size 12px
              color rgb(147, 153, 159)
            .up-icon
              color rgb(0, 160, 220)
        .no-rating
          padding 16px 0
          font-size 12px
          color rgb(147, 153, 159)
</style>
