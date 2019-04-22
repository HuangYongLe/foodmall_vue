<template>
  <div class="app-tab border-1px">
    <router-link class="tab-item" to="/">商品</router-link>
    <router-link class="tab-item" to="/ratings">评价</router-link>
    <router-link class="tab-item" to="/seller">商家</router-link>
  </div>
</template>

<script>
export default {
  name: 'AppTab'
}
</script>

<style lang="stylus" scoped>
  @import '~styles/mixins.styl'
  .app-tab
    display flex
    width 100%
    height 40px
    line-height 40px
    font-size 14px
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex 1
      text-align center
      color rgb(77, 85, 93)
      &.router-link-exact-active
        color rgb(240, 20, 20)
</style>
