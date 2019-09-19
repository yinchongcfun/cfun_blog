<template>
  <section>
    <el-form  ref="form" :model="form" label-width="80px" style="padding-top:20px;">
      <el-form-item label="歌曲名："  style="width: 40%">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="作者："  style="width: 40%">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="音乐id："  style="width: 40%" >
        <el-input v-model="form.music_id" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click.native.prevent>取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>

    import {addMusicMsg } from '../../api/api';

    export default {
        name: "addmusic",
        data() {
            return {
                form:{},
            };
        },
        methods:{
            onSubmit(){
                let form=this.form
                let pramas = {
                    name: form.name,
                    author: form.author,
                    music_id: form.music_id,
                }
                addMusicMsg(pramas).then((res)=>{
                    if(res && res.code == 200){
                        console.log('添加成功')
                        this.flush();
                    }
                })
            },
        }

    };

</script>
