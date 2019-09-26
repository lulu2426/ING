// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//安装路由
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
Vue.prototype.$axios = axios;

// 设置请求的根路径
Vue.axios.defaults.baseURL = 'http://www.liulongbin.top:3005/';
// 全局设置 post 时候表单数据格式组织形式   application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;


//定义全局过滤器
import moment from 'moment'
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})
//引入vant
import Vant from "vant"
import "../node_modules/vant/lib/index.css"
Vue.use(Vant)

Vue.config.productionTip = false
// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//引入mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

Vue.use(MintUI)
//状态管理..
import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中把购物车的数据读出来，放到 store 中
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state: {
    //this.$store.state.****
    car: car//将购物车中的数据，存成一个数组，在car数组中，存储一些商品的对象
    //{ id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
  },
  mutations: {
    //this.$store.commit('方法名')
    addTocar(state, goodsinfo) {
      //点击购物车，把商品信息，保存到store中的car上
      // 分析：
      // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
      // 2. 如果没有，则直接把 商品数据，push 到 car 中即可
      // 假设 在购物车中，没有找到对应的商品
      var flag = false
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
      if (!flag) {
        state.car.push(goodsinfo)
      }
      // 当 更新 car 之后，把 car 数组，存储到 本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中商品的数量值
      // 分析： 
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    removeFormcar(state, id) {
      // 根据Id，从store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id = id) {
          state.car.splice(i, 1)
          return true;
        }
      })
      // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
      localStorage.setItem('car', JSON.stringify(state.car))
    },
    updateGoodsSelected(state, info) {
      //更新购物车信息
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的 所有购物车商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    //this.#store.getters.****
    // 相当于 计算属性，也相当于 filters
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    //获取购物车中商品是否被选中的状态
    getGoodsSelected(state) {
      var s = {}
      state.car.forEach(item => {
        //item.id是自定义属性
        s[item.id] = item.selected
      })
      return s;
    },
    //计算购物车中的所有商品 总数量和总价
    getGoodsCountAndAmount(state) {
      var o = {
          count: 0, //勾选数量
          amount: 0 //勾选的总价
      }
      state.car.forEach(item => {
          if(item.selected){
              o.count += item.count;
              o.amount += item.count * item.price;
          }
      })
      return o;
  },
  }
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
