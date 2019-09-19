<template>
  <div>
    <div class="img_box div_box" v-for="(img,key) in imgSrc" :style="{'width':uploadData.width,'height':uploadData.height}" v-if="!uploadData.listOne && isArray"
         v-loading="uploading"
         element-loading-text="正在上传..."
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.3)">
      <div class="hover_delete" @click.stop="choiceImg(key)" v-if="arrowDel">
        <div class="hover_delete_btn" @click="deleteImg(key)"></div>
      </div>
      <span class="sort" v-if="sort">{{key + 1}}</span><img :src="img">
    </div>
    <div class="file_box div_box" :style="{'width':uploadData.width,'height':uploadData.height}" ref="fileBox"
         v-loading="uploading"
         element-loading-text="正在上传..."
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.3)">
      <img :src="imgSrc[0]" v-if="uploadData.listOne && isArray">
      <img :src="imgSrc" v-if="!isArray">
      <input type="file" class="upload_file" name="upload" @change="checkFile($event)" ref="uploadFile" :multiple="uploadData.multiple">
      <div class="hover_delete_btn" v-if="uploadData.listOne && arrowDel && imgSrc.length > 0" @click="deleteOnlyImg"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
    import { qiniuTokenApi } from "../../api/api";
    import * as qiniu from "qiniu-js";
    export default {
        props: {
            uploadData: {
                type: Object,
                default: function() {
                    return {
                        multiple: false,
                        accept: "",
                        maxsize: 512,
                        listOne: true,
                        width: "100px",
                        height: "100px"
                    };
                }
            },
            imgSrc: [String, Array],
            minH: {
                type: Number
            },
            minW: {
                type: Number
            },
            maxH: {
                type: Number
            },
            maxW: {
                type: Number
            },
            isArray: {
                type: Boolean,
                default: function() {
                    return false;
                }
            },
            arrowDel:{
                type: Boolean,
                default:()=>{false}
            },
            sort:{
                type: Boolean,
                default:()=>{false}
            }
        },
        data() {
            return {
                fileName: "",
                count: 0,
                uploading:false
            };
        },
        mounted() {},
        methods: {
            checkFile(e) {
                this.uploading = true
                let file = e.target.files[0];
                let fileAccept = this.uploadData.accept.split("/");
                let fileMaxsize = this.uploadData.maxsize;
                let { size, type } = file;
                if (fileAccept != "") {
                    let fileType = type.split("/")[1];
                    if (fileAccept.indexOf(fileType) == -1) {
                        this.$message({
                            type: "error",
                            message: "不支持" + fileType + "后缀的图片"
                        });
                        this.uploading = false
                        return;
                    }
                }
                if (size > fileMaxsize * 1024 * 1024) {
                    //M转字节
                    this.$message({
                        type: "error",
                        message: "不支持大于" + fileMaxsize + "M的图片"
                    });
                    this.uploading = false
                    return;
                }
                this.upload(file);
            },
            upload(file) {
                qiniuTokenApi().then(data => {
                    if (data.code == 200) {
                        let token = data.data.uptoken;
                        console.log(11111,token)
                        let config = {
                            useCdnDomain: true,
                            region: null
                        };
                        let putExtra = {
                            fname: "",
                            params: {},
                            mimeType: null
                        };
                        let imgType = file.name.split('.')[1]
                        let key = this.getOnlycode('',imgType);
                        this.fileName = key;
                        let observable = qiniu.upload(file, key, token, putExtra, config);
                        observable.subscribe({ complete: this.showImg });
                    }
                });
            },
            showImg(res) {
                let key = res.key;
                let domain = "http://img.cfun.vip/";
                let imgW = res.w;
                let imgH = res.h;
                let minW = this.minW;
                let minH = this.minH;
                let maxW = this.maxW;
                let maxH = this.maxH;
                if (minW != undefined && imgW < minW) {
                    this.$message.error("上传的图片宽度不能小于" + minW);
                    this.uploading = false
                    return false;
                }
                if (minH != undefined && imgH < minH) {
                    this.$message.error("上传的图片高度不能小于" + minH);
                    this.uploading = false
                    return false;
                }
                if (maxH != undefined && imgW > maxW) {
                    this.$message.error("上传的图片宽度不能大于" + maxW);
                    this.uploading = false
                    return false;
                }
                if (maxW != undefined && imgH > maxH) {
                    this.$message.error("上传的图片高度不能大于" + maxH);
                    this.uploading = false
                    return false;
                }

                this.$refs.uploadFile.value = "";
                let src = domain + key;
                let flag; //0:字符串；1：一个数组；2：多个数组
                if (!this.isArray) {
                    flag = 0;
                } else {
                    if (this.uploadData.listOne) {
                        flag = 1;
                    } else {
                        flag = 2;
                    }
                }
                this.$emit("upload-img", { flag: flag, imgSrc: src });
                this.uploading = false
            },
            choiceImg(num){
                this.$emit('show-img',num)
            },
            deleteImg(num) {
                this.$emit('del-img',num)
            },
            deleteOnlyImg(){
                this.$emit('del-only-img')
            },
            getOnlycode(prefix,imgType) {
                let guid = new Date().getTime().toString(32);
                for (let i = 0; i < 5; i++) {
                    guid += Math.floor(Math.random() * 65535).toString(32);
                }
                return (prefix || "cfun_") + guid + (this.count++).toString(32) + '.' +imgType;
            }
        },
        watch: {
            imgSrc: {
                handler(newValue, oldValue) {
                    if(typeof(this.imgSrc) != "string"){
                        this.imgSrc = newValue;
                    }
                },
                deep: true
            }
        }
    };
</script>

<style lang="scss" scoped>
  .div_box {
    width: 100px;
    height: 100px;
    overflow: hidden;
    display: inline-block;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border: none;
    }
    .sort{
      position: relative;
      top: -28px;
      margin-right: 10px;
    }
    img[src=""],img:not([src]){
      opacity:0;
    }
    .hover_delete {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .hover_delete_btn{
      width: 34px;
      height: 34px;
      background: rgba(0, 0, 0, 0.3) url("../../assets/images/hoverclose.png") no-repeat center / 32px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -16px;
      margin-left: -16px;
      display: none;
    }
    &:hover {
      .hover_delete {
        display: block;
      }
      .hover_delete_btn{
        display: block
      }
    }
  }
  .img_box {
    margin-right: 10px;
  }
  .file_box {
    border: 1px dashed #888;
    position: relative;
    background: url("../../assets/images/icon_plus.png") no-repeat center / 32px;
    box-sizing: border-box;
    .upload_file {
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
</style>
