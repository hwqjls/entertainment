// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'styles/resets.css';  //样式初始化
import 'styles/border.css';  //边框样式
import 'styles/common.scss';  //Sass默认样式
import 'styles/iconfont.css'; //图标库
import 'js/fastclick.js';     //解决初次加载用户单击问题
import 'js/common.js';        //设置rem以及通用配置

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
