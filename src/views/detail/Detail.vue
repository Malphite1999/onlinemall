<template>
  <div id="detail">
    <detail-nav-bar 
    @titleClick="titleClick"
    ref="nav"/>
    <scroll class="content"
    ref="scroll"
    @scroll="contentScroll"
    :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop :shop="shop"/>
      <detail-goods-info 
      :detail-info="detailInfo"
      @imgLoad="imgLoad"/>
      <detail-param-info 
      :param-info = 'paramInfo' 
      ref="params"/>
      <detail-comment-info 
      :comment-info="commentInfo"
      ref="comment"/>
      <goods-list 
      :goods="recommends"
      ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShop from'./childComps/DetailShop'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils/debounce'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {  
    // 保存传入的iid
    this.iid = this.$route.params.iid
    // 根据iid请求详细数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 1.获取顶部图片轮播数据
      this.topImages = data.itemInfo.topImages

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 3.获取商家信息
      this.shop = new Shop(data.shopInfo)
      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
    // 给getThemetopY
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44); 
      this.themeTopYs.push(Number.MAX_VALUE)
    }, 100)
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImageListener)
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y
      // positionY和主题中的值进行对比
      let length =this.themeTopYs.length
      for(let i = 0; i < length-1; i++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.newPrice
      product.iid = this.iid
      // 2.将商品添加到购物车里
      this.$store.commit('addCart', product)
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content{
  overflow: hidden;
  height: calc(100% - 99px);
}
.goods-info{
  position: relative;
}
</style>