<template>
  <div>
    <head-list></head-list>
    <div class="detail-select">
      <div class="detail-container max-w">
        <div class="detail-title">
          <p>{{context.title}} </p>
          <p>{{context.created_at}}</p>
        </div>
        <mavon-editor
          id="md" class="md"
          :value="context.content"
          :subfield="prop.subfield"
          :defaultOpen="prop.defaultOpen"
          :toolbarsFlag="prop.toolbarsFlag"
          :editable="prop.editable"
          :scrollStyle="prop.scrollStyle"
          :codeStyle="prop.codeStyle"
          :ishljs="prop.ishljs"
          :navigation="prop.navigation"
          :fontSize="prop.fontSize"
          :autofocus="prop.autofocus"
        ></mavon-editor>
      </div>
    </div>
    <div class="comment">
      <div class="comment" v-if="commentList.length">
      </div>
      <div class="comment" v-else>

      </div>
    </div>
    <foot-list></foot-list>
  </div>
</template>

<script>
    import {getDetail} from '../../api/api.js';
    import headList from './header.vue'
    import footList from './footer.vue'
    export default {
        name: 'detail',
        components: {
            headList,
            footList,
        },
        props: {
            msg: String
        },
        data() {
            return {
                context: '',
                articleDetail: '',
                prop: {
                    subfield: false,// 单双栏模式
                    defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域
                    editable: false,
                    toolbarsFlag: false,
                    scrollStyle: true,
                    codeStyle: 'monokai',
                    ishljs: true,
                    navigation: true, // 导航目录,
                    fontSize:'30px',
                    autofocus:true,
                },
                commentList: []
            }
        },
        mounted() {
            let t = this;
            t.getArticleDetail();
        },
        methods: {
            getArticleDetail() {
                let t = this;
                let id =t.$route.query.id
                getDetail({id:id}).then((res) => {
                    if (res.code==200) {
                        let result = res.data;
                        t.context = result
                    }
                })
            }
        },

    }
</script>
<style scoped>

</style>
