<template>
  <div id="app">
    <app-header :seller="seller"></app-header>
    <app-tab></app-tab>
    <keep-alive>
      <router-view
        :seller="seller"
        :goods="goods"
        :ratings="ratings"
      />
    </keep-alive>
  </div>
</template>

<script>
import AppHeader from './common/header/AppHeader'
import AppTab from './common/tab/AppTab'
import axios from 'axios'
import {urlParse} from '@/util/urlParse'
export default {
  name: 'App',
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      },
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
      axios.get(`/api/data.json?id=${this.seller.id}`).then(this.getSellerInfoSucc)
    },
    getSellerInfoSucc (res) {
      res = res.data
      if (res.ret && res.data) {
        const data = res.data
        this.goods = data.goods
        this.ratings = data.ratings
        this.seller = Object.assign({}, this.seller, data.seller)
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
