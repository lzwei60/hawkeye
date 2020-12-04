<template>
    <div class="main-container" id="Vue-leftSide">
        <TopAside v-if="topSide"></TopAside>
        <Content />
        <div :class="lockKey ? 'hk-lock drag' : 'hk-lock drag none'">
            <div class="hk-lock-main hk-top15">
                <div class="pass-lock no-drag">
                    <p class="user-name">{{userName}}</p>
                    <el-input type="password" v-model="password" class="no-drag" size="small" placeholder="请输入密码"
                        show-password @keyup.enter.native="login"></el-input>
                    <span class="f12 red">{{title}}</span>
                    <el-button size="mini" type="primary" class="mt10 hk-w100 hk-lock-button no-drag" @click="login">解锁</el-button>
                    <div class="switch mt5 no-drag" @click="logOut">切换账号</div>
                </div>
                <i class="el-icon-lock no-drag">
                    <span>已锁定</span>
                </i>
            </div>
        </div>
    </div>
</template>
<script>
    import TopAside from "./top_aside.vue";
    import Content from "./content.vue";
    export default {
        components: {
            TopAside,
            Content
        },
        data() {
            return {
                topSide: true,
                userName: "用户名", // 用户名
                password: "", // 密码
                title: "", // 显示内容
                user: "" //用户账号
            };
        },
        created: function() {
            var column = this.$store.getters.crumbList;
            // this.userName = JSON.parse(localStorage.getItem("USERNAMEID")).name || "";
            if (column.meta.topSide) {
                this.topSide = false;
            }
            //获取cookie字符串
            var strCookie = document.cookie;
            //将多cookie切割为多个名/值对
            var arrCookie = strCookie.split("; ");
            //遍历cookie数组，处理每个cookie对
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                //找到名称为user的cookie，并返回它的值
                if ("USERLOG" == arr[0]) {
                    this.user = arr[1];
                    break;
                }
            }
        },
        computed: {
            column: function() {
                return this.$store.getters.crumbList;
            },
            // 监听锁屏值
            lockKey: function() {
                return this.$store.state.User.lockKey;
            }
        },
        watch: {
            column: function(val) {
                if (val.meta.topSide) {
                    this.topSide = false;
                } else {
                    this.topSide = true;
                }
            }
        },
        methods: {
            login() {
                let othis = this;
                othis.$store.dispatch("FETCH_LOCKKEY", "");
                let md5pwd = "";
                let reg = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]{6,16}$/;
                if (othis.password == "") {
                    othis.title = othis.$t("6-16-password");
                    return false;
                } else {
                    if (reg.test(othis.password)) {
                        md5pwd = othis.common.md5(
                            othis.common.md5(othis.password) + "password"
                        );
                        othis.title = "";
                        othis.$axios.post({
                                url: othis.$api + "/login",

                                data: {
                                    user: othis.user,
                                    password: md5pwd
                                }
                            },
                            r => {
                                othis.password = "";
                                if (r.data.code == 1) {
                                    othis.$store.dispatch("FETCH_LOCKKEY", "");
                                } else if (r.data.code == 0) {
                                    othis.title = othis.$t(r.data.msg);
                                }
                            }
                        );
                    } else {
                        othis.title = othis.$t("6-16-password");
                        return false;
                    }
                }
            },
            // 切换用户
            logOut() {
                location.reload();
                this.$store.dispatch("FETCH_LOCKKEY", "");
                this.$store.commit("OUT_TOKEN");
            }
        }
    };
</script>
