<template>
  <div id="app">
    <!-- 顶部标题 -->
    <mt-header title="信息管理系统"></mt-header>
    <router-view/>
    <!-- 底部tabbar -->
    <!-- {{selected}} -->
    <mt-tabbar v-model="selected">
      <mt-tab-item id="Home">
        <img slot="icon" src="../static/img/index.png">
        外卖
      </mt-tab-item>
      <mt-tab-item id="Member">
        <img slot="icon" src="../static/img/vip.png">
        订单
      </mt-tab-item>
      <mt-tab-item id="Shopcart">
        <img slot="icon" src="../static/img/shopcart.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="Search">
        <img slot="icon" src="../static/img/find.png">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      selected: ""
    };
  },
  watch: {
    // 不能使用箭头函数 因为this会向上指
    selected:function(newV,oldV){
      // console.log(newV);// 页面改变
      // console.log(this);
      this.$router.push({
        name:newV
      });
    }
  }
};
</script>

<style>
.mint-tabbar {
  position: fixed;
  bottom: 0;
}
.mint-tab-item img {
    display: block;
    /* width: 55px;
    height: 55px; */
} 
</style>
