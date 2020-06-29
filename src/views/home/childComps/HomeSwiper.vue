<template>
  <div class="swiper">
    <swiper :options="swiperOption">
      <!-- slides -->
      <swiper-slide v-for="(item,index) in banner" :key="index"
      :class="{'swiperHeight':homeSwiperHeight}">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
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
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    },
    homeSwiperHeight: {
      type: Boolean
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  methods:{
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
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
        loop: true,  //循环
      },
      isLoad: false
    }
  },
}
</script>

<style>
.swiper a img{
  width: 100%;
}
/* 解决同时引用swiper高度不统一 */
.wrapper .swiperHeight{
  height: auto;
}
.swiper-slide{
  height: 300px;
  overflow: hidden;
}
</style>