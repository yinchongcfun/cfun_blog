<template>
  <div>
    <div class="header">
      <div class="flex-between">
        <span @click="(show = !show)"><i class="iconfont icon-daohang"></i></span>
        <span>cfun个人博客</span>
        <span ></span>
      </div>
      <div class="header-nav">
        <el-collapse-transition>
          <div v-show="show">
            <div class="transition-box">
              <p><router-link :to="{name:'index'}">主页</router-link></p>
              <p><router-link :to="{name:'login'}" >后台</router-link></p>
              <p><a href="https://learnku.com/users/20250" target='_blank' >Learnku</a></p>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'headList',
    components: {
    },
  data(){
    return {
      show: false,
      list: [],
      defaultProps: {
          children: 'children',
          label: 'label'
        }
    }
  },
  methods: {
  },
  mounted(){
    let t = this;
  }
}
</script>
<style lang="css" slot-scoped>
  .header-container{
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
