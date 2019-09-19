<template>
  <div class="flex-center position-ref full-height">
    <div class="content">
      <div class="title m-b-md">
        C.Fun
      </div>
      <div class="links">
        <router-link :to="{name:'login'}" target='_blank'>Login</router-link>
        <router-link :to="{name:'index'}">Blog</router-link>
        <a href="https://learnku.com/users/20250">Learnku</a>
        <a href="#" title="1606548133@qq.com">Email</a>
        <a href="https://github.com/yinchongcfun">GitHub</a>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        name: 'cover',
        components: {
        },
    }

    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?1a8d39225127bf63af313e2c620cdf69";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>

<style lang="css" slot-scoped>

  body {
    max-width: 100%;
    margin: 0 auto;
  }

  html, body {
    background-color: #fff;
    color: #636b6f;
    font-weight: 200;
    margin: 0;
  }

  .full-height {
    height: 100vh;
  }

    .flex-center {
        align-items: center;
        font-family: 'Nunito';
        display: flex;
        justify-content: center;
        background: url('./../../assets/images/bg.jpg')
    }
  .position-ref {
    position: relative;
  }

  .top-right {
    position: absolute;
    right: 10px;
    top: 18px;
  }

  .content {
    text-align: center;
  }

  .flex-center .title {
    font-size: 84px;
  }

  .flex-center .links > a {
    color: #636b6f;
    padding: 0 25px;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
  }

  .flex-center .m-b-md {
    margin-bottom: 30px;
  }
</style>
