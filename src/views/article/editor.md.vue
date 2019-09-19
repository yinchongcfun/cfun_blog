<template>
  <div :id="id">
    <textarea v-model="content"/>
  </div>
</template>
<script>
    import $ from "jquery";
    import uuid from "uuid/v4";

    export default {
        name:"MarkdownEditor",
        data:function(){
            return {
                //最终生成的编辑器
                editor:null,
                // 内容
                content: '',
                //默认选项
                defaultOptions:{
                    width: "90%",
                    height: 740,
                    path : "/static/editor.md/lib/",
                    // theme : "dark",
                    // previewTheme : "dark",
                    // editorTheme : "pastel-on-dark",
                    //markdown : md,   //动态设置的markdown文本
                    codeFold : true,
                    //syncScrolling : false,
                    saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
                    searchReplace : true,
                    //watch : false,                // 关闭实时预览
                    htmlDecode : "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
                    //toolbar  : false,             //关闭工具栏
                    //previewCodeHighlight : false, // 关闭预览 HTML 的代码块高亮，默认开启
                    emoji : true,
                    taskList : true,
                    tocm            : true,         // Using [TOCM]
                    tex : true,                   // 开启科学公式TeX语言支持，默认关闭
                    flowChart : true,             // 开启流程图支持，默认关闭
                    sequenceDiagram : true,       // 开启时序/序列图支持，默认关闭,
                    imageUpload : true,
                    imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                    imageUploadURL : "./php/upload.php",
                    onload : function() {
                    }
                }
            }
        },
        props:{
            id:{
                type:String,
                default:uuid()
            },
            options:{
                type:Object
            }
        },
        mounted(){
            let vm=this;
            //加载editormd
            this.requireEditor(function(){
                vm.editor=editormd(vm.id,vm.getOptions());
            })
        },
        methods:{
            requireEditor(callback){
                let vm=this;
                //设置全局变量，因为editormd依赖jquery
                window.$=window.jQuery=$;
                //异步加载并执行
                $.getScript("/static/editor.md/editormd.min.js",function(script){
                    callback();
                })
                //加载css
                $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', '/static/editor.md/css/editormd.min.css') );
            },
            /**
             * 得到最终的options，组件属性上获得的选项覆盖此处的默认选项
             */
            getOptions(){
                return Object.assign(this.defaultOptions,this.options);
            },
        },

    }
</script>
<style>
</style>
