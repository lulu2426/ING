<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time| dateFormat}}</span>
      <span>点击：{{ photoinfo.click }}次</span>
    </p>

    <hr>
    <!-- 缩略图区域 -->
    <div class="thumbs">
        <vue-preview :slides="list" ></vue-preview>
    </div>
    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 放置一个现成的 评论子组件 -->
    <comment :id="id"></comment>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue"
export default {
    data(){
        return{
            id:this.$route.params.id,//从路由中获取到的 图片Id
            photoinfo:{},//图片详情
            list:[]// 缩略图的数组
        };
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs()
    },
    methods:{
        getPhotoInfo(){
            this.$axios.get("api/getimageInfo/"+this.id).then(res=>{
                if(res.data.status===0){
                    this.photoinfo=res.data.message[0]
                }
            })
        },
        getThumbs(){
            this.$axios.get("api/getthumimages/" + this.id).then(res=>{
                if(res.data.status===0){
                    // 把完整的数据保存到 list 中
                    res.data.message.forEach(item => {
                        item.w = 600;
                        item.h = 400;
                        item.msrc=item.src;
                    });
                    // 把完整的数据保存到 list 中
                    this.list = res.data.message;
                }
            })
        }
    },
    components:{
        comment
    },


}
</script>
<style>
.photoinfo-container {
  padding: 3px;
}
.photoinfo-container h3 {
  color: royalblue;
  font-size: 15px;
  text-align: center;
  margin: 15px 0;
}
.photoinfo-container .subtitle {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.photoinfo-container .content {
  font-size: 13px;
  line-height: 28px;
}

.thumbs figure{
    padding: 8px;
    margin: 0;
}
.thumbs .my-gallery{
    display: flex;
    flex-wrap:wrap;
    justify-content: flex-start;
}
.thumbs img{
    width: 73px;
    height: 73px;
}
</style>