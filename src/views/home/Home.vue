<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banner="banner"/>
    <home-recommend-view :recommend="recommend"/>
  </div>
</template>

<script>
import {getHomeMultidata} from 'network/Home.js'
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  data() {
    return {
      banner:[],
      recommend: []
    }
  },
  created() {
    // 请求多个数据
    getHomeMultidata().then(res => {
      this.banner = res.data.banner.list
      this.recommend = res.data.recommend.list
    })
  }
}
</script>

<style>
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
</style>