<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-columns">
      <span  v-for="(item, index) in goods.columns" :key="index">{{item}}</span>
    </div>
    <div class="info-services">
      <div class="info-services-item" v-for="(item, index) in goods.services" :key="index">
        <img v-if="item.icon" :src="item.icon" alt="">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }

}
</script>

<style>
.base-info{
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title{
  color: #222;
}
.info-price{
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .old-price{
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.info-price .discount{
  font-size: 12px;
  padding: 2px 5px;
  background-color: var(--color-high-text);
  color: #fff;
  border-radius: 8px;
  margin-left: 5px;
  position: relative;
  top: -6px;
}
.info-columns{
  margin-top: 15px;
  line-height: 30px;
  display: flex;
  font-size: 13px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, .1);
}
.info-services{
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
.info-services-item img{
  width: 10px;
  height: 10px;
  position: relative;
  top: 1px;
}
.info-services-item span{
  font-size: 10px;
  color: #333;
}
</style>