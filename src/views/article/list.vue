<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="按标题搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" style="width: 10%;">
      </el-table-column>
      <el-table-column prop="id" label="id" style="width: 20%;" sortable>
      </el-table-column>
      <el-table-column prop="title" label="标题" style="width: 25%;" sortable>
      </el-table-column>
      <el-table-column prop="cover" label="封面" style="width: 100px; padding: 5px;overflow:hidden;">
        <template slot-scope="scope">
          <img :src="scope.row.cover" min-width="50" height="50" style="padding: 5px">
        </template>
      </el-table-column>
      <el-table-column label="操作" style="width: 20%;">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="设置热门" style="width: 10%;">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.is_hot"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="setHotArticle(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                     :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
    import util from '../../common/js/util'
    import api from '../../api/importantjs/apis.js'
    //import NProgress from 'nprogress'
    import {deleteArticle, detailArticle} from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },

            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let t = this;
                let para = {
                    page: 1
                };
                t.listLoading = true;
                api.getIndexList(para).then((res) => {
                    if (res && res.data && res.data.data && res.data.data.data.length) {
                        let result = res.data.data.data;
                        result.forEach((item) => {
                            if (item.is_hot) {
                                item.is_hot = true
                            } else {
                                item.is_hot = false
                            }
                        })
                        t.total = result.length;
                        t.users = result;
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
            //显示编辑界面
            handleEdit: function (index, row) {
                let t = this;
                let para = {id: row.id};
                t.editLoading = true

                t.$router.push({path: "/mark", query: para});
                t.editLoading = false
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            // 设置热门
            setHotArticle(row) {
                let t = this;
                let isHot = row.is_hot ? 1 : 0;
                let id = row.id;
                let para = {
                    id: id,
                    is_hot: isHot
                }
                api.setHotArticle(para).then((res) => {
                    if (res && res.data && res.data.data == 1) {
                        let result = t.users;
                        t.users = result
                    } else {
                        console.log(111, '设置热门失败')
                    }
                });
                console.log(66666666666, t.users)
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
        },
        mounted() {
            this.getUsers();
        }
    }

</script>

<style slot-scope>
  .set-hot {
    line-height: 100%;
    text-align: center;

  }
</style>
