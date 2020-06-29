<template>
  <div id="detail">
    <detail-nav-bar/>
    <scroll class="content"
    ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop :shop="shop"/>
      <detail-goods-info 
      :detail-info="detailInfo"
      @imageLoad="imageLoad"/>
      <detail-param-info :param-info = 'paramInfo' ref="params"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShop from'./childComps/DetailShop'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'

import {debounce} from 'common/utils/debounce'

import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop, GoodsParam} from 'network/detail'

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
    }
  },
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
      );
    })
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh()
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
  height: calc(100% - 44px);
}
</style>