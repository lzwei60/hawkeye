<template>
    <div>
        <!-- 编辑任务 -->
        <el-drawer ref="eldrawer" title="任务详情" class="hk-dialog__wrapper" :modal='false' :size="size+'px'" :visible.sync="isEditTask" direction="rtl" @close="close">
            <el-row :gutter="10" class="mb5">
                <el-col :lg="8" :md="24" :offset="16">
                    <i class="el-icon-delete f22 hk-hover middle right ml10" title="删除" @click="deleteTask"></i>
                    <i class="el-icon-document-copy f22 hk-hover middle right ml10" title="复制" @click="isCopy = !isCopy"></i>
                    <i class="el-icon-rank f22 hk-hover middle right ml10" title="移动" @click="isMover = !isMover"></i>
                    <i class="el-icon-star-off f22 hk-hover middle right" title="收藏" @click="taskCollect"></i>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <div class="hk-taskDetails-title">
                <el-checkbox key="city" v-model="dataList.isFinish"></el-checkbox>
                <span class="f18 ml10">{{dataList.title}}</span>
                <span class="right gray f12">创建时间: {{datetime.forwardDate(dataList.createTime, 'yyy-MM-dd HH:ss:mm')}}</span>
            </div>
            <div class="ml30 mt10">
                <el-row class="mb5">
                    <el-col :span="1">
                        <img class="hk-eldrwa-head" :src="getUser(dataList.principal,'headImg')" alt="head">
                    </el-col>
                    <el-col :span="23" class="mt5">
                        <el-popover ref="popoverUser" placement="bottom" width="200" trigger="click">
                            <el-select placeholder="请选择负责人" size="mini" v-model="dataList.principal" @change="chooseUser">
                                <el-option :key="item.id" :value="item.id" :label="item.name" v-for="(item, index) in projectUser"></el-option>
                            </el-select>
                            <span class="hk-hover" slot="reference">{{getUser(dataList.principal, "name")}}</span>
                        </el-popover>
                        <el-date-picker type="datetime" size="mini" placeholder="选择截止时间" value-format="timestamp" prefix-icon="el-icon-date" class="hk-input-outline ml50" v-model="dataList.cutOffTime"></el-date-picker>
                        <span class="gray f14">完成时间：<span :class="getOverTime(dataList.finishTime,dataList.cutOffTime)">{{dataList.finishTime ? datetime.forwardDate(dataList.finishTime, 'yyy-MM-dd HH:ss:mm') : "暂未完成"}}</span></span>
                        <span class="ml50">
                            <i class="el-icon-warning-outline red"></i>
                            <el-select placeholder="请选择优先级" size="mini" class="hk-input-outline" v-model="dataList.priority">
                                <el-option :key="item.id" :value="item.id" :label="item.value" v-for="(item, index) in priorityData">
                                    <span class="pt3 pb3 pl10 pr10 mr10" :style="{backgroundColor: item.color}"></span>{{item.value}}
                                </el-option>
                            </el-select>
                        </span>
                    </el-col>
                </el-row>
            </div>
            <el-divider></el-divider>
            <div class="mt10 relative">
                <i class="el-icon-collection-tag gray f22 ml10"></i>
                <el-popover class="absolute" placement="bottom" width="200" trigger="click">
                    <template v-for="item in tagsData">
                        <p class="mt10 hk-hover ml30" @click="getTags(item.name)">
                            <span class="pt3 pb3 pl10 pr10 mr50" :style="{backgroundColor: item.color}"></span>
                            <span>{{item.name}}</span>
                            <i class="el-icon-check o-yellow right" v-if="getIfChoose(item.name)"></i>
                        </p>
                    </template>
                    <span type="text" class="f16 gray ml10 hk-hover" slot="reference">
                        <span v-if="dataList.tags.length == 0">添加标签</span>
                        <template v-else>
                            <span v-for="item in dataList.tags" class="hk-tags-span mr5 f12" :style="getTagStyle(item)">{{item}}</span>
                        </template>
                    </span>
                </el-popover>
                <p></p>
                <el-button type="text" class="relative ml10 mt10" @click="isDescribe = !isDescribe"><i class="el-icon-document gray f22 mr5"></i><span class="absolute f16 gray" style="top:16px;">任务描述</span></el-button>
                <quillEditor ref="myQuillEditor" :options="quillOption" v-model="dataList.describe" v-if="isDescribe"></quillEditor>
                <p></p>
                <div class="relative ml10 mt10" @click=""><i class="el-icon-third-unorderedlist gray f22 mr5"></i><span class="absolute f16 gray" style="top:-1px;">子任务</span></div>
                <el-row class="mb5 mt5" v-for="(item,index) in subtask">
                    <el-col :md="1">
                        <el-checkbox v-model="item.isFinish" class="ml20 mt5"></el-checkbox>
                    </el-col>
                    <el-col :md="17" class="mt5">
                        <el-input v-model="item.title" clearable class="hk-w100" size="mini" placeholder="请输入任务，回车创建，Esc删除" v-show="item.isEdit" @keyup.enter.native="configSubTask(item)"></el-input>
                        <template v-if="!item.isEdit">
                            <span :class="item.isFinish ? 'through' : ''" class="ml10" @click="changeInput(item)">{{item.title}}</span>
                            <span class="f12 gray ml10" v-if="item.isFinish">已经由 {{getUserName(item.finishUser)}} 完成</span>
                        </template>
                    </el-col>
                    <el-col :md="6">
                        <el-date-picker type="datetime" size="mini" placeholder="选择截止时间" value-format="timestamp" prefix-icon="el-icon-date" class="hk-input-outline absolute" v-model="item.cutOffTime"></el-date-picker>
                        <el-popover ref="popoverUser" placement="bottom" width="200" trigger="click">
                            <el-select placeholder="请选择负责人" size="mini" v-model="item.principal" @change="chooseUser">
                                <el-option :key="item1.id" :value="item1.id" :label="item1.name" v-for="(item1, index1) in projectUser"></el-option>
                            </el-select>
                            <img class="hk-eldrwa-head hk-hover right mr20" slot="reference" :src="getUser(item.principal,'headImg')" alt="head">
                        </el-popover>
                    </el-col>
                </el-row>
                <el-button type="text" class="ml40" @click="addSubTask">添加子任务</el-button>
                <p></p>
                <i class="el-icon-upload gray f22 left mr10 mt10"></i>
                <el-upload class="mt10" action="" :file-list="dataList.fileList" :before-upload="beforeFileUpload" :on-success="getFileSuccess" :on-remove="removeFile" :data="{apiType:'file'}">
                    <el-button size="mini" type="primary" plain>上传附件</el-button>
                    <span slot="tip" class="el-upload__tip red ml5"></span>
                </el-upload>
            </div>
            <div class="demo-drawer__footer right">
                <el-button size="mini" @click="close">取 消</el-button>
                <el-button size="mini" type="primary" @click="confimTask">确 定</el-button>
            </div>
        </el-drawer>
        <!-- 复制任务-->
        <el-dialog title="复制任务" :visible.sync="isCopy" :append-to-body="true" top="15px" class="hk-dialog hk-w-mini hk-dialog-blue" :close-on-click-modal="false" @close="copyClose">
            <el-form ref="tasksForm" class="hk-form mb10" label-width="120px">
                <el-form-item label="项目" prop="project">
                    <el-select placeholder="请选择项目" size="mini" v-model="copyData.project">
                        <el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="复制数量" prop="number">
                    <el-input size="mini" type="number" min="1" placeholder="请输入复制数量" v-model="copyData.number"></el-input>
                </el-form-item>
                <el-form-item label="保留一下内容" prop="save">
                    <el-checkbox-group v-model="copyData.saveField">
                        <template v-for="item in fieldList">
                            <el-checkbox :label="item.field">{{item.name}}</el-checkbox></br>
                        </template>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="copyClose">取消</el-button>
                <el-button type="primary" size="small" @click="confimCopy">确认</el-button>
            </span>
        </el-dialog>
        <!-- 移动任务-->
        <el-dialog title="移动任务" :visible.sync="isMover" :append-to-body="true" top="15px" class="hk-dialog hk-w-mini hk-dialog-blue" :close-on-click-modal="false" @close="copyClose">
            <el-form ref="tasksForm" class="hk-form mb10" label-width="120px">
                <el-form-item label="项目" prop="project">
                    <el-select placeholder="请选择项目" size="mini" v-model="copyData.project">
                        <el-option v-for="item in projectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="copyClose">取消</el-button>
                <el-button type="primary" size="small" @click="confimMover">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import quillConfig from '../../assets/js/controller/quillConfig.js'
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import taskList from '../../assets/json/taskList.js'
export default {
    components: {
        quillEditor
    },
    props: {
        // 是否展示
        show: {
            type: Boolean,
            default: false
        },
        // 展示类型 ：编辑edit || 查看view
        type: {
            type: String,
            default: "edit"
        },
        // 任务详情数据
        data: {
            type: Object
        }
    },
    data() {
        return {
            isEditTask: false, // 是否打开
            quillOption: quillConfig, //编辑器配置
            size: '1124', // 抽屉宽度
            priorityData: taskList.priorityList, // 优先级列表
            tagsData: taskList.tagsList, // 标签列表
            projectUser: taskList.projectList, // 项目组成员
            defaultHeadImg: require("../../assets/img/index/logo.png"), // 默认头像
            // 数据详情
            dataList: {
                isFinish: false, // 是否完成
                title: "", // 任务标题
                principal: "", // 负责人id
                priority: "", // 优先级
                tags: [], // 标签
                describe: "", // 任务描述
                fileList: [], // 上传附件
                cutOffTime: "", // 截止时间
                finishTime: "", // 完成时间
                createTime: "", // 创建时间
            },
            subtask: [], // 这个任务的子任务
            isDescribe: false, // 是否展开任务描述
            isCopy: false, // 是否复制任务
            isMover: false, // 是否移动任务
            projectList: taskList.itemList, // 项目列表
            // 字段列表
            fieldList: [
                {
                    field: "title",
                    name: "任务标题"
                }, {
                    field: "principal",
                    name: "负责人"
                }, {
                    field: "priority",
                    name: "优先级"
                }, {
                    field: "tags",
                    name: "标签"
                }, {
                    field: "describe",
                    name: "任务描述"
                }, {
                    field: "fileList",
                    name: "附件"
                }, {
                    field: "cutOffTime",
                    name: "截止时间"
                }
            ],
            // 复制的数据
            copyData: {
                project: "1", // 复制到哪个项目
                number: "1", // 数量
                saveField: ["title", "principal", "priority", "cutOffTime"], // 保留的字段
            },
            oldCopyData: {}, // 初始数据
        }
    },
    created() {
        this.size = this.fullWidth < 1024 ? this.fullWidth - 60 : '1124';
        this.oldCopyData = this.$tools.clone(this.copyData, true)
    },
    computed: {
        fullWidth() {
            return this.$store.state.Common.fullWidth
        }
    },
    mounted() {
        this.sidebarHeight = this.$refs.eldrawer ? this.$refs.eldrawer.$el.offsetHeight - document.getElementsByClassName("el-drawer__header")[0].offsetHeight - 45 : -65;
        this.getMainContent(this.sidebarHeight);
    },
    methods: {
        /**
         * 右上角关闭弹窗
         */
        close() {
            this.$emit('update:show', false);
        },
        /**
         * 获取用户信息
         */
        getUser(id, type, bool) {
            let list = this.projectUser.filter(p => {
                return p.id == id;
            })
            if (list.length == 0) {
                if(type == 'headImg'){
                    return this.defaultHeadImg
                }else if(type == 'name'){
                    return ''
                }
            }
            return list[0][type]
        },
        /**
         * 获取是否超时
         */
        getOverTime(time, over) {
            let color;
            if (time) {
                if (time >= over) {
                    color = 'green'
                } else {
                    color = 'red'
                }
            } else {
                color = 'gray'
            }
            return color
        },
        /**
         * 获取标签颜色
         * @param {String} id 标签的值
         */
        getTagStyle(id) {
            for (let i = 0; i < this.tagsData.length; i++) {
                if (this.tagsData[i].name == id) {
                    return { "background-color": this.tagsData[i].color };
                }
            }
        },
        /**
         * 获取是否被选择
         * @param {String} name 标签的值
         */
        getIfChoose(name) {
            let isShow = false;
            for (let i = 0; i < this.dataList.tags.length; i++) {
                if (this.dataList.tags[i] == name) {
                    isShow = true
                }
            }
            return isShow
        },
        /**
         * 选择负责人的操作
         * @param {String} id 被选中的负责人id
         */
        chooseUser(id){
            this.$refs.popoverUser.doClose();
        },
        /**
         * 点击选择标签
         * @param {String} name 标签的值
         */
        getTags(name) {
            let list = this.dataList.tags;
            let index = -1;
            for (let i = 0; i < list.length; i++) {
                if (list[i] == name) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                list.splice(index, 1)
            } else {
                list.push(name)
            }
        },
        /**
         * 获取用户名称
         * @param {String} id 用户id
         */
        getUserName(id) {
            for (let i = 0; i < this.projectUser.length; i++) {
                if (this.projectUser[i].id == id) {
                    return this.projectUser[i].name;
                }
            }
        },
        /**
         * 新增子任务
         */
        addSubTask(){
            let _this = this;
            let isEdit = _this.subtask[_this.subtask.length - 1] ? _this.subtask[_this.subtask.length - 1].isEdit : false;
            if(!isEdit || _this.subtask.length == 0){
                _this.subtask.push({
                    isFinish: false, // 是否完成
                    isEdit: true, // 是否编辑
                    title: "", // 任务标题
                    principal: "", // 负责人id
                    cutOffTime: "", // 截止时间
                    finishTime: "", // 完成时间
                    createTime: "", // 创建时间
                })
            }
        },
        /**
         * 回车确认添加子任务
         */
        configSubTask(item){
            let _this = this;
            item.isEdit = false;
            if(item.title == ""){
                _this.subtask.splice(_this.subtask.length - 1, 1)
            }else{
                this.addSubTask(); 
            }
            // 请求数据
        },
        /**
         * 点击修改数据
         */
        changeInput(item){
            item.isEdit = true;
            
        },
        /**
         * 上传附件前的回调
         * @param {Object} file 上传的附件信息
         */
        beforeFileUpload(file) {
            const isSize = file.size / 1024 / 1024 < 20;
            if (!isSize) {
                this.$message.error("上传文件不能超过20M");
            }
            return isSize;
        },
        /**
         * 上传附件成功
         * @param {Object} r 上传成功的回调
         */
        getFileSuccess(r) {
            if (r.code == 1) {
                this.dataList.fileList.push({ name: r.info.data.name, url: r.info.data.src });
            } else {
                this.$message.error("上传附件失败");
            }
        },
        /**
         * 删除附件
         * @param {Object} file 删除的附件信息
         */
        removeFile(file) {
            let list = this.dataList.fileList.filter(p => {
                return p.uid == file.uid;
            });
            let index = this.dataList.fileList.indexOf(list[0]);
            index > -1 && this.dataList.fileList.splice(index, 1);
        },
        /**
         * 确认
         */
        confimTask() {
            let _this = this;
            // 请求
            _this.close();
        },
        /**
         * 删除任务
         * @param {Object} obj 删除任务的数据
         */
        deleteTask(obj) {
            // 删除任务
            this.close();
        },
        /**
         * 关闭移动 || 复制弹窗
         */
        copyClose() {
            this.CopyData = this.$tools.clone(this.oldcopyData, true);
            this.isCopy = false
            this.isMover = false;
        },
        /**
         * 复制任务 
         */
        confimCopy() {
            // 请求 添加复制成未完成的任务
        },
        /**
         * 移动任务
         */
        confimMover() {
            // 请求 移动任务
        },
        /**
         * 收藏任务
         */
        taskCollect(){
            // 请求 收藏任务 更改收藏图标
        },
        /**
         * 实时更改内容的高度 自适应
         * @param {String} newheight 新的高度
         */
        getMainContent(newheight) {
            let othis = this;
            let ischange = true;
            let leftheight = this.$refs.eldrawer ? this.$refs.eldrawer.$el.offsetHeight - document.getElementsByClassName("el-drawer__header")[0].offsetHeight - 45 : -65;
            if (newheight != leftheight) {
                ischange = false;
            }
            if (!ischange) {
                this.sidebarHeight = leftheight;
                newheight = leftheight;
            }
            setTimeout(function () {
                othis.getMainContent(newheight);
            }, 400);
        },
    },
    watch: {
        /**
         * 监听是否打开
         */
        show(val) {
            this.isEditTask = val;
        },
        /**
         * 监听是否有新数据
         */
        data(obj) {
            console.log(obj)
            this.dataList = obj;
        },
        /**
         * 监听宽度
         */
        fullWidth(val) {
            this.size = val <= 1024 ? val - 50 : '1124';
        }
    }
}
</script>
<style lang="scss" scoped>
.hk-dialog__wrapper {
    .hk-taskDetails-title{
        /deep/.el-checkbox__inner {
            width: 30px;
            height: 30px;
        }
        /deep/.el-checkbox__inner::after {
            width: 8px;
            height: 15px;
            left: 10px;
            top: 3px;
        }
    }
}
.hk-eldrwa-head {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #aaa;
}
.hk-input-outline {
    /deep/.el-input__inner {
        border: 0 !important;
        outline: none !important;
        background-color: #fff;
    }
}
/deep/.ql-editor {
    height: 200px;
}
.hk-tags-span {
    padding: 5px 10px;
    background-color: #de5f5f;
    color: #fff;
    border-radius: 15px;
}

</style>