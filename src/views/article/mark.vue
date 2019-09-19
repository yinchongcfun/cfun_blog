<template>
  <section>
    <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="padding-top:20px;">
      <el-form-item label="标题" style="width: 60%">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="描述" style="width: 60%">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="标签" placeholder="多个标签用,隔开" style="width: 80%">
        <el-tag
          :key="tag"
          v-for="tag in tags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+添加</el-button>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.classif" placeholder="请选择">
          <el-option label="JAVA" value="1"></el-option>
          <el-option label="PHP" value="2"></el-option>
          <el-option label="VUE" value="3"></el-option>
          <el-option label="MYSQL" value="4"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="封面图" prop="cover">
        <upload-img :img-src="form.cover" @upload-img="upDateImg">
        </upload-img>
      </el-form-item>

      <el-form-item label="内容">
        <div class="editor-top">
          <markdown-editor id="mark" v-model="form.content"></markdown-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click.native.prevent>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
    import '@/assets/common/markdown.css'
    import {addArticle, detailArticle} from '../../api/api';
    import uploadImg from './qiniu';
    import markdownEditor from './editor.md.vue'
          // <mavon-editor v-model="form.content" :toolbars="toolbars"/>
    export default {

        name: 'markdown',
        components: {
          markdownEditor,
            uploadImg
        },
        data() {
            return {
                form: {
                    title: '',
                    desc:'',
                    tags: '',
                    classif: '',
                    content: '',
                    cover: '',
                },
                id: '',
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    mark: true, // 标记
                    superscript: true, // 上角标
                    quote: true, // 引用
                    ol: true, // 有序列表
                    link: true, // 链接
                    imagelink: true, // 图片链接
                    help: true, // 帮助
                    code: true, // code
                    subfield: true, // 是否需要分栏
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                    /* 1.3.5 */
                    undo: true, // 上一步
                    trash: true, // 清空
                    save: true, // 保存（触发events中的save事件）
                    /* 1.4.2 */
                    navigation: true, // 导航目录

                },
                // fileList: [],
                uploadUrl: 'http://img.cfun.vip/',
                uploadData: {},
                formAdd: {brandLogo: ''},
                // 提交标签
                tags: [],
                inputVisible: false,
                inputValue: '',
                imageUrl: '',
                dialogVisible: false,
                dialogImageUrl: '',
                ishljs: true,//代码高亮
                boxShadow: true,//开启边框阴影
                scrollStyle: true,
                navigationToggle:true
            }
        },

        methods: {
            onSubmit() {
                let t = this;

                let form = t.form;
                let id = t.id;
                let tags = t.tags.join(",");
                let content = $('.editormd-markdown-textarea').val();
                let pramas = {
                    title: form.title,
                    tags: tags,
                    desc: form.desc,
                    cover: form.cover,
                    category_id: parseInt(form.classif),
                    content: content
                }
                console.log(pramas)
                if (!!id) {
                    pramas = Object.assign({}, pramas, {id: id});
                }
                addArticle(pramas).then((res) => {
                    if (res && res.code == 200) {
                        console.log('添加成功')
                        this.$router.push({path: "/admin/list"});
                    }
                })
            },
            getDetails() {
                let t = this;
                let id = t.id;

                if (!id) {
                    return
                }
                detailArticle({
                    id: id
                }).then((res) => {
                    if (res && res.data) {
                        let result = res.data;
                        t.form.title = result.title
                        t.form.desc = result.desc
                        t.form.classif = `${result.category_id}`
                        t.form.content = result.content
                        t.tags = result.tags.length ? result.tags.splice(",") : []
                        t.imageUrl = result.cover
                    }
                })
            },
            upDateImg(val) {
                console.log(val)
                this.form.cover = val.imgSrc;
            },
            // 上传图片
            doDeleteImg(file, fileList) {
                let logoAry;
                let key;
                if (this.editState) {
                    logoAry = this.mainInfo.brandLogo.split('/');
                } else {
                    logoAry = this.formAdd.brandLogo.split('/');
                }
                key = logoAry[logoAry.length - 1];
                deleteQiniuImg({key}).then(res => {
                    if (res.code === '0') {
                        if (this.editState) {
                            this.mainInfo.brandLogo = '';
                        } else {
                            this.formAdd.brandLogo = '';
                        }
                    } else {
                        this.$message.error(res.msg)
                    }
                })
            },
            doLookImg(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            // 添加标签
            handleClose(tag) {
                this.tags.splice(this.tags.indexOf(tag), 1);
            },

            showInput() {

                if (this.tags.length >= 5) {
                    this.openVn('最多只能添加五个标签哦！')
                    return
                }
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },

            handleInputConfirm() {
                let inputValue = this.inputValue;
                this.inputVisible = false;
                this.inputValue = '';
                if (inputValue) {
                    if (this.tags.indexOf(inputValue) !== -1) {
                        this.openVn(`标签已存在${inputValue}`)
                        return
                    }
                    this.tags.push(inputValue);
                }

            },
            // 消息提示
            openVn(text) {
                const h = this.$createElement;
                this.$message({
                    message: h('p', null, [
                        h('span', null, text),
                        h('i', {style: 'color: teal'}, 'VNode')
                    ])
                });
            }

            // // 获取七牛Token
            // qiniuTokenApi({}).then((res)=> {
            //     if (res && res.data &&res.data.uptoken) {
            //         // this.uploadData.token = res.data.uptoken
            //     }
            // })

        },
        mounted() {
            let t = this;
            t.id = t.$route.query.id;
            t.getDetails(t.id);

        },

    }
</script>
<style lang="css" slot-scoped>
  .editor-top {
    margin-bottom: 50px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .input-new-tag input {
    width: 90px;
  }

  .el-form-item__content .el-dialog {
    transform: translateX(-100%);
  }
</style>
