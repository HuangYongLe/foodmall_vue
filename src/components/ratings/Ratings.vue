<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        :selectType="selectType"
        :onlyContent="onlyContent"
        :ratings="ratings"
        @changeRatingType="changeRatingType"
        @changeOnlyContent="changeOnlyContent"
      ></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px" v-for="(rating, index) in ratings" :key="index" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star class="star" :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend"><span class="iconfont up-icon" v-if="rating.rateType === 0">&#xe6e3;</span><span class="iconfont down-icon" v-else>&#xe682;</span><span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span></div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import Star from '@/common/star/Star'
import Split from '@/common/split/Split'
import RatingSelect from '@/components/ratingSelect/RatingSelect'
import {formatDate} from '@/util/date'
const ALL = 2
export default {
  name: 'RatingsContent',
  props: {
    seller: Object,
    ratings: Array
  },
  components: {
    Star,
    Split,
    RatingSelect
  },
  data () {
    return {
      selectType: ALL,
      onlyContent: true
    }
  },
  methods: {
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
  mounted () {
    setTimeout(() => {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.ratings, {
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
  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        padding 6px 0
        width 137px
        border-right 1px solid rgba(7, 17, 27, .1)
        text-align center
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
        .score
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .title
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .star
            margin 0 12px
            display inline-block
            vertical-align top
          .score
            display inline-block
            vertical-align top
            line-height 18px
            font-size 12px
            color rgb(255, 153 , 0)
        .delivery-wrapper
          font-size 0
          .title
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .delivery-time
            margin-left 12px
            font-size 12px
            color rgb(147, 153, 159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, .1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 6px
              vertical-align top
            .delivery
              display inline-block
              margin-right 6px
              vertical-align top
              font-size 10px
              line-height 12px
              color rgb(147, 153, 159)
          .text
            margin-bottom 8px
            font-size 12px
            line-height 18px
            color rgb(7, 17, 27)
          .recommend
            line-height 16px
            font-size 0
            .up-icon, .down-icon, .item
              display inline-block
              margin 0 8px 4px 0
              line-height 16px
              font-size 12px
              color rgb(147, 153, 159)
            .up-icon
              color rgb(0, 160, 220)
            .item
              padding 0 6px
              font-size 9px
              border 1px solid rgba(7, 17, 27, .1)
              border-radius 1px
              background #fff
          .time
            position absolute
            top 0
            right 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)
</style>
