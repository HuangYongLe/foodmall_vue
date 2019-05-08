<template>
  <div id="app">
    <app-header :seller="seller"></app-header>
    <app-tab></app-tab>
    <router-view
      :seller="seller"
      :goods="goods"
      :ratings="ratings"
    />
  </div>
</template>

<script>
import AppHeader from './common/header/AppHeader'
import AppTab from './common/tab/AppTab'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      seller: {},
      goods: [],
      ratings: []
    }
  },
  components: {
    AppHeader,
    AppTab
  },
  methods: {
    getSellerInfo () {
      axios.get('/api/data.json').then(this.getSellerInfoSucc)
    },
    getSellerInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.seller = data.seller
        this.goods = data.goods
        this.ratings = data.ratings
      }
    }
  },
  mounted () {
    this.getSellerInfo()
  }
}
</script>

<style>
</style>
