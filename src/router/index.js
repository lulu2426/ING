import Vue from 'vue'
import Router from 'vue-router'
//底部路由
import Home from '@/components/footer/Home'
import Member from '@/components/footer/Member'
import Search from '@/components/footer/Search'
import Shopcar from '@/components/footer/Shopcar'
import NewsList from '@/components/news/NewsList'
import NewsInfo from '@/components/news/NewsInfo'
import PhotoList from '@/components/photos/PhotoList'
import PhotoInfo from '@/components/photos/PhotoInfo'
import GoodsList from '@/components/goods/GoodsList'
import GoodsInfo from '@/components/goods/GoodsInfo'
import GoodsDesc from '@/components/goods/GoodsDesc'
import GoodsComment from '@/components/goods/GoodsComment'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/member',
      component: Member
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/shopcar',
      component: Shopcar
    },
    {
      path: '/home/newslist',
      component: NewsList
    },
    {
      path: '/home/newsinfo/:id',
      component: NewsInfo
    },
    {
      path: '/home/photolist',
      component: PhotoList
    },
    {
      path: '/home/photoinfo/:id',
      component: PhotoInfo
    },
    {
      path: '/home/goodslist',
      component: GoodsList
    },
    {
      path: '/home/goodsinfo/:id',
      component: GoodsInfo
    },
    {
      path: '/home/goodsdesc/:id',
      name:'goodsdesc',
      component: GoodsDesc
    },
    {
      path: '/home/goodscomment/:id',
      name:'goodscomment',
      component: GoodsComment
    },
  ],
  linkActiveClass:'mui-active'//路由高亮
})
