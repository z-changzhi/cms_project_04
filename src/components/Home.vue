<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- v-for 组件的时候需要给 key 避免vue 计算key 来提升性能 -->
      <!-- key 实际上就是一个位置标示 -->
      <mt-swipe-item v-for="(item,index) in imgs" :key="index">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe>
    <!-- 下有九宫格 -->
    <div class="grid">
      <my-ul>
        <my-li v-for="(module,index) in modules" :key="index">
          <router-link :to="module.route">
            <span :class="module.className"></span>
            <div>{{module.title}}</div>
          </router-link>
        </my-li>
      </my-ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 创建一个变量保存 轮播图的数据
      imgs: [],
      modules: [
        {
          title: "新闻资讯",
          className: "back-news",
          route: { name: "NewsList" }
        },
        {
          title: "图文分享",
          className: "back-pic",
          route: { name: "PhotoList", query: { categoryId: 0 } }
        },
        {
          title: "商品展示",
          className: "back-goods",
          route: { name: "Home" }
        },
        {
          title: "留言反馈",
          className: "back-feed",
          route: { name: "Home" }
        },
        {
          title: "搜索咨询",
          className: "back-search",
          route: { name: "Home" }
        },
        {
          title: "联系我们",
          className: "back-callme",
          route: { name: "Home" }
        }
      ]
    };
  },
  created() {
    this.$axios
      .get("lunbo.json")
      .then(res => {
        // console.log(res);
        this.imgs = res.data.message;
      })
      .catch(err => console.log(err));
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-swipe {
  width: 100%;
  height: 200px;
}
.mint-swipe img {
  width: 100%;
}

/*九宫格样式*/
img {
        width: 100%;
    }
.grid span {
  display: inline-block;
  margin: 10px 0;
  width: 50px;
  height: 50px;
  background-repeat: round;
}

.back-pic {
  background-image: url(../../static/img/picShare.png);
}
.back-goods {
  background-image: url(../../static/img/goodsShow.png);
}
.back-feed {
  background-image: url(../../static/img/feedback.png);
}
.back-search {
  background-image: url(../../static/img/search.png);
}
.back-callme {
  background-image: url(../../static/img/callme.png);
}
.back-news {
  background-image: url(../../static/img/news.png);
}
ul {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
li {
  list-style: none;
  float: left;
  width: 33.333%;
  text-align: center;
}

</style>
