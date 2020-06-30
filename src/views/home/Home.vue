<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control 
      :title="['流行', '新款', '精选']"
      @itemClick="itemClick"
      ref="fixTabControl"
      v-show="isTabControlFixed"/>
    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper 
      :banner="banner"
      @swiperImageLoad="swiperImageLoad"
      :homeSwiperHeight = "homeSwiperHeight"/>
      <home-recommend-view :recommend="recommend"/>
      <feature-view/>
      <tab-control 
      :title="['流行', '新款', '精选']"
      @itemClick="itemClick"
      ref="tabControl"
      v-show="!isTabControlFixed"/>
      <goods-list 
      :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import {itemListenerMixin} from 'common/mixin'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabControlFixed: false,
      saveY: 0,
      homeSwiperHeight: true
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  mixins:[itemListenerMixin],
  created() {
    // 请求多个数据
    this.getHomeMultidata(),
    // 请求商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },
  mounted() {
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.homeSwiperHeight = true
  },
  deactivated() {
    // 保存离开时的y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImageListener)
    // swiper高度问题
    this.homeSwiperHeight = false
  },
  methods: {
    // 事件监听方法
    itemClick(index){
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.fixTabControl.currentIndex = index 
      this.$refs.tabControl.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      // 判断tabControl是否吸顶
      this.isTabControlFixed = (-position.y) > this.tabOffsetTop - 44
    },
     // 获取tabControl的offsetTop
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    // 加载更多
    loadMore(){
      this.getHomeGoods(this.currentType)

      this.$refs.scroll.scroll.refresh()
    },
    // 网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home{
  height: 100vh;
}

.home-nav{
  background-color: var(--color-tint);
  color: #fff;
}
.content{
  height: calc(100% - 93px);
}
</style>