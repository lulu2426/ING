<template>
  <div class>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/'+ item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url" />
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | dateFormat}}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newslist: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    //获取新闻列表信息
    getNewsList() {
      this.$axios.get("api/getnewslist").then(res=>{
        console.log(res.data)
        if(res.data.status===0){
          this.newslist = res.data.message;
        }else {
          Toast("获取新闻列表失败");
        }
      })
    }
  }
};
</script>
<style scoped>
.mui-media-body h1 {
  font-size: 14px;
}
.mui-ellipsis {
  font-size: 12px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}
</style>