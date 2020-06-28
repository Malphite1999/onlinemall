<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail} from 'network/detail'
import DetailSwiper from './childComps/DetailSwiper'
export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  created() {  
    // 保存传入的iid
    this.iid = this.$route.params.iid
    // 根据iid请求详细数据
    getDetail(this.iid).then(res => {
      // 1.获取顶部图片轮播数据
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style>

</style>