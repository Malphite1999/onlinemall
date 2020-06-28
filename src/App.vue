<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <tab-bar-main/>
  </div>
</template>

<script>
import TabBarMain from 'components/content/tabBarMain/TabBarMain'

export default {
  name: 'App',
  components: {
    TabBarMain
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
