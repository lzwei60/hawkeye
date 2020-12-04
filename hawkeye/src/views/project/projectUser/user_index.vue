<template>
    <div class="white-bg mt10 p10">
        <!-- 功能菜单 -->
        <el-row :gutter="10" class="mb5">
            <el-col :lg="16" :md="24">
                <el-button size="small" class="hk-small-button ml10" @click="addUser()">新增成员</el-button>
            </el-col>
            <el-col :lg="8" :md="24">
                <el-input placeholder="请输入任务标题" v-model="searchData.value" size="mini" class="hk-select-w80 hidden-md-and-down">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 表格数据 -->
        <el-table :data="projectUser" class="hk-table">
            <el-table-column label="姓名" prop="name" width="200">
                <template slot-scope="scope">
                    <div class="hk-hover" @click="userDetails(scope.row)">
                        <img :src="scope.row.headImg" width="25" height="25" class="mr10" />
                        <span class="font" v-if="!scope.row.isRech">{{ scope.row.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="身份权限" prop="authority">
                <template slot-scope="scope">
                    <span class="hk-table-authority">{{scope.row.authority == '0' ? "成员" : scope.row.authority == '1' ? "管理员" : "超级管理员"}}</span>
                </template>
            </el-table-column>
            <el-table-column label="联系方式" prop="phone"></el-table-column>
            <el-table-column label="" width="100">
                <template slot-scope="scope">
                    <i class="el-icon-delete f16 hk-hover pl10 middle danger" title="删除"></i>
                </template>
            </el-table-column>
        </el-table>
        <!-- 新增项目成员 -->
        <el-dialog title="项目成员" :visible.sync="addProjectUser" :append-to-body="true" top="15px" class="hk-dialog hk-dialog-blue" :close-on-click-modal="false" @close="addClose">
            <p class="f12 mb10">选择项目成员</p>
            <div><el-autocomplete size="mini" class="inline-input" v-model="chooseValue" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="chooseItemUser"></el-autocomplete></div>
            <el-checkbox class="mt10" :indeterminate="isIndeterminate" v-model="checkAll" @change="teamUserAllChange">全选</el-checkbox>
            <div class="mt10 mb10"></div>
            <el-checkbox-group class="mt10" v-model="chooseUsers" @change="handleCheckedTeamUserChange">
                <el-checkbox v-for="(item,index) in teamUser" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="addClose">取消</el-button>
                <el-button type="primary" size="small" @click="temUserConfim">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import taskList from '../../../assets/json/taskList.js';
import teamUser from '../../../assets/json/teamUser.js';
export default {
    data(){
        return {
            searchData: {
                finishTime: []
            },
            projectUser: taskList.projectList, // 项目组成员
            addProjectUser: false, // 是否打开新增项目成员
            teamUser: teamUser.teamUserList, // 团队成员
            restaurants: [], // 搜索出来的数据
            chooseValue: "", // 远程搜索的团队成员
            checkAll: false, // 是否全选
            isIndeterminate: false, // 是否进行选择并未全选
            chooseUsers: []//选中的项目成员
        }
    },
    created(){
        this.getData();
    },
    mounted() {
        for(let i = 0; i < this.teamUser.length; i++){
            this.teamUser[i]["value"] = this.teamUser[i].name;
            this.restaurants.push(this.teamUser[i])
        }
    },
    methods: {
        /**
         * 获取数据
         */
        getData(){
            
        },
        /**
         * 新增项目成员
         */
        addUser(){
            this.addProjectUser = true;
            this.chooseUsers = [];
            for(let i = 0; i < this.projectUser.length; i++){
                this.chooseUsers.push(this.projectUser[i].id);
            }
            this.checkAll = this.chooseUsers.length === this.teamUser.length;
            this.isIndeterminate =  this.chooseUsers.length > 0 &&  this.chooseUsers.length < this.teamUser.length;
        },
        /**
         * 关闭创建||修改
         */
        addClose(){
            this.addProjectUser = false;
        },
        /**
         * 返回输入建议
         * @param {String} queryString 输入的内容
         * @param {Function} cb 回调函数
         */
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        /**
         * 开始筛选
         * @param {String} queryString 输入的内容
         */
        createFilter(queryString) {
            console.log(queryString)
            var reg = new RegExp(queryString);
            return (restaurant) => {
                if(restaurant.name.match(reg)){
                    return restaurant
                }
            };
        },
        /**
         * 选中团队成员
         * @param {Object} item 选中的数据
         */
        chooseItemUser(item){
            let data = this.chooseUsers.filter((p) => {
                return p == item.id;
            });
            if(data[0]){
                let index = this.chooseUsers.indexOf(data[0]);
                index > -1 && this.chooseUsers.splice(index,1);
            }else{
                this.chooseUsers.push(item.id);
            }
        },
        /**
         * 全选
         * @param {Boolean} val 是否全选
         */
        teamUserAllChange(val){
            this.chooseUsers = [];
            if(val){
                for(let i = 0; i < this.teamUser.length; i++){
                    this.chooseUsers.push(this.teamUser[i].id);
                }
            }
        },
        /**
         * 选中的数据
         * @param {Array} arr 选中的数据数组
         */
        handleCheckedTeamUserChange(arr){
            let checkedCount = arr.length;
            this.checkAll = checkedCount === this.teamUser.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.teamUser.length;
        },
        /**
         * 确认选择
         */
        temUserConfim(){
            let _this = this;
            console.log(_this.chooseUsers);
            for(let i = 0; i < _this.chooseUsers.length; i++){
                let data = _this.projectUser.filter((p) => {
                    return p.id == _this.chooseUsers[i];
                });
                if(!data[0]){
                    let data = _this.teamUser.filter((p) => {
                        return p.id == _this.chooseUsers[i];
                    });
                    _this.projectUser.push({id: data[0].id, name: data[0].name, headImg: data[0].headImg, authority: data[0].authority});
                    _this.addClose();
                }
            }
        },
        /**
         * 点击成员详情
         */
        userDetails(){

        },
        
    }
}
</script>
<style lang="scss" scoped>
.hk-table .hk-table-authority{
    padding: 5px;
    border-radius: 10px;
}
</style>