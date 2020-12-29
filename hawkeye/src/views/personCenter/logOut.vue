<template>
    <div class="white-bg p30 f18 mt20">
        <el-row type="flex" justify="center">
            <el-col :md="14" :lg="10" class="tc hs-ty-icon">
                <div class="hs-icon el-icon-switch-button red p30"></div>
                <div class="mb30 gray">{{ msg }}</div>
                <el-button type="primary" class="el-icon-switch-button mb30" v-show="loginOut" @click="loginOutFn" round>重新退出</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
// const { ipcRenderer } = require('electron');
export default {
    data() {
        return {
            msg: '待确认退出……',
            loginOut: false
        };
    },
    methods: {
        loginOutFn() {
            let othis = this;
            let hsapp = localStorage.getItem('hsapp'); //获取localstrong
            setTimeout(function() {
                // 判断是否软件
                // if (hsapp) {
                //     ipcRenderer.send('setSize', { width: 500, height: 460, OnTop: true, skip: true }); //调整窗口
                //     ipcRenderer.send('closeOpenWin'); //关闭桌面工具
                //     ipcRenderer.send('menu', true); //删除菜单
                //     localStorage.clear();
                //     sessionStorage.clear();
                //     localStorage.setItem('hsapp', 'hs');
                // }else{
                //     localStorage.clear();
                //     sessionStorage.clear();
                // }
                location.reload();
                othis.$store.commit('OUT_TOKEN');
            }, 300);
            othis.msg = '安全退出中，请稍后……';
        },
        confimFn() {
            this.$confirm('确认退出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.loginOutFn();
                })
                .catch(() => {
                    this.msg = '已取消退出';
                    this.loginOut = true;
                });
        }
    },
    mounted() {
        this.confimFn();
    }
};
</script>
