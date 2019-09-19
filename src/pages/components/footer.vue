<template>
  <div>
    <div class="footer-copy">
      <div class="copy-content max-w">
        <div class="copy-item">
          <h3>关于社区</h3>
          <p>欢迎大家一起分享前后端知识.</p>
        </div>
        <div class="copy-item">
          <h3>我的邮箱</h3>
          <p>1606548133@qq.com</p>
        </div>
        <div class="copy-item">
          <h3>其他信息</h3>
           JOIN US
        </div>
      </div>
    </div>
    <!-- 返回顶部 -->
    <transition name="fade">
      <div class="to-top" v-if="toTop" @click="gotoTop">
        <i class="iconfont icon-jiantou-copy"></i>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'footList',
  components: {
    // HelloWorld
  },
  data(){
    return {
      show: false,
      activeNames: [''],
      toTop: false,
      relate: [],
      article: []
    }
  },
  methods: {
    windowScroll () {
      //滚动条距离页面顶部的距离
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop //原生兼容
        if(scrollTop > 100){
          this.toTop = true;
        }else{
          this.toTop = false;
        }
    },
    gotoTop(){
      let t = this
      t.timer = setInterval(function () {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop
        let ispeed = Math.floor(-osTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed
        t.isTop = true
        if(osTop > 100){
          this.toTop = false;
        }
        if (osTop === 0) {
          clearInterval(t.timer)
        }
      }, 30)
    },
  },
  mounted () {
    let t = this;
    window.addEventListener('scroll', this.windowScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.windowScroll)
  }
}
var _hmt = _hmt || [];
(function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?58e1a62d733e69e6f0c92487586af476";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
</script>
<style lang="css" slot-scoped>

</style>
