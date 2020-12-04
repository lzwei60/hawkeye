<template>
    <div class="white-bg mt10 p10">
        <!-- 功能菜单 -->
        <el-row :gutter="10" class="mb10" v-if="openFoldList.length > 0">
            <el-col :lg="21" :md="24">
                <div class="hk-hover line-15" @click="callBackFold">
                    <i class="el-icon-arrow-left mr2 bold gray f22"></i>
                    <span class="f16 mb5">{{openFoldList[openFoldList.length - 1].name}}</span>
                </div>
            </el-col>
            <el-col :lg="3" :md="24">
                <div class="hk-hover line-15" @click="callBackFold">
                    <i class="el-icon-close right bold mr20 gray f22"></i>
                </div>
            </el-col>
        </el-row>
        <!-- 功能菜单 -->
        <el-row :gutter="10" class="mb10">
            <el-col :lg="21" :md="24">
                <el-upload action="" :on-success="(res) => handleChange(res)" :before-upload="beforeUpload" :show-file-list="false">
                    <el-button type="primary" class="el-icon-plus hk-mini-button" size="mini" title="上传文件" @click="">上传文件</el-button>
                </el-upload>
            </el-col>
            <el-col :lg="3" :md="24">
                <el-radio-group class="right" size="mini" v-model="listMethods">
                    <el-radio-button label="1"><i class="el-icon-third-appstore-fill no-drag"></i></el-radio-button>
                    <el-radio-button label="2"><i class="el-icon-third-unorderedlist no-drag"></i></el-radio-button>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row class="tc" v-show="listMethods == '1'">
            <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="(item, index) in dataFile" :key="item.id">
                <div class="hk-work-icon pb20" style="height: 134px;">
                    <i class="hk-icon" style="font-size:64px;" :class="item.type == 'file' ? 'el-icon-third-file-text' : 'el-icon-third-folder-open-fill hk-hover'" @click="openFold(item)"></i>
                    <div class="mt5 tc">
                        <span class="font" v-if="!item.isRech">{{ item.name }}</span>
                        <el-input size="mini" class="hk-input" v-model="item.name" clearable v-else @blur="rechName(item)"></el-input>
                    </div>
                    <div class="mt5 tc f12 green hk-work-function mb5">
                        <span class="ml5 hk-hover" @click="loaddown(item)">下载</span>
                        <span class="ml5 hk-hover" @click="rechristen(item)">重命名</span>
                        <span class="ml5 hk-hover" @click="moveFile(item)">移动</span>
                        <span class="ml5 hk-hover" @click="deleteFile(item)">删除</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-table :data="dataFile" class="hk-table" v-show="listMethods == '2'">
            <el-table-column label="名称" prop="name">
                <template slot-scope="scope">
                    <div class="hk-hover">
                        <i :class="scope.row.type == 'file' ? 'el-icon-third-file-text' : 'el-icon-third-folder-open-fill'" class="mr10 f22"></i>
                        <span class="font" v-if="!scope.row.isRech">{{ scope.row.name }}</span>
                        <el-input size="mini" class="hk-input hk-w350" v-model="scope.row.name" clearable v-else @blur="rechName(scope.row)"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="300">
                <template slot-scope="scope">
                    {{ datetime.forwardDate(scope.row.editTime, 'yyy-MM-dd HH:ss:mm') }}
                </template>
            </el-table-column>
            <el-table-column label="" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-third-download f16 hk-hover middle blue" title="下载" @click="loaddown(scope.row)"></i>
                    <i class="el-icon-edit f16 hk-hover middle pl10" title="重命名" @click="rechristen(scope.row)"></i>
                    <i class="el-icon-rank f16 hk-hover middle pl10 orange" title="移动" @click="moveFile(scope.row)"></i>
                    <i class="el-icon-delete f16 hk-hover middle pl10 danger" title="删除" @click="deleteFile(scope.row)"></i>
                </template>
            </el-table-column>
        </el-table>
        <!-- 移动附件-->
        <el-dialog :title="'移动 '+moveData.name+' 到'" :visible.sync="isMover" :append-to-body="true" top="15px" class="hk-dialog hk-w-mini hk-dialog-blue" :close-on-click-modal="false" @close="moveClose">
            <el-cascader placeholder="请选择文件夹" size="mini" v-model="moveData.address" class="hk-w100" :options="moveList" :props="defaultData"></el-cascader>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="moveClose">取消</el-button>
                <el-button type="primary" size="small" @click="moveConfim">移动</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            listMethods: "1", // 展示方式
            isMover: false, // 是否移动附件
            // 上传文件的列表数据
            dataFile: [
                {
                    id: "1",
                    name: "文件",
                    type: "file",
                    editTime: "1598515978666"
                }, {
                    id: "2",
                    name: "文件夹1",
                    type: "fold",
                    editTime: "1598515978666"
                }, {
                    id: "3",
                    name: "文件",
                    type: "file",
                    editTime: "1598515978666"
                }, {
                    id: "4",
                    name: "文件夹2",
                    type: "fold",
                    editTime: "1598515978666"
                }, {
                    id: "5",
                    name: "文件",
                    type: "file",
                    editTime: "1598515978666"
                }, {
                    id: "6",
                    name: "文件夹3",
                    type: "fold",
                    editTime: "1598515978666"
                }, {
                    id: "7",
                    name: "文件",
                    type: "file",
                    editTime: "1598515978666"
                }, {
                    id: "8",
                    name: "文件夹4",
                    type: "fold",
                    editTime: "1598515978666"
                }, {
                    id: "9",
                    name: "文件",
                    type: "file",
                    editTime: "1598515978666"
                }
            ],
            // 级联选择器的props
            defaultData: {
                value: "id",
                label: "name"
            },
            // 移动附件的数据选择
            moveList: [],
            // 移动项目数据
            moveData: {
                id: "",
                name: "",
                address: ""
            },
            // 打开文件夹的数据
            openFoldList: []
        }
    },
    created() {

    },
    methods: {
        /**
         * 获取数据列表
         */
        getData(){

        },
        /**
         * 上传图片之前的回调 
         */
        beforeUpload(file) {
            const isLt20M = file.size / 1024 < 204000;
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 20MB!');
            }
            return isLt2M;
        },
        /**
         * 上传成功后的回调
         * @param {object} res 后台返回的图片数据
         */
        handleChange(res) {
            if (res.code == 1) {
                this.dataFile.push(res.data);
                this.$message.success(res.msg);
            } else {
                this.$message.error(res.msg);
            }
        },
        /**
         * 下载附件
         * @param {Object} obj 下载附件的数据
         */
        loaddown(obj){
            // 下载附件
        },
        /**
         * 重命名文件
         * @param {Object} obj 重命名的数据
         */
        rechristen(obj){
            this.$set(obj,"isRech", true);
        },
        /**
         * 失去焦点
         * @param {Object} obj 重命名的数据
         */
        rechName(obj){
            delete obj.isRech;
            this.$forceUpdate();
        },
        /**
         * 移动附件
         * @param {Object} obj 移动附件的数据
         */
        moveFile(obj){
            this.isMover = true;
            this.moveData = obj;
            this.moveList = [];
            for(let i = 0; i < this.dataFile.length; i++){
                if(obj.id != this.dataFile[i].id && this.dataFile[i].type == 'fold'){
                    this.moveList.push(this.dataFile[i]);
                }
            }
            console.log(this.moveList)
        },
        /**
         * 关闭移动
         */
        moveClose() {
            this.isMover = false;
            this.moveData = {};
        },
        /**
         * 确认移动
         */
        moveConfim() {
            // 请求 确认移动文件
        },
        /**
         * 删除文件
         * @param {Object} obj 移动附件的数据
         */
        deleteFile(obj){
            // 删除任务
        },
        /**
         * 打开文件夹
         * @param {Object} obj 文件夹的数据
         */
        openFold(obj){
            // 只有文件夹才可以打开
            if(obj.type == 'fold'){
                this.openFoldList.push(obj)
            }
        },
        /**
         * 返回文件夹
         */
        callBackFold(){
            this.getData(this.openFoldList[this.openFoldList.length - 1].id);
            this.openFoldList.splice(this.openFoldList.length - 1, 1);
        },
    }
}
</script>
<style lang="scss" scoped>
.hk-work-function{
    display: none;
}
.hk-work-icon:hover .hk-work-function{
    display: block;
}
</style>