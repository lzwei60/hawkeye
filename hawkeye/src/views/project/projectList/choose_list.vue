<template>
    <div class="work-main">
        <!-- 功能菜单 -->
        <el-row :gutter="10" class="mb5">
            <el-col :lg="21" :md="24">
                <el-button type="primary" class="el-icon-plus hk-mini-button" size="mini" title="创建新项目" @click="isCreate = !isCreate"> 创建新项目</el-button>
            </el-col>
            <el-col :lg="3" :md="24">
                <el-radio-group class="right" size="mini" v-model="listMethods">
                    <el-radio-button label="1"><i class="el-icon-third-appstore-fill no-drag"></i></el-radio-button>
                    <el-radio-button label="2"><i class="el-icon-third-unorderedlist no-drag"></i></el-radio-button>
                </el-radio-group>
            </el-col>
        </el-row>
        <div>
            <div class="white-bg mt10 p10 application">
                <el-row class="tc" v-show="listMethods == '1'">
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" v-for="(item, index) in projectList" :key="item.id">
                        <div class="hk-work-icon" @mousemove="mouseEvent(item,'move')" @mouseleave="mouseEvent(item,'leave')" @click="gotoProject(item,$event)">
                            <i class="hk-icon" style="font-size:36px;" :class="item.icon ? item.icon : 'el-icon-loading'" :style="{color: item.color}"></i>
                            <span class="font">{{ item.name }}</span>
                            <el-popover ref="popoverIcon" placement="bottom" width="380" :class="item.isShow ? 'none' : ''" @show="getShow(item,true)" @hide="getShow(item,false)">
                                <div>
                                    <el-row :gutter="20">
                                        <el-col :span="3" v-for="(item1,index1) in colorList">
                                            <span class="hk--icon--color center hk-hover" :style="{backgroundColor: item1}" @click="changeColor(item,item1,'edit')">
                                                <i class="el-icon-check white ml3 bold" v-show="item.color == item1"></i>
                                            </span>
                                        </el-col>
                                    </el-row>
                                    <div class="hk-w350 tc mt10">
                                        <el-row :gutter="20">
                                            <el-col :span="4" v-for="(item1,index1) in iconList" class="mb10 hk-hover">
                                                <i :class="item1" :style="{color:item.color}" style="font-size: 22px;" @click="changeIcon(item,item1,'edit',index)"></i>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </div>
                                <i slot="reference" class="el-icon-third-setting a0-bg p5 bra50 white hk-icon-set"></i>
                            </el-popover>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" key="创建新项目">
                        <div class="hk-work-icon" @click="isCreate = !isCreate">
                            <i class="hk-icon f28 el-icon-folder" style="backgroundColor：#fff"></i>
                            <span class="font">创建新项目</span>
                        </div>
                    </el-col>
                </el-row>
                <el-table :data="projectList" class="hk-table" v-show="listMethods == '2'">
                    <el-table-column label="项目名称" prop="source">
                        <template slot-scope="scope">
                            <div class="hk-hover">
                                <i :class="scope.row.icon" class="mr10 f22" :style="{color: scope.row.color}"></i>
                                <span>{{scope.row.name}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="创建时间" width="300">
                        <template slot-scope="scope">
                            {{ datetime.forwardDate(scope.row.createTime, 'yyy-MM-dd HH:ss:mm') }}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 新建项目-->
        <el-dialog title="新建项目" :visible.sync="isCreate" :append-to-body="true" top="15px" class="hk-dialog hk-w-small hk-dialog-blue" :close-on-click-modal="false" @close="cancle">
            <div class="work-main">
                <span class="mr10">项目名称</span>
                <el-input class="hk-input hk-w400" placeholder="请输入项目名称" clearable v-model="projectData.name"></el-input>
                <el-popover ref="popoverIcon" placement="bottom" width="380">
                    <div>
                        <el-row :gutter="20">
                            <el-col :span="3" v-for="(item1,index1) in colorList">
                                <span class="hk--icon--color center hk-hover" :style="{backgroundColor: item1}" @click="changeColor(projectData,item1)">
                                    <i class="el-icon-check white ml3 bold" v-show="projectData.color == item1"></i>
                                </span>
                            </el-col>
                        </el-row>
                        <div class="hk-w350 tc mt10">
                            <el-row :gutter="20">
                                <el-col :span="4" v-for="(item1,index1) in iconList" class="mb10 hk-hover">
                                    <i :class="item1" :style="{color:projectData.color}" style="font-size: 22px;" @click="changeIcon(projectData,item1)"></i>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <i slot="reference" class="hk-icon ml10" style="font-size:20px;" :class="projectData.icon" :style="{color: projectData.color}"></i>
                </el-popover>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancle">取消</el-button>
                <el-button type="primary" size="small" @click="confim">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    inject: ['reload'],
    data() {
        return {
            listMethods: "1",
            projectList: [
                {
                    id: "1",
                    name: "鹰眼",
                    color: "#ec8a89",
                    icon: "el-icon-eleme",
                    createTime: "1598515978666",
                    isShow: true,
                    isSetIcon: false
                }, {
                    id: "2",
                    name: "鹰眼",
                    color: "#ec8a89",
                    icon: "el-icon-eleme",
                    createTime: "1598515978666",
                    isShow: true,
                    isSetIcon: false
                }, {
                    id: "3",
                    name: "鹰眼",
                    color: "#ec8a89",
                    icon: "el-icon-eleme",
                    createTime: "1598515978666",
                    isShow: true,
                    isSetIcon: false
                }, {
                    id: "4",
                    name: "鹰眼",
                    color: "#ec8a89",
                    icon: "el-icon-eleme",
                    createTime: "1598515978666",
                    isShow: true,
                    isSetIcon: false
                }, {
                    id: "5",
                    name: "鹰眼",
                    color: "#ec8a89",
                    icon: "el-icon-eleme",
                    createTime: "1598515978666",
                    isShow: true,
                    isSetIcon: false
                }, {
                    id: "6",
                    name: "鹰眼",
                    color: "#ec8a89",
                    icon: "el-icon-eleme",
                    createTime: "1598515978666",
                    isShow: true,
                    isSetIcon: false
                }, {
                    id: "7",
                    name: "鹰眼",
                    color: "#ec8a89",
                    icon: "el-icon-eleme",
                    createTime: "1598515978666",
                    isShow: true,
                    isSetIcon: false
                }, {
                    id: "8",
                    name: "鹰眼",
                    color: "#ec8a89",
                    icon: "el-icon-eleme",
                    createTime: "1598515978666",
                    isShow: true,
                    isSetIcon: false
                }, 
            ],
            colorList: ["#ec8a89","#e4cc7f","#c3db8b","#93d7d8","#77b2e6","#efa9db","#b9c0c7","#683ecc"],
            iconList: [
                "el-icon-third-cloud-fill", "el-icon-third-time-circle", "el-icon-third-earth", "el-icon-third-apple-fill", "el-icon-third-android-fill",
                "el-icon-third-audio-fill", "el-icon-third-notification-fill", "el-icon-third-fire-fill", "el-icon-third-user", "el-icon-third-twitter",
                "el-icon-third-QQ", "el-icon-third-HTML-fill", "el-icon-third-weibo", "el-icon-third-wechat-fill", "el-icon-third-aliwangwang-fill",
                "el-icon-third-github-fill", "el-icon-third-windows-fill", "el-icon-third-chrome", "el-icon-third-IE", "el-icon-third-taobao",
                "el-icon-third-alipay", "el-icon-third-cloud-upload", "el-icon-third-phone-fill", "el-icon-third-bank-fill", "el-icon-third-camera-fill",
                "el-icon-third-setting-fill", "el-icon-third-edit-fill", "el-icon-third-pushpin-fill", "el-icon-third-tag-fill", "el-icon-third-github-fill"
            ],
            isCreate: false, // 是否展示创建项目
            projectData: {
                name: "",
                color: "#ec8a89",
                icon: "el-icon-third-time-circle"
            }
        }
    },
    methods: {
        /**
         * 显示设置图标
         * @param {Object} obj 操作的数据
         * @param {String} type 操作的类型
         */
        mouseEvent(obj,type){
            obj.isShow = type == 'move' ? false : true;
            if(type == 'leave' && obj.isSetIcon){
                obj.isShow = false;
            }
        },
        /**
         * 点击隐藏或显示
         * @param {Object} obj 操作的数据
         * @param {Boolean} type 操作的类型
         */
        getShow(obj,type){
            obj.isSetIcon = type;
            obj.isShow = type ? false : true;
        },
        /**
         * 修改颜色
         * @param {Object} obj 操作的数据
         * @param {String} color 颜色
         * @param {String} type 操作的类型
         */
        changeColor(obj, color, type){
            if(type == 'edit'){
                // 请求
            }
            obj.color = color;
        },
        /**
         * 修改图标
         * @param {Object} obj 操作的数据
         * @param {String} icon 图标
         * @param {String} type 操作的类型
         * @param {Number} index 操作数据的下标
         */
        changeIcon(obj, icon, type, index){
            obj.icon = icon;
            if(type == 'edit'){
                this.$refs.popoverIcon[index].doClose();
                // 请求
            }else{
                this.$refs.popoverIcon.doClose();
            }
        },
        /**
         * 关闭弹窗的操作
         */
        cancle(){
            this.isCreate = false;
            this.projectData.name = "";
        },
        /**
         * 确认创建的操作
         */
        confim() {
            this.projectData.isShow = true;
            this.projectData.isSetIcon = false;
            this.projectList.push(this.projectData);
            console.log(this.projectList)
            this.cancle();
        },
        /**
         * 进入项目
         */
        gotoProject(obj,e) {
            if(e.target.className != 'el-icon-third-setting a0-bg p5 bra50 white hk-icon-set el-popover__reference'){
                this.$emit("function", 'function')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.bra50 {
    border-radius: 50%
}
.hk-icon-set {
    position: absolute;
    top: 10px;
    right: 10px;
}
.hk-icon-set2 {
    position: absolute;
    top: 40px;
    right: 10px;
}
.hk--icon--color{
    width: 20px;
    height: 20px;
    display: block;
}
</style>