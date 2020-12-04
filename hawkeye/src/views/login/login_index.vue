<template>
    <div id="login_wrap" :class="pcbg ? 'login-pcbg' : ''">
        <div class="hk-login-main drag">
            <div class="hk-login">
                <div class="BackToLogin">
                    <el-row>
                        <el-col :span="9" class="return">
                            <span v-if="!isforget">鹰眼任务</span>
                            <span class="no-drag" @click="backLog" v-else>返回登录</span>
                        </el-col>
                    </el-row>
                </div>
                <!-- 登录 || 注册 -->
                <div class="hk-login-body">
                    <div class="thumb">
                        <img src="@i/index/logo.png" />
                    </div>
                    <div class="hk-login-form">
                        <el-input class="mb10 no-drag" size="small" v-model="userEmail" :placeholder="userAcount" @blur="userBlur">
                            <template slot="prepend">
                                <i class="el-icon-user"></i>
                            </template>
                        </el-input>
                        <el-input type="password" class="mb10 no-drag" clearable show-password v-model="password" size="small" placeholder="请输入密码" v-if="!isforget">
                            <template slot="prepend">
                                <i class="el-icon-lock"></i>
                            </template>
                        </el-input>
                        <div class="hk-controls mb10" v-if="isforget">
                            <el-input size="small" class="no-drag" placeholder="验证码" v-model="verif" maxlength="4"></el-input>
                            <el-button class="get no-drag" size="small" type="primary" plain @click="sendCode">{{ forissend ? fortimer + '秒重获验证码' : '发送验证码' }}</el-button>
                        </div>
                        <template v-if="isforget">
                            <el-input type="password" class="mb10 no-drag" size="small" v-model="newpwd" placeholder="设置新密码"></el-input>
                            <el-input type="password" class="mb10 no-drag" size="small" v-model="conpwd" placeholder="确认密码"></el-input>
                        </template>
                        <el-button type="primary" class="hk-w100 no-drag" :disabled="!islogin" @click="login">
                            {{ isforget ? '确认' : '登陆' }}</el-button>
                        <el-row class="mt10" v-if="!isforget">
                            <el-col :span="12">
                                <span>
                                    <el-checkbox type="checkbox" class="no-drag" v-model="isrember">记住账号</el-checkbox>
                                </span>
                            </el-col>
                            <el-col :span="12" class="hk-hover tr">
                                <span class="no-drag" @click="forgetPwd">忘记密码</span>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div class="footer">
                    <img src="@i/index/logo.png" align="center" height="22" />
                    鹰眼任务系统
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
            pcbg: true,
            islogin: true, //是否可以进行登陆
            isrember: false, //是否记住账号
            isforget: false, //是否忘记密码
            userAcount: "请输入邮箱账号", //输入用户名的提示语
            userEmail: "", // 用户邮箱账号
            password: "", // 登陆密码
            verif: "", // 验证码
            newpwd: "", //设置新密码
            conpwd: "", //确认密码
            forissend: false, //忘记密码是否发送验证码
            fortimer: 60 //忘记密码验证码倒计时时间
        };
    },
    created() {
        let othis = this;
        let user = othis.$tools.getCookie("USERLOG");
        let isrember = othis.$tools.getCookie("ISREMBER");
        othis.userEmail = user != "" ? user : "";
        othis.isrember = isrember != "" ? true : false;
        othis.userBlur();
        let fortimer = localStorage.getItem("fortimer");
        if (fortimer) {
            othis.fortimer = fortimer;
            othis.forCountDown();
        }
    },
    methods: {
        /**
         * 输入账户失去焦点
         */
        userBlur() {
            let othis = this;
            if (othis.userEmail == "") {
                othis.$message.error(othis.userAcount);
                othis.islogin = false;
                return false;
            } else {
                let regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!regEmail.test(othis.userEmail)) {
                    othis.$message.error("邮箱格式有误，请重新输入");
                    othis.islogin = false;
                } else {
                    othis.islogin = true;
                }
            }
        },
        /**
         * 发送验证码
         */
        sendCode() {
            let othis = this;
            if (!othis.islogin) {
                othis.$message.error("请输入正确的邮箱账号");
                return false;
            }
            othis.forCountDown();
        },
        /**
         * 忘记密码验证码倒计时
         */
        forCountDown() {
            let othis = this;
            othis.forissend = true;
            if (othis.fortimer === 0) {
                othis.fortimer = 60;
                othis.forissend = false;
                localStorage.removeItem("fortimer");
                return;
            } else {
                othis.fortimer--;
                localStorage.setItem("fortimer", othis.fortimer);
            }
            setTimeout(() => {
                othis.forCountDown();
            }, 1000);
        },
        /**
         * 登陆 || 注册
         */
        login(){
            let othis = this;
            let md5pwd = "";
            let data = "";
            let reg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]{6,16}$/;
            let url = "";
            this.$router.push( "createTeam", onComplete => {}, onAbort => {} );
            return
            if (!othis.islogin) {
                othis.$message.error("请输入邮箱账号");
                return false;
            }
            //登陆
            if (!othis.isforget) {
                if (othis.password == "") {
                    othis.$message.error("请输入6-16位的包含数字英文的密码");
                    return false;
                } else {
                    if (reg.test(othis.password)) {
                        md5pwd = othis.common.md5(othis.password);
                    } else {
                        othis.$message.error("请输入6-16位的包含数字英文的密码");
                        return false;
                    }
                }
                url = othis.$api + "/login";
                
            } else { //忘记密码
                if (othis.verif == "") {
                    othis.$message.error("请输入验证码");
                    return false;
                }
                data.verif = othis.verif;
                if (othis.newpwd == "") {
                    othis.$message.error("请输入6-16位的包含数字英文的密码");
                    return false;
                } else {
                    if (reg.test(othis.newpwd)) {
                        md5pwd = othis.common.md5(othis.newpwd);
                    } else {
                        othis.$message.error("请输入6-16位的包含数字英文的密码");
                        return false;
                    }
                }
                if (othis.newpwd != othis.conpwd) {
                    othis.$message.error("两次密码不一致");
                    return false;
                }
                url = othis.$api + "/forget";
            }
            data = { user: othis.userEmail, password: md5pwd };
            if (othis.isrember) {
                this.$tools.setCookie("USERLOG", this.user, 30);
                this.$tools.setCookie("ISREMBER", true, 30);
            }
            othis.$axios.post({
                    url: url,
                    data: data
            },r => {
                if (r.data.code == 1) {
                    if (!othis.isforget) {
                        var token = r.data.info.other;
                        othis.$store.commit("SET_TOKEN", token);
                        localStorage.setItem("Permission", JSON.stringify(r.data.info.list));
                        localStorage.setItem("USERNAMEID",JSON.stringify(r.data.info.data));
                        localStorage.setItem( "Count",JSON.stringify(r.data.info.list.noReadApproval));
                        this.$router.replace("/");
                    } else {
                        othis.$message.success(r.data.msg);
                        othis.backLog();
                    }
                } else {
                    othis.$message.error(r.data.msg);
                }
            });
        },
        /**
         * 返回登陆
         */
        backLog() {
            this.isforget = false;
            this.password = "";
            this.verif = "";
            this.newpwd = "";
            this.conpwd = "";
        },
        /**
         * 忘记密码
         */
        forgetPwd() {
            this.isforget = true;
            this.password = "";
            this.verif = "";
            this.newpwd = "";
            this.conpwd = "";
        }
    },
};
</script>