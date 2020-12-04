<template>
    <div id="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
export default {
    name: "app",
    provide() {
        return {
            reload: this.reload
        };
    },
    data() {
        return {
            isRouterAlive: true
        };
    },
    mounted() {
        // 判断异常关闭
        if (window.performance.navigation.type != 1) {
            //this.$store.commit('OUT_TOKEN');
        }
    },
    methods: {
        async reload() {
            this.isRouterAlive = false;
            await this.$nextTick(function() {
                this.isRouterAlive = true;
            });
        }
    }
};
</script>
