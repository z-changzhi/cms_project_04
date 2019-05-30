[TOC]
## 优化Img
### 白了骨架屏
> * 让用户体验更好
> * promise
### static/css/global.css
> * 添加 tmpl 
> * 所有即将别话的页面中都会被tmpl的样式
> * 相当于一个 div 包裹
### 用v-if来控制图片懒加载 缓存问题

```js
// 假如是初次进入，就不需要这个代码
// 只有在路由更新才会调用这个代码
if(categoryId===0){
    this.imgs = [];
}
```
```html
<img v-if="$route.query.categoryId===0" v-lazy="img.img_url">
<img v-else :src="img.img_url">
```
### Indicator 加载图标显示
> * src/main.js
> * Axios 中定义拦截器
> 1. 请求发起前显示 loading open()

```js
Axios.interceptors.request.use(function(config){
    // 不变配置 可变可以设置公共的请求头操作
    MintUI.Indicator.open({
      text: '加载中...',
      spinnerType: ' fading-circle'
    });
    return config; // 在这里可以直接拿到 config:{header}
})
```
> 2. 响应回来后隐藏 loading

```js
Axios.interceptors.response.use(function(response){
    console.log(response);
    // 接收响应头或者响应体中的数据，保存起来。共请求的拦截器中使用头信息操作
    MintUI.Indicator.close();
    return response // response:{config:{header},data:{}} 
})
```
## 图书详情
> ### src/components/Photo/PhotoList.vue 
> #### 1. 增加链接

```html
<router-link :to="{name:'PhotoDetail',params:{id:img.id}}">
</router-link>
```
> ### src/router/index.js
> #### 2. 配置路由

```js
import PhotoDetail from '@/components/Photo/PhotoDetail'
```
```html
{
    path:'/photo/detail/:id',
    name:'PhotoDetail',
    component:PhotoDetail
}
```
> ### src/components/Photo/PhotoDetail.vue
> #### 3. 创建文件
> 1. 添加 <nav-bar title="图文详情"/>
> 2. 在script中 添加

```js
export default {
    data(){
        return {
            photoInfo:{},//图文详情
            imgs:[],//缩略图信息
        }
    },
    created(){
        let pid = this.$route.params.id;
        // 发起请求 获取详情信息
        this.$axios.get(`getimageInfo/${pid}`)
        .then(res=>{
            this.photoInfo = res.data.message[0];
        })
        .catch(console.log);
        // es6 的模版字符串 好处就是可以随便换行
        // 可以嵌入变量
        
        // 获取图片缩略图信息
        this.$axios.get(`getthumimages/${pid}`)
        .then(res=>{
            this.imgs = res.data.message;
        })
        .catch(console.log)
    }
}
```
> 3. 模版 差值语法
> * 图片遍历

```html
<li v-for="(img,index) in imgs" :key="index">
    <img :src="img.src">
</li>
```
> * 图片遍历九宫格

```
<my-ul>
    <my-li v-for="(img,index) in imgs" :key="index">
        <img :src="img.src" slot="icon">
    </my-li>
</my-ul>
```
> * 修改模版 template

```
<li>
    <slot></slot>
    <slot name="icon" class="icon"></slot>
</li>
```
> * 设置icon css
> 使用者本省可以传入slot元素设置样式
> * 在接受这个dom 组件中，能给solt以后的元素设置样式
```css
.icon{
    width: 100%;
}
```

## slot
> * 使用者本身可以对传入的slot元素设置样式
> * 在接收这个DOM的组件中，能给slot以后的元素设置样式，而没能给slot设置样式
> * slot:样式管理孙，但是没有管理子
> * slot:本身是不会存在的，不像router-view会自己加一个div，所以给它加样式加不上去
> * 传递slot：自己管理自己

## query
> 1. query: /xxx?id=1    
> * 配置路由规则： path:'/xxx'
> * 组件接受： this.$route.query.id;
> * 传递：to:{query:{id:1}
> 1. params: /xxx/1
> * path:'/xxx/:id'
> * this.$route.params.id;
> * 传递：to:{params:{id:1}

## 缩略图组件 vue-preview
### src/main.js
> #### 安装vue-preview

```js
npm i vue-preview -S
```
> #### 导入vue-preview

```js
import VuePreview from 'vue-preview'
Vue.use(VuePreview);
```
> #### 使用vue-preview
> 1. html
```html
<vue-preview :slides="imgs"></vue-preview>
```
> 2. 给图片加入宽高

```
// 给图片加入宽高
this.imgs.forEach(img => {
    img.x = 200;
    img.y = 200;
    img.msrc = img.src;
})
```

> #### 总结
> 1. 在使用某些插件的时候，尽可能减少使用的成本
> 2. 用最简单的demo先实现功能，在对比自己的代码或属性。
> 3. 少数插件报错不太清晰，以前的该插件在没有参数传递w,h的时候会报错x,y之类的错
> 4. 找谁都没有用多对照文档来看

## 评论组件
> 需要id 数据来发起请求
### src/main.js

> #### 引入 Moment 组件

```js
    import Moment from 'moment';
    Moment.locale('zh-cn');
```
> #### 相对时间过滤器

```js
    Vue.filter('relTime',function(time){
        return Moment(time).formNow();
    });
```

> #### 创建Comment.vue模版

评论表单
```html
    <textarea style = "width:100%" v-model="content"></textarea>
```
创建评论提交按钮
```html
    <mt-button type="primary" 
    size="large" @click="sendMsg">发表评论</mt-button>

```
显示评论
```html
    <li v-for="(msg,index) in msgs" :key="index">
        {{msg.user_name}}:{{msg.content}}  {{msg.add_time | relTime}}
    </li>
    <mt-button size="large" type="danger" plain @click="loadMsgByPage">加载更多</mt-button>
```
script
```js
    export default {
        name:'comment',
        props:['cid'],
        data(){
            return {
                content:'',// 发表的评论信息
                msgs:[],//评论信息
                page:1// 页码
            }
        },
        methods:{
          goback(){
            this.$router.go(-1)  
          },
          init(){
              this.page = 1;
          },
          sendMsg(){
            this.$axios.post(`postcommment/${this.cid}`,`content=${this.cont}`)
            .then(res=>{
                // 页码归1
                this.init();
                // 加载最新的数据
                this.loadMsgByPage();
                
            })
            .catch(console.log)
          },
          loadMsgByPage (){
            this.$axios.get(`getcomments/${this.cid}?pageindex=${page}`).then(res=>{
                // 判断响应数据是否不足10条，如果不足十条
                if(res.data.message.length > 10){
                    // 给予提示
                }
                
                
                //判断 有时追加（）
                //有时赋值（第一页的时候）
                if(this.page===1){
                    this.msgs = res.data.message;
                }else{
                    this.msgs = this.msgs.concat(res.data.message);
                }
                this.page ++; //页码自增
                
            }).catch(console.log)
          }
        },
        // 钩子函数当中
        created(){ 
            this.loadMsgByPage(this.page);
        }
    }
```

> #### 引入 Comment 组件

```js
    import Comment from './components/common/Comment';
    Vue.use(Comment.name,Comment);
```

#### 使用评论组件

```
    <!-- 使用评论组件 -->
    <comment :cid="$route.params.id"/>
```

```
    created(){
        let pid = this.$route.params.id
    },
```
