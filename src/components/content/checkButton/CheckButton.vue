<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>

<style scoped>
 .check-button{
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
 }
   .check-button img{
    width: 13px;
   }
  .check {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>