<template>
    <div class="overflow-x">
        <div class="header">
            <el-row :gutter="10" class="mb30" style="margin: 0;">
                <el-col :lg="16" :md="12" :sm="12" :xs="12">
                    <div class="pl10 pt10">
                        <img class="nav_logo_img left mr10" src="@i/index/logo.png" alt="鹰眼任务">
                        <p class="f16 white nav_logo_text">鹰眼任务系统</p>
                    </div>
                </el-col>
                <el-col :lg="8" :md="12" :sm="12" :xs="12">
                    <div class="right pr10 pt10">
                        <el-button type="text" class="hs-mini-button" title="登陆" @click="login('login')">登陆</el-button>
                        <el-button type="primary" class="hs-mini-button" title="注册" @click="login('regiest')">立即注册</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" style="margin: 0;">
                <el-col :lg="12" :xs="12" :md="12" :sm="12" :offset="6">
                    <p class="tc mt80 f32 white letter">网上办公，与团队高效协作</p>
                    <div class="tc mt30 mb30">
                        <el-button type="primary" class="hs-mini-button tc" title="添加" @click="login('login')">立即体验</el-button>
                    </div>
                    <div class="mt30">
                        <img class="nav_index_drop" src="@i/index/index_drop.png" alt="展示图">
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="content bg-fd">
            <el-row class="content_ptb100">
                <el-col :lg="12" :md="12" :sm="12" :xs="24">
                    <div class="right tc hk-w500">
                        <p class="pt20 f22 tc mb10">专注项目，实现目标</p>
                        <p class="f20 mt20 gray">“鹰眼任务系统”是一款协力企业和团队实现目标的系统。企业在创建团队后，可以建立项目，对项目成员分配任务，查看项目或成员进度</p>
                    </div>
                </el-col>
                <el-col :lg="12" :md="12" :sm="12" :xs="24">
                    <img class="" src="@i/index/pc.png" alt="电脑图">
                </el-col>
            </el-row>
        </div>
        <div class="content">
            <el-row class="content_ptb100">
                <el-col :lg="12" :md="12" :sm="12" :xs="24">
                    <div class="bluebg right">
                        <img class="oneimg" src="@i/index/createproject.png" alt="电脑图">
                        <img class="twoimg" src="@i/index/Invitation.png" alt="电脑图">
                        <img class="thrimg" src="@i/index/filechild.png" alt="电脑图">
                        <img class="fouimg" src="@i/index/statistics.png" alt="电脑图">
                    </div>
                </el-col>
                <el-col :lg="12" :md="12" :sm="12" :xs="24">
                    <p class="ml40 mb30 mt80 f28 letter">有目标的推进工作</p>
                    <div class="ml40">
                        <div class="border_bottom mt80">
                            <span class="mr10 f28">1.</span>
                            <span class="f24 gray">创建一个项目</span>
                        </div>
                        <div class="border_bottom mt30">
                            <span class="mr10 f28">2.</span>
                            <span class="f24 gray">邀请成员</span>
                        </div>
                        <div class="border_bottom mt30">
                            <span class="mr10 f28">3.</span>
                            <span class="f24 gray">添加成员任务，项目文件</span>
                        </div>
                        <div class="border_bottom mt30">
                            <span class="mr10 f28">4.</span>
                            <span class="f24 gray">查看项目进度</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="content bg-fd">
            <el-row class="content_pt100 pb20">
                <el-col :lg="12" :md="12" :sm="12" :xs="24">
                    <div class="right hk-w500">
                        <p class="f32 mt80 gray">现在就开始使用鹰眼，开始高效团队协作</p>
                    </div>
                </el-col>
                <el-col :lg="12" :md="12" :sm="12" :xs="24">
                    <img class="" src="@i/index/loginall.png" alt="登陆图">
                </el-col>
            </el-row>
        </div>
        <div class="pt20 pb20">
            <p class="tc gray">©2018 鹰眼任务系统 —— 网上办公，与团队高效协作</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        };
    },
    methods: {
        /**
         * 登陆 || 注册
         * @param {String} type 类型 login 登陆 regiest 注册
         */
        login(type){
            this.$router.push("login", onComplete => {}, onAbort => {});
        }
    },
};
</script>
<style lang="scss" scoped>
@import url("../../assets/css/index.scss");
</style>