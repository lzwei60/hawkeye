<template>
    <div class="white-bg mt10 p10">
        <el-row :gutter="10" class="mb10">
            <el-col :lg="18" :md="24">
                <div class="f20 bold mb20">更新项目状态</div>
                <span>项目状态：</span>
                <el-select placeholder="请选择项目状态" size="mini" v-model="updateData.state">
                    <el-option :key="item.id" :value="item.id" :label="item.value" v-for="(item, index) in projectState"></el-option>
                </el-select>
                <el-input size="mini" placeholder="请输入标题" class="hk-input hk-w100 mt20 mb20" clearable v-model="updateData.title"></el-input>
                <quill-editor ref="myQuillEditor" class="mb20" v-model="updateData.content"></quill-editor>
               <el-button type="primary" size="small" @click="issueState">发布</el-button>
               <div class="f20 bold mb20 mt30">最新状态</div>
               <div v-for="item in newState">
                   <el-row>
                       <el-col :lg="1" :md="4">
                           <img width="50" height="50" :src="item.headImg" alt="head">
                       </el-col>
                       <el-col :lg="18" :md="17">
                            <div class="ml10">
                                <p class="mb10">{{item.title}}</p>
                                <span>{{item.name}} {{datetime.forwardDate(item.createTime, 'yyy-MM-dd HH:mm:ss')}} 创建</span>
                            </div>
                       </el-col>
                       <el-col :lg="4" :md="4">
                           <span class="right">{{item.state}}</span>
                       </el-col>
                   </el-row>
                   <div class="mt20">{{item.content}}</div>
               </div>
            </el-col>
            <el-col :lg="6" :md="24">
                <div class="f20 bold mb20">项目信息</div>
                <p class="f14 gray mt10 mb10">项目描述</p>
                <el-input type="textarea" size="mini" class="hk-textarea" placeholder="请输入任务描述内容" clearable v-model="projectInfo.describe" @blur="setInfo('describe')"></el-input>
                <p class="f14 gray mt10 mb10">负责人</p>
                <el-select placeholder="请选择负责人" size="mini" v-model="projectInfo.principal" @change="setInfo('principal')">
                    <el-option :key="item.id" :value="item.id" :label="item.name" v-for="(item, index) in projectUser"></el-option>
                </el-select>
                <p class="f14 gray mt10 mb10">优先级</p>
                <el-select placeholder="请选择优先级" size="mini" v-model="projectInfo.priority" @change="setInfo('priority')">
                    <el-option :key="item.id" :value="item.id" :label="item.value" v-for="(item, index) in priorityData">
                        <span class="pt3 pb3 pl10 pr10 mr10" :style="{backgroundColor: item.color}"></span>{{item.value}}
                    </el-option>
                </el-select>
                <p class="f14 gray mt10 mb10">截止时间</p>
                <el-date-picker size="mini" value-format="timestamp" type="datetime" placeholder="请选择截止时间" v-model="projectInfo.cutOffTime" @change="setInfo('cutOffTime')"></el-date-picker>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import taskList from '../../../assets/json/taskList.js'
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
export default {
    components: {
        quillEditor
    },
    data(){
        return {
            projectState: taskList.projectStateList, // 项目状态
            projectUser: taskList.projectList, // 项目组成员
            priorityData: taskList.priorityList, // 优先级列表
            // 更新项目状态
            updateData: {
                state: "",
                title: "",
                content: ""
            },
            // 项目信息
            projectInfo: {
                describe: "",
                principal: "",
                priority: "",
                cutOffTime: "",
            },
            newState: [{
                title: "更新的状态",
                name: "鹰眼用户",
                headImg: require("@i/face/馋嘴.png"),
                createTime: "1598515978666",
                state: "1",
                content: "12332132132312133"
            }]
        }
    },
    created(){
        this.getData();
    },
    methods: {
        /**
         * 获取数据
         */
        getData(){
            let _this = this;
        },
        /**
         * 发布更新状态
         */
        issueState(){
            let _this = this;
            if(_this.updateData.state == ""){
                _this.$message.error("请选择项目状态");
                return
            }else if(_this.updateData.title == ""){
                _this.$message.error("请输入标题");
                return
            }else if(_this.updateData.content == ""){
                _this.$message.error("请输入内容");
                return
            }
            _this.$axios.post({
                url: "",
                data: _this.updateData
            }, r => {
                if(r.data.code == 1){

                }
            })
        },
        /**
         * 提交项目信息
         * @param {String} str 类别
         */
        setInfo(str){
            console.log(this.projectInfo[str])
        }
    }
}
</script>
<style lang="scss" scoped>

</style>