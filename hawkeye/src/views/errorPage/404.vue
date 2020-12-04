<template>
    <el-row type="flex" justify="center">
        <el-col :md="14" :lg="10" class="tc hk-ty-icon">
            <div class="white-bg p30 f18 mt20 webBg">
                <div class="hk-icon el-icon-warning red p30"></div>
                <div class="mb30 gray">{{ message }}</div>
                <el-button type="primary" class="el-icon-refresh-left mb30" @click="backToHome" round>返回首页</el-button>
            </div>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name: 'page404',
    data() {
        return {}
    },
    methods: {
        backToHome() {
            this.$router.push({ path: '/' }, onComplete => { }, onAbort => { })
        }
    },
    computed: {
        message() {
            return '404，找不到页面！'
        }
    }
}
</script>
