<template>
  <div>
    <van-tabs>
      <van-tab v-for="item in cates" :key="item.id">
        <div class="tab-title" slot="title" @click="getPhotoListByCateId(item.id)">{{item.title}}</div>
      </van-tab>
    </van-tabs>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
      <img v-lazy="item.img_url"> 
      <div class="info">
        <h1 class="info-tiitle">{{ item.title }}</h1>
        <div class="info-body">{{ item.zhaiyao }}</div>
      </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
export default {
  data () {
    return {
      cates:[], //所有分类列表数组
      list:[]
    }
  },
  created(){
    this.getAllCategory();
    this.getPhotoListByCateId(0);
  },
  mounted(){
    
  },
  methods:{
    getAllCategory(){
      //图片分类
      this.$axios.get("api/getimgcategory").then(res=>{
        if(res.data.status===0){
          res.data.message.unshift({title:"全部",id:0});
          this.cates=res.data.message
        }
      })
    },
    getPhotoListByCateId(cateId){
      //根据分类列表，获取图片列表
      this.$axios.get("api/getimages/"+cateId).then(res=>{
        if(res.data.status===0){
          this.list=res.data.message
        }
      })
    }
  }
}

</script>

<style lang="">
 .van-tabs__line {
  background-color: dodgerblue;
  z-index: 100;
}
.van-tab--active {
  color: cornflowerblue;
  z-index: 100;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
}
.photo-list li {
  background-color: #ccc;
  text-align: center;
  margin-bottom: 10px;
  box-shadow: 0 0 9px #999;
  position: relative;
}
.photo-list img {
  width: 100%;
  vertical-align: middle;
}
.photo-list .info {
  color: #ffffff;
  text-align: left;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  max-height: 84px;
  text-decoration: none;
}
.photo-list .info h1{
  font-size: 14px;
  text-decoration: none;
}
.photo-list .info .info-body {
  font-size: 13px;
} 
</style>