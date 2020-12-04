<template>
    <div>
        <!-- 功能菜单 -->
        <el-row :gutter="10" class="mb5">
            <el-col :lg="16" :md="24">
                <el-button type="primary" class="el-icon-plus mr10" size="mini" title="创建新项目" @click="isTasks = !isTasks">添加任务</el-button>
                <el-select v-model="searchData.taskCase" clearable placeholder="请选择" size="mini" class="mr10" @change="searchFinish">
                    <el-option key="1" label="未完成任务" value="1"></el-option>
                    <el-option key="2" label="已完成任务" value="2"></el-option>
                    <el-option key="3" label="所有任务" value="3"></el-option>
                </el-select>
                <el-select v-model="searchData.priority" placeholder="请选择优先级" size="mini" @change="searchPriority">
                    <el-option key="0" value="0" label="不限">
                        <span class="pt3 pb3 pl10 pr10 mr10" style="background-color: #c5c5c5;"></span>不限
                    </el-option>
                    <el-option :key="item.id" :value="item.id" :label="item.value" v-for="(item, index) in priorityData">
                        <span class="pt3 pb3 pl10 pr10 mr10" :style="{backgroundColor: item.color}"></span>{{item.value}}
                    </el-option>
                </el-select>
                <el-date-picker class="ml5" type="daterange" size="mini" align="right" v-model="searchData.finishTime" unlink-panels value-format="timestamp" range-separator="至" start-placeholder="完成时间开始日期" end-placeholder="完成时间结束日期" @change="searchDate"></el-date-picker>
            </el-col>
            <el-col :lg="8" :md="24">
                <el-input placeholder="请输入任务标题" v-model="searchData.value" size="mini" class="hk-select-w80 hidden-md-and-down">
                    <el-button slot="append" icon="el-icon-search" @click="searchValue"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <!-- 表格数据 -->
        <el-table :data="taskTable" class="hk-table">
            <el-table-column label="任务标题">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.isFinish"></el-checkbox>
                    <span :class="scope.row.isFinish ? 'through' : ''" class="ml10">{{scope.row.title}}</span>
                    <span class="f12 gray ml10" v-if="scope.row.isFinish">已经由 {{getUserName(scope.row.finishUser)}} 完成</span>
                </template>
            </el-table-column>
            <el-table-column label="标签" width="280">
                <template slot-scope="scope">
                    <span v-for="item in scope.row.tags">
                        <span class="hk-tags-span mr5 f12" :style="getTagStyle(item)">{{item}}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="优先级" width="80">
                <template slot-scope="scope">
                    <span :style="getStyle(scope.row.priority)" style="border-radius: 5px;" class="p5 white f14">{{ getPrioity(scope.row.priority) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="截止时间" width="160">
                <template slot-scope="scope">
                    {{ datetime.forwardDate(scope.row.cutOffTime, 'yyy-MM-dd HH:ss:mm') }}
                </template>
            </el-table-column>
            <el-table-column label="负责人" width="120" align="center">
                <template slot-scope="scope">
                    {{ getUserName(scope.row.principal) }}
                </template>
            </el-table-column>
            <el-table-column label="创建人" width="120" align="center">
                <template slot-scope="scope">
                    {{getUserName(scope.row.createUser) }}
                </template>
            </el-table-column>
            <el-table-column label="完成时间" width="160">
                <template slot-scope="scope">
                    {{ scope.row.finishTime ? datetime.forwardDate(scope.row.finishTime, 'yyy-MM-dd HH:ss:mm') : '' }}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="200">
                <template slot-scope="scope">
                    {{ datetime.forwardDate(scope.row.createTime, 'yyy-MM-dd HH:ss:mm') }}
                </template>
            </el-table-column>
            <el-table-column label="" width="100">
                <template slot-scope="scope">
                    <i class="el-icon-edit-outline f16 hk-hover middle" title="编辑" @click="editTask(scope.row)"></i>
                    <i class="el-icon-delete f16 hk-hover pl10 middle danger" title="删除" @click="deleteTask(scope.row)"></i>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background :page-size="searchData.limit" layout="total, prev, pager, next" :total="total" class="mt5" @current-change="searchPage"></el-pagination>
        <!-- 新建任务-->
        <el-dialog title="添加任务" :visible.sync="isTasks" :append-to-body="true" top="15px" class="hk-dialog hk-w-small hk-dialog-blue" :close-on-click-modal="false" @close="cancleTask">
            <el-form ref="tasksForm" class="hk-form mb10" label-width="80px" :model="taskData" :rules="rules">
                <el-form-item label="任务标题" prop="title">
                    <el-input size="mini" class="hk-input" placeholder="请输入任务标题" v-model="taskData.title" clearable></el-input>
                </el-form-item>
                <el-form-item label="任务描述" prop="describe">
                    <el-input type="textarea" size="mini" class="hk-textarea" placeholder="请输入任务描述内容" v-model="taskData.describe" clearable></el-input>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                    <el-select multiple filterable placeholder="请选择标签" size="mini" v-model="taskData.tags">
                        <el-option v-for="item in tagsData" :key="item.name" :label="item.name" :value="item.name">
                            <span class="hk-tags-span mr5" :style="{backgroundColor: item.color}">{{item.name}}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优先级" prop="priority">
                    <el-select placeholder="请选择优先级" size="mini" v-model="taskData.priority">
                        <el-option :key="item.id" :value="item.id" :label="item.value" v-for="(item, index) in priorityData">
                            <span class="pt3 pb3 pl10 pr10 mr10" :style="{backgroundColor: item.color}"></span>{{item.value}}
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="截止时间" prop="cutOffTime">
                    <el-date-picker size="mini" value-format="timestamp" type="datetime" placeholder="请选择截止时间" v-model="taskData.cutOffTime"></el-date-picker>
                </el-form-item>
                <el-form-item label="负责人" prop="principal">
                    <el-select placeholder="请选择负责人" size="mini" v-model="taskData.principal">
                        <el-option :key="item.id" :value="item.id" :label="item.name" v-for="(item, index) in projectUser"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancleTask">取消</el-button>
                <el-button type="primary" size="small" @click="confimTask">确认</el-button>
            </span>
        </el-dialog>
        <!--编辑任务 || 查看任务-->
        <taskDetails :show.sync="isEditTask" type="edit" :data="taskData"></taskDetails>
    </div>
</template>
<script>
import taskList from '../../../assets/json/taskList.js'
import taskDetails from '@s/public/taskDetails.vue'
export default {
    components: {
        taskDetails
    },
    data() {
        return {
            // 搜索内容
            searchData: {
                taskCase: "1",
                priority: "0",
                finishTime: [],
                value: "",
                page: 1,
                limit: 10,
            },
            total: 100,
            priorityData: taskList.priorityList, // 优先级列表
            tagsData: taskList.tagsList, // 标签列表
            projectUser: taskList.projectList, // 项目组成员
            // 任务列表
            taskTable: [
                {
                    isFinish: true,
                    title: "这是一个任务标题",
                    describe: "任务描述",
                    tags: ["问题", "待检验"],
                    priority: "1",
                    cutOffTime: "1598515978666",
                    principal: "1001",
                    createUser: "1002",
                    finishUser: "1001",
                    finishTime: "1598515978666",
                    createTime: "1598515978666"
                }, {
                    isFinish: false,
                    title: "这是一个任务标题",
                    describe: "任务描述",
                    tags: ["问题", "待检验"],
                    priority: "1",
                    cutOffTime: "1598515978666",
                    principal: "1001",
                    createUser: "1002",
                    finishUser: "",
                    finishTime: "",
                    createTime: "1598515978666"
                }, {
                    isFinish: false,
                    title: "这是一个任务标题",
                    describe: "任务描述",
                    tags: ["需求", "处理中",],
                    priority: "1",
                    cutOffTime: "1598515978666",
                    principal: "1001",
                    createUser: "1002",
                    finishUser: "",
                    finishTime: "",
                    createTime: "1598515978666"
                }
            ],
            isTasks: false, // 是否展示添加任务
            // 添加任务数据
            taskData: {
                title: "",
                describe: "",
                tags: [],
                priority: "",
                cutOffTime: "",
                principal: ""
            },
            oldTaskData: {}, // 初始数据
            // 表单验证
            rules: {
                title: [{ required: true, trigger: 'blur' }],
                cutOffTime: [{ required: true, trigger: 'blur' }],
                principal: [{ required: true, trigger: 'blur' }],
            },
            isEditTask: false, // 是否打开
        }
    },
    created() {
        this.oldTaskData = this.$tools.clone(this.taskData, true);
    },
    methods: {
        /**
         * 获取数据
         */
        getData(obj) {
            console.log(obj)
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
         * 获取优先级颜色
         * @param {String} id 优先级的值
         */
        getStyle(id) {
            for (let i = 0; i < this.priorityData.length; i++) {
                if (this.priorityData[i].id == id) {
                    return { "background-color": this.priorityData[i].color };
                }
            }
        },
        /**
         * 获取优先级的名称
         * @param {String} id 优先级的名称
         */
        getPrioity(id) {
            for (let i = 0; i < this.priorityData.length; i++) {
                if (this.priorityData[i].id == id) {
                    return this.priorityData[i].value;
                }
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
         * 完成情况搜索
         */
        searchFinish(val) {
            this.searchData.taskCase = val;
            this.searchData.page = 1;
            this.searchData.value = "";
            this.searchData.finishTime = [];
            this.getData(this.searchData);
        },
        /**
         * 优先级搜索
         */
        searchPriority(val) {
            this.searchData.priority = val;
            this.searchData.page = 1;
            this.searchData.value = "";
            this.searchData.finishTime = [];
            this.getData(this.searchData);
        },
        /**
         * 完成时间搜索
         */
        searchDate(val) {
            this.searchData.priority = "0";
            this.searchData.taskCase = "3";
            this.searchData.page = 1;
            this.searchData.value = "";
            this.searchData.finishTime = val;
            this.getData(this.searchData);
        },
        /**
         * 搜索任务标题
         */
        searchValue() {
            this.searchData.priority = "0";
            this.searchData.taskCase = "3";
            this.searchData.page = 1;
            this.searchData.finishTime = [];
            this.getData(this.searchData);
        },
        /**
         * 分页搜索
         */
        searchPage(val) {
            this.searchData.priority = "0";
            this.searchData.taskCase = "3";
            this.searchData.page = val;
            this.searchData.value = "";
            this.searchData.finishTime = [];
            this.getData(this.searchData);
        },
        /**
         * 关闭添加任务
         */
        cancleTask() {
            this.isTasks = false;
            this.taskData = this.$tools.clone(this.oldTaskData, true);
            this.$refs.tasksForm.resetFields();
        },
        /**
         * 确认添加任务
         */
        confimTask() {
            let _this = this;
            _this.$refs.tasksForm.validate((valid) => {
                if (valid) {
                    // 请求
                } else {
                    return false;
                }
            });
        },
        /**
         * 删除任务
         * @param {Object} obj 删除任务的数据
         */
        deleteTask(obj) {
            // 删除任务
        },
        /**
         * 编辑任务
         * @param {Object} obj 编辑任务的数据
         */
        editTask(obj) {
            this.taskData = obj;
            this.isEditTask = true;
        },
    },
    
}
</script>
<style lang="scss" scoped>
.hk-tags-span {
    padding: 5px 10px;
    background-color: #de5f5f;
    color: #fff;
    border-radius: 15px;
}
</style>