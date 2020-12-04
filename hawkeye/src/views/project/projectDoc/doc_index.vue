<template>
    <div class="white-bg mt10 p10">
        <!-- 功能菜单 -->
        <el-row :gutter="10" class="mb10">
            <el-col :lg="21" :md="24">
                <span class="f22 ml30">文档</span>
                <el-button size="small" class="hk-small-button ml10" @click="editDoc()">创建文档</el-button>
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
                <div class="hk-work-icon p20 hk-work-word">
                    <i style="font-size:64px;" class="el-icon-third-file-text hk-hover hk-icon" @click="viewDoc(item)"></i>
                    <div class="mt5 tc">
                        <span class="font" v-if="!item.isRech">{{ item.name }}</span>
                        <el-input size="mini" class="hk-input" v-model="item.name" clearable v-else @blur="rechName(item)"></el-input>
                    </div>
                    <div class="mt5">
                        <span class="f14 gray">{{item.author}}</span>
                        <span class="ml10 f12 gray">{{ datetime.forwardDate(item.editTime, 'yyy-MM-dd') }}</span>
                    </div>
                    <div class="mt5 tc f12 green hk-work-function mb5">
                        <span class="ml5 hk-hover" @click="editDoc(item)">编辑</span>
                        <span class="ml5 hk-hover" @click="collectDoc(item)">收藏</span>
                        <span class="ml5 hk-hover" @click="rechristen(item)">重命名</span>
                        <span class="ml5 hk-hover" @click="deleteDoc(item)">删除</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <el-table :data="dataFile" class="hk-table" v-show="listMethods == '2'">
            <el-table-column label="名称" prop="name">
                <template slot-scope="scope">
                    <div class="hk-hover">
                        <i class="el-icon-third-file-text mr10 f22 orange"></i>
                        <span class="font" v-if="!scope.row.isRech">{{ scope.row.name }}</span>
                        <el-input size="mini" class="hk-input hk-w350" v-model="scope.row.name" clearable v-else @blur="rechName(scope.row)"></el-input>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="作者" prop="author"></el-table-column>
            <el-table-column label="修改时间" width="300">
                <template slot-scope="scope">
                    {{ datetime.forwardDate(scope.row.editTime, 'yyy-MM-dd HH:ss:mm') }}
                </template>
            </el-table-column>
            <el-table-column label="" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-edit-outline f16 hk-hover middle blue" title="编辑" @click="editDoc(scope.row)"></i>
                    <i class="el-icon-star-off f16 hk-hover middle pl10" title="收藏" @click="collectDoc(scope.row)"></i>
                    <i class="el-icon-edit f16 hk-hover middle pl10 orange" title="重命名" @click="rechristen(scope.row)"></i>
                    <i class="el-icon-delete f16 hk-hover middle pl10 danger" title="删除" @click="deleteDoc(scope.row)"></i>
                </template>
            </el-table-column>
        </el-table>
        <!-- 创建 || 编辑 文档-->
        <el-dialog :title="docData.id ? '编辑 '+ docData.name : '创建文档'" :visible.sync="isDoc" :append-to-body="true" top="15px" class="hk-dialog hk-dialog-blue" :close-on-click-modal="false" @close="docClose">
            <el-form :model="docData" :rules="rules" ref="doct" class="hs-form mb10" label-width="120px">
                <el-form-item label="文档名称" prop="name">
                    <el-input size="mini" class="hs-input" v-model="docData.name" clearable></el-input>
                </el-form-item>
                <quill-editor v-model="docData.content" ref="myQuillEditor"></quill-editor>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="docClose">取消</el-button>
                <el-button type="primary" size="small" @click="docConfim">确认</el-button>
            </span>
        </el-dialog>
        <!-- 查看文档 -->
        <el-dialog :title="'查看 '+ docData.name" :visible.sync="lookDoc" :append-to-body="true" top="15px" class="hk-dialog hk-dialog-blue" :close-on-click-modal="false" @close="docClose">
            <el-main class="p0 mt_10">
                <h1 class="tc mb10">{{docData.name}}</h1>
                <p class="tc">
                    <span class="gray">发布人：</span><span class="hs-hover">{{docData.author}}</span>
                    <span class="gray ml10">最近操作时间：</span> {{ datetime.forwardDate(docData.editTime, 'yyy-MM-dd HH:ss:mm')}}
                </p>
                <el-divider class="mt10 mb0"></el-divider>
                <div class="hs-details-content p15" v-html="docData.content"></div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" @click="docConfim">关闭</el-button>
                </span>
            </el-main>
        </el-dialog>
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
export default {
    components: {
        quillEditor
    },
    data() {
        return {
            listMethods: "1", // 展示方式
            isDoc: false, // 是否展示创建文档 || 编辑文档
            lookDoc: false, // 查看文档
            // 上传文件的列表数据
            dataFile: [
                {
                    id: "1",
                    name: "文件",
                    type: "file",
                    author: "廖生",
                    editTime: "1598515978666"
                },  {
                    id: "3",
                    name: "文件",
                    type: "file",
                    author: "廖生",
                    editTime: "1598515978666"
                }, {
                    id: "5",
                    name: "文件",
                    type: "file",
                    author: "廖生",
                    editTime: "1598515978666"
                }, {
                    id: "7",
                    name: "文件",
                    type: "file",
                    author: "廖生",
                    editTime: "1598515978666"
                },  {
                    id: "9",
                    name: "文件",
                    type: "file",
                    author: "廖生",
                    editTime: "1598515978666"
                }
            ],
            // 新增文档数据
            docData: {
                id: "",
                name: "",
                content: ""
            },
            // 校验规则
            rules: {
                name: [{ required: true, message: '请输入文档名称', trigger: 'blur' }],
            }
        }
    },
    created(){

    },
    methods: {
        /**
         * 获取数据
         */
        getData(){

        },
        /**
         * 创建文档
         */
        createDoc() {

        },
        /**
         * 修改文档
         * @param {Object} obj 修改文档的数据
         */
        editDoc(obj) {
            this.isDoc = true;
            this.docData = obj || this.docData;
        },
        /**
         * 确认创建||修改
         */
        docConfim(){
            let _this = this;
            _this.$refs.doct.validate((valid) => {
                if (valid) {
                    // 确认创建||修改
                    _this.docClose();
                }else{
                    return false;
                }
            })
        },
        /**
         * 关闭创建||修改
         */
        docClose(){
            this.docData = { id: "", name: "", content: "" };
            this.isDoc = false;
            this.lookDoc = false;
        },
        /**
         * 查看文档
         * @param {Object} obj 查看文档的数据
         */
        viewDoc(obj){
            this.lookDoc = true;
            this.docData = obj;
        },
        /**
         * 收藏文档
         * @param {Object} obj 收藏文档的数据
         */
        collectDoc(obj) {
            // 收藏文档
        },
        /**
         * 重命名文档
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
         * 删除文档
         * @param {Object} obj 删除文档的数据
         */
        deleteDoc(obj) {
            // 删除任务
        },
    }
}
</script>
<style lang="scss" scoped>
.hk-work-function{
    display: block;
    position: absolute;
    bottom: 10px;
}
.hk-work-icon:hover .hk-work-function{
    display: block;
}
.hk-work-word {
    position: relative;
    height: 200px;
    width: 175px;
    margin: 0 auto 20px;
    background-color: #fcf4dc;
}
</style>