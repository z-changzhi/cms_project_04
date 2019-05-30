<template>
  <div class="tmpl">
    <mt-header :title="title">
      <!-- 不要这种的 给它来一个@的chlick事件 -->
      <!-- <router-link to="/" slot="left"> -->
      <div @click="goback" slot="left">
        <mt-button icon="back">返回</mt-button>
      </div>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>
<script>
export default {
    name:'nav-bar',
  props: ['title'],//props属性 在template中可以直接用
  created(){
      // 在这里 使用 this.title
  },
  data() {
    return {
      // title: "新闻列表",
      newsList: [] // 新闻列表数据
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.tmpl .mint-header {
  background-color: green;
}
</style>