<template>
  <div>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">{{goodsinfo.sell_price}}</span>
          </p>
          <p class="goods-num">
            购买数量：
            <van-stepper
              v-model="value"
              input-width="55px"
              button-size="32px"
              :max="goodsinfo.stock_quantity"
            />
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
            <!-- 分析： 如何实现加入购物车时候，拿到 选择的数量 -->
            <!-- 1. 经过分析发现： 按钮属于 goodsinfo 页面， 数字 属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面 中获取到 选中的商品数量值-->
            <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
            <!-- 4. 事件调用的本质： 父向子传递方法，子调用这个方法， 同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
        <div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="goDesc(id)">商品介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goComment(id)">商品评价</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data , 方便后期调用
      lunbotu: [], //轮播图数据
      value: 1, // 保存用户选中的商品数量， 默认，认为用户买1个
      goodsinfo: {},
      ballFlag: false //控制小球显示隐藏
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$axios.get("api/getthumimages/" + this.id).then(res => {
        if (res.data.status === 0) {
          res.data.message.forEach(item => {
            item.img = item.src;
          });
          this.lunbotu = res.data.message;
        }
      });
    },
    getGoodsInfo() {
      this.$axios.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.data.status === 0) {
          this.goodsinfo = res.data.message[0];
        }
      });
    },
    goDesc(id) {
      // 点击使用编程式导航跳转到 图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      // 点击跳转到 评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopcar() {
      //添加到购物车
      this.ballFlag = !this.ballFlag;
      //{ id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
      const goodsinfo = {
        id: this.id,
        count: this.value,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      //调用store中的mutations中的方法来将商品加入购物车
      this.$store.commit("addTocar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      //获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect(); //小球在页面中的位置
      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect(); //徽标在页面中的位置
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s linear";
      el.addEventListener("transitionend", done);
      // done();       //使用done()并不能完成动画 原因未知
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.selectedCount = count;
      console.log("父组件拿到的数量值为： " + this.selectedCount);
    }
  },
  components: {
    swiper
  }
};
</script>
<style lang="">
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
}
.now-price {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
.van-stepper .van-stepper__input {
  margin-bottom: 0px;
}
.mui-card-footer {
  display: block;
}
.mui-card-footer button {
  margin: 15px 0;
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  top: 400px;
  left: 146px;
  z-index: 100;
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  top: 400px;
  left: 146px;
  z-index: 100;
}
.van-stepper {
  display: inline;
}
</style>