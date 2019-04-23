<template>
  <div class="bulletin-wrapper" @click="showDetail">
    <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    <span class="iconfont bulletin-right-icon">&#xe6ac;</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'HeaderBulletin',
  props: {
    seller: Object
  },
  computed: {
    ...mapState(['detailShow'])
  },
  methods: {
    showDetail () {
      this.changeDetailShow(true)
    },
    ...mapMutations(['changeDetailShow'])
  }
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    background rgba(7, 17, 27, .2)
    ellipsis()
    .bulletin-title
      display inline-block
      vertical-align top
      margin-top 7px
      width 22px
      height 12px
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
    .bulletin-text
      vertical-align top
      margin 0 8px
      font-size 10px
    .bulletin-right-icon
      position absolute
      font-size 10px
      right 12px
</style>
