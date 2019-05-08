<template>
  <div class="rating-select">
    <div class="rating-type boder-1px">
      <span class="block positive" :class="{'active': selectType === 2}" @click="select(2)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{'active': selectType === 0}" @click="select(0)">
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" :class="{'active': selectType === 1}" @click="select(1)">
        {{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{'on': onlyContent}" @click="toggleContent">
      <span class="iconfont check-icon">&#xe613;</span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  name: 'RatingSelect',
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    select (type) {
      this.$emit('changeRatingType', type)
    },
    toggleContent () {
      this.$emit('changeOnlyContent', !this.onlyContent)
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .rating-select
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, .1))
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        line-height 16px
        font-size 12px
        color rgb(77, 85, 93)
        &.active
          color #fff
        .count
          margin-left 2px
          font-size 8px
        &.positive
          background rgba(0, 160, 220, .2)
          &.active
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 93, .2)
          &.active
            background rgb(77, 85, 93)
    .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27, .1)
      color rgb(147, 153, 159)
      font-size 0
      &.on
        .check-icon
          color #22c850
      .check-icon
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 18px
      .text
        font-size 12px
        display inline-block
        vertical-align top
</style>
