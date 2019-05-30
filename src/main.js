// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 开发环境的配置
Vue.config.productionTip = false

// Mint UI 开始
// Mint UI 开始
// 引入 Mint UI
import MintUI from 'mint-ui'
// 安装 插件
Vue.use(MintUI);
/*
 * 里面做的就是注册里面所有的全局组件
 * 并给Vue.proprototype 去挂载一些对象。方便你使用。
 * 组件内 this.xxx 就可以用了
 */
// 引入 css
import 'mint-ui/lib/style.css'
// Mint UI 结束
// Mint UI 结束

// 引入全局样式
import '../static/css/global.css'

// axios 开始
// axios 开始
import Axios from 'axios';
// 给 Vue 的原型挂载$axios 属性
Vue.prototype.$axios = Axios;
// Axios.defaults.baseURL = 'https://www.sinya.online/api/'
Axios.defaults.baseURL = '../static/json/';
// axios 结束
// axios 结束

// 全局组件开始 
// 全局组件开始 
import MyUl from './components/common/MyUl';
import MyLi from './components/common/MyLi';
import NavBar from './components/common/NavBar';


Vue.component(MyUl.name,MyUl);
Vue.component(MyLi.name,MyLi);
Vue.component(NavBar.name,NavBar);
// 全局组件结束
// 全局组件结束

// 定义全局过滤器开始
// 定义全局过滤器开始
import Moment from 'moment';
Vue.filter('convertTime',function(data,formatStr){
  // 2015-04-15T03:50:28.000Z
  return Moment(data).format(formatStr);
});
// 定义全局过滤器结束
// 定义全局过滤器结束
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
