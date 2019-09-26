<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postcomment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item , i) in commentlist" :key="item.index">
        <div
          class="cmt-title"
        >第{{i+1}}楼&nbsp;用户：{{item.user_name}} 发表时间：{{item.add_time | dateFormat}}</div>
        <div class="cmt-body">{{item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页
      commentlist: [],
      msg: "" //评论输入的内容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$axios
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(res => {
          if (res.data.status === 0) {
            // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
            this.commentlist = this.commentlist.concat(res.data.message);
          }
        });
    },
    getmore() {
      //加载更多
      this.pageIndex++;
      this.getComments();
    },
    postcomment() {
      //发表评论
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空！");
      }
      // 参数1： 请求的URL地址
      // 参数2： 提交给服务器的数据对象 { content: this.msg }
      // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
      this.$axios.post("api/postcomment/"+this.$route.params.id,{content:this.msg.trim()})
        .then(res=>{
          if(res.data.status===0){
            //1. 拼接出一个评论对象
            let cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.commentlist.unshift(cmt);
            this.msg=""
          }
        }).catch(err=>{
          console.log(err)
        })
    }
  },
  props: ["id"]
};
</script>
<style scoped>
.cmt-container h3 {
  font-size: 18px;
}
.cmt-container textarea {
  font-size: 14px;
  height: 85px;
  margin: 0;
}
.cmt-list {
  margin: 5px 0;
}
.cmt-item {
  font-size: 13px;
}
.cmt-title {
  line-height: 30px;
  background-color: #ccc;
}
.cmt-body {
  line-height: 35px;
  text-indent: 2em;
}
</style>