<template>
  <div class="header">
    <header-content :seller="seller"></header-content>
    <header-bulletin :seller="seller"></header-bulletin>
    <div class="background">
      <img class="background-img" :src="seller.avatar">
    </div>
    <header-detail :seller="seller"></header-detail>
  </div>
</template>

<script>

import HeaderContent from './headerComponents/content/Content'
import HeaderBulletin from './headerComponents/bulletin/Bulletin'
import HeaderDetail from './headerComponents/detail/Detail'
export default {
  name: 'AppHeader',
  props: {
    seller: Object
  },
  components: {
    HeaderContent,
    HeaderBulletin,
    HeaderDetail
  }
}
</script>

<style lang="stylus" scoped>
  .header
    position relative
    overflow hidden
    color #fff
    background-color rgba(7, 17, 27, .5)
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      text-align center
      filter blur(10px)
      .background-img
        width 100%
</style>
