<template>
  <div class="swaper">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt="">
      </swiper-slide>
      <!-- 轮播图下方的分页小圆点 -->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      swiperOption: {
        pagination: { //配置轮播图的分页器
          el: '.swiper-pagination',  //小圆点的类名
          clickable: true    //底部是否可以点击
        },
        // 自动播放
        autoplay: {
          delay: 3000, //图片展示时长
          disableOnInteraction: false //触碰后停止切换
        },
        speed: 500,  //切换速度
        loop: true,  //循环,
      }
    }
  },
}
</script>

<style>
.swiper-slide img{
  width: 100%;
}
.swiper-slide{
  height: 300px;
}
</style>