<template>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul>
      <li class="food-list food-list-hook" v-for="(item, index) in goods" :key="index">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li class="food-item border-1px" v-for="(food, index) in item.foods" :key="index">
            <div class="icon">
              <img class="icon-img" :src="food.icon">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">{{food.price | currency('￥', 0)}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice | currency('￥', 0)}}</span>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'GoodsFoods',
  props: {
    goods: Array
  },
  data () {
    return {
      listHeight: [],
      scrollY: 0
    }
  },
  computed: {
    ...mapState(['clickMenuIndex']),
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
    }
  },
  watch: {
    currentIndex () {
      this.changeCurrentIndex(this.currentIndex)
    },
    clickMenuIndex () {
      let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
      let el = foodList[this.clickMenuIndex]
      this.foodsScroll.scrollToElement(el, 300)
    }
  },
  methods: {
    ...mapMutations(['changeCurrentIndex']),
    _initScroll () {
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
      this._calculateHeight()
    }, 20)
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      border-1px(rgba(7, 17, 27, .1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
        .icon-img
          width 57px
          height 57px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          margin-bottom 8px
          line-height 12px
        .extra
          .count
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
</style>
