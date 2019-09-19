<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="按标题搜索"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getMusic">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="music" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column prop="id" label="id" style="width: 10%;" sortable>
            </el-table-column>
            <el-table-column prop="name" label="歌曲名" style="width: 20%;" >
            </el-table-column>
            <el-table-column prop="author" label="作者" style="width:10%;" >
            </el-table-column>
            <el-table-column prop="music_id" label="文件路径" style="width: 35%;">
            </el-table-column>
            <el-table-column label="操作" style="width: 20%;">
                <template slot-scope="scope">
                    <el-button type="text" @click="dialogForm(scope.$index,scope.row)" >编辑</el-button>
                    <el-dialog title="音乐编辑" :visible.sync="dialogFormVisible">
                        <el-form :model="form">
                            <el-form-item hidden >
                                <el-input v-model="form.id"></el-input>
                            </el-form-item>
                            <el-form-item label="歌曲名：" >
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="作者："  >
                                <el-input v-model="form.author"></el-input>
                            </el-form-item>
                            <el-form-item label="音乐id："  >
                                <el-input v-model="form.music_id" ></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="onSubmit">确 定</el-button>
                        </div>
                    </el-dialog>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination v-if="music.length > 0"
                           background
                           layout="prev, pager, next"
                           :total="pageData.total"
                           :page-size="pageData.pagesize"
                           :current-page.sync="pageData.curPage"
                           @current-change="handleCurrentChange">
            </el-pagination>

        </el-col>
    </section>
</template>

<script>

    import api from '../../api/importantjs/apis.js'
    import {addMusicMsg } from '../../api/api';
    export default {
        name: "music",
        data() {
            return {
                filters: {
                    name: ''
                },
                pageData: {
                    total: 0,
                    pagesize: 0,
                    curPage: 1
                },
                music: [],
                sels: [],//列表选中列
                total: 0,
                page: 1,
                listLoading: false,
                dialogTableVisible: false,
                dialogFormVisible: false,
                centerDialogVisible: true,
                form: {
                    name: '',
                    author: '',
                    path: ''
                },
                uploadMusicUrl: 'https://api.cfun.vip/admin/uploadmusic',
                formLabelWidth: '60px'
            }
        },
        mounted() {
            this.getMusic();
        },
        methods: {
            handleCurrentChange(val) {
                this.pageData.curPage = val;
                this.getMusic();
            },
            //获取用户列表
            getMusic() {
                let t = this;
                let para = {
                    curPage: 1
                };
                t.listLoading = true;
                api.getMusicList(para).then((res) => {
                    if (res.data.code==200) {
                        let result = res.data.data;
                        t.pageData.total = result.total;
                        t.pageData.pagesize = result.pagesize;
                        t.music = result.data;
                        t.listLoading = false;
                    }
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: 'warning'
                }).then(() => {
                    let para = {id: row.id};
                    deleteArticle(para).then((res) => {
                        if (res.code = 200) {
                            this.users.splice(index, 1);
                            this.$message({
                                type: "success",
                                message: data.msg
                            });
                        } else {
                            this.$message({
                                type: "error",
                                message: data.msg
                            });
                        }
                    });
                }).catch(() => {

                });
            },
            // 提交修改
            onSubmit(){
                let t = this;
                let form = t.form;
                if(!form.name&&form.author&&form.music_id){
                    return
                }
                let pramas = {
                    id:form.id,
                    name: form.name,
					          author: form.author,
                    music_id: form.music_id,
                }
                addMusicMsg(pramas).then((res)=>{
                    if(res && res.code == 200){
                        t.getMusic()
                        console.log('修改成功')
                    }
                })
            },
            dialogForm: function (index, row) {
                let t = this;
                t.form = row;
                t.dialogFormVisible = true;
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
        },
    }
</script>
<style scoped>

</style>
