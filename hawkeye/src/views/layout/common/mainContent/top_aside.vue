<template>
    <aside class="aside_top drag">
        <div class="aside_top_header">
            <el-row>
                <el-col :span="8" class="left-function">
                    <el-button plain class="el-icon-lock middle no-drag hs-mini-button" @click="lock" size="mini" title="锁屏"></el-button>
                    <el-button type="primary" plain class="el-icon-refresh middle no-drag hs-mini-button" @click="reload" size="mini" title="刷新"></el-button>
                </el-col>
            </el-row>
        </div>
        <topNav v-show="channelid.id != 'mmbhapuurs'"></topNav>
    </aside>
</template>
<script>
import topNav from './top_nav.vue'
export default {
    components: {
        topNav
    },
    data() {
        return {
            
        };
    },
    methods: {
        /**
         * 点击栏目——路由跳转并且打开新标签页
         * @param {Object} router 点击的栏目的数据
         * @param {name} name 点击的栏目的名称
         */
        gotoRoute(router, name) {
            if (router.children) {
                if (router.children[0].children) {
                    localStorage.setItem('click-column', JSON.stringify({ one: name, two: router.children[0].name, three: router.children[0].children[0].name }));
                } else {
                    localStorage.setItem('click-column', JSON.stringify({ one: name, two: router.children[0].name }));
                }
            } else {
                localStorage.setItem('click-column', JSON.stringify({ one: name }));
            }
            this.$store.commit('setCrumbList', router);
            this.$store.commit('SET_tagsValue',name);
            this.$router.push({name}, onComplete => {}, onAbort => {});
        },
        /**
         * 点击出现锁屏
         */
        lock() {
            this.$store.dispatch('FETCH_LOCKKEY', true);
        },
        /**
         * 小工具
         */
        selectValue(name){
            if(name == "custom"){
                this.isCustom = true;
            }else if(name == "case"){
                this.isCase = true;
            }else if(name == "sample"){
                this.isSample = true;
            }
        },
        reload(){
            this.$store.dispatch('FETCH_RELOAD', new Date().getTime());
        }
    },
    computed: {
        /**
         * 获取当前点击的id
         */
        channelid() {
            return this.$store.getters.channelid;
        },
        /**
         * 获取左侧栏目
         */
        sidebarMenu() {
            return this.$store.state.User.sidebarMenu;
        },
    },
};
</script>
<style lang="scss" scoped>
    .right-function-avtive {
        color: #0078d7;
    }
</style>
