<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="title-item" 
        v-for="(item, index) in titles" :key="index"
        :class="{active: currentIndex === index}"
        @click="titleClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
.title{
  display: flex;
  font-size: 14px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back img {
  margin-top: 10px;
  margin-left: 15px;
}
</style>