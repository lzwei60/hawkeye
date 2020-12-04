<template>
    <div id="login_wrap" class="login-pcbg">
        <div class="hk-login-main drag">
            <div class="hk-login">
                <div class="BackToLogin">
                    <el-row>
                        <el-col :span="9" class="return">
                            <span>创建团队</span>
                        </el-col>
                    </el-row>
                </div>
                <!-- 登录 || 注册 -->
                <div class="hk-login-body">
                    <div class="p10">
                        <span class="f16 mb10 block">团队名称</span>
                        <el-input type="text" size="mini" class="hs-input" clearable placeholder="请输入团队名称" maxlength="20" show-word-limit v-model="teamName"></el-input>
                        <el-button type="primary" class="hk-w100 no-drag mt10 mb10" @click="createTeam">创建</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "../../assets/css/login.scss";
export default {
    data() {
        return {
            teamName: "", // 团队名称
        };
    },
    methods: {
        /**
         * 创建团队
         */
        createTeam(){
            this.$router.replace("/");
        }
    },
};
</script>