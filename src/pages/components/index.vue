<template>
  <div class="main-container">
    <head-list></head-list>
    <div class="banner" style="text-align: center">
      <el-carousel :interval="4000" type="card" height="370px">
        <el-carousel-item v-for="item in hotRuestions" :key="item.id">
          <router-link :to="{name:'detail',query:{id: item.id}}" class="banner-link">
              <div class="banner-container">
                <img :src="item.cover" :onerror="errorUserPhoto" class="image">
                <span class="item-title" style="margin-left:  50px ">{{item.title}}</span>
              </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="tab-container max-w">
      <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">热门文章</el-menu-item>
      <el-menu-item index="2">一般文章</el-menu-item>
      </el-menu>
      <div class="tab-content" v-if="tabIndex==1">
        <div class="tab-item " v-for="item in questions" v-if="questions.length >0">
          <router-link :to="{name:'detail',query:{id: item.id}}" class="clearfix">
            <div class="tab-pic">
              <img :src="item.cover" :onerror="errorUserPhoto">
            </div>
            <div class="tab-detail">
              <p>{{item.title}}</p>
              <p>{{item.desc}}</p>
              <p>
                <span v-for="(item, index) in item.tags"  :key="index" >{{item.tag_name}}</span>
              </p>
            </div>
          </router-link>
          </div>
        <div class="no-actail" v-else>
          暂无内容
        </div>
        <el-pagination
          background = "true"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="total" class="pagination">
        </el-pagination>
      </div>
      <div class="tab-content" v-else-if="tabIndex=2">
        <div class="tab-item" v-for="item in hotRuestions" v-if="hotRuestions.length >0">
          <router-link :to="{name:'detail',query:{id: item.id}}" class="clearfix">
            <div class="tab-pic">
              <img :src="item.cover" :onerror="errorUserPhoto">
            </div>
            <div class="tab-detail">
              <p>{{item.title}}</p>
              <p>{{item.desc}}</p>
              <p>
                <span v-for="(item, index) in item.tags"  :key="index" >{{item.tag_name}}</span>
              </p>
            </div>
          </router-link>
        </div>
          <div class="no-actail" v-else>
          暂无内容
        </div>
        <el-pagination
          background = "true"
          layout="prev, pager, next"
          @current-change="handleHotCurrentChange"
          :page-size="10"
          :total="hotTotal" class="pagination">
        </el-pagination>
      </div>
    </div>
    <foot-list></foot-list>
    <router-view/>
  </div>
</template>

<script>
import userPhoto from '@/assets/images/errorImg.gif'
import {getIndexList} from '../../api/api.js';
import '@/assets/common/common.css'
import headList from './header.vue'
import footList from './footer.vue'
export default {
  name: 'index',
  components: {
    headList,
    footList
  },
  data(){
    return {
      activeIndex: "1",
      tabIndex: 1,
      screenWidth: document.body.clientWidth,
      currentIndex: 0,
      show: false,
      currentPage: 1,
      currentHotPage: 1,
      images: [
        require('./../../assets/images/timg.jpg'),
        require('./../../assets/images/timg1.jpg'),
        require('./../../assets/images/timg2.jpg')
      ],
      questions: [],
      hotRuestions: [],
      total: 0,
      hotTotal: 0,
      errorUserPhoto:'this.src="' + userPhoto + '"',
    }
  },
  methods: {
    onChange(index) {
      this.currentIndex = index;
    },
    getIndexList(){
      let t = this;
      getIndexList({
        page: t.currentPage
      }).then((res)=>{
        if(res && res.data && res.data.data && res.data.data.data.length){
          let result = res.data.data.data;
          let total = res.data.data.total;
          t.questions = result;
          t.total = total;
        }
      })
    },
    gethotList(){
      let t = this;
      getIndexList({
        is_hot: 1,
        page: t.currentHotPage
      }).then((res)=>{
        if(res && res.data && res.data.data && res.data.data.data.length){
          let result = res.data.data.data;
          let total = res.data.data.total;
          t.hotRuestions = result;
          t.hotTotal = total;
        }
      })
    },
    handleSelect(key, keyPath) {
      let t = this;
      t.tabIndex = key
    },
    handleCurrentChange(val){
      let t = this;
      t.currentPage = val
      t.getIndexList()
    },
    handleHotCurrentChange(val){
      let t = this;
      t.currentHotPage = val
      t.gethotList()
    },
    // 获取首页列表数据

  },
  mounted(){
    let t = this;
    t.getIndexList()
    t.gethotList()
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            t.screenWidth = window.screenWidth
        })()
    }
  },
  watch:{

    screenWidth(val){
      let t = this;
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if(!t.timer){
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            t.screenWidth = val
            t.timer = true
            // setTimeout(function(){
            //     if(document.documentElement.clientWidth > 1000){
            //         require('./../../assets/common/pcindex.css');
            //         console.log(t.screenWidth)
            //         // this.plaform = 'pc';
            //     }else{
            //         require('./../../assets/common/mobile.css');
            //     }
            //     console.log(t.screenWidth)
            //     t.timer = false
            // },400)
        }
    }
  },
}
</script>
<style lang="css" slot-scoped>
  .pagination{
    margin-top: 20px;
    text-align: center;
  }
</style>
