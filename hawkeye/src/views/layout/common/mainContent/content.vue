<template>
    <div class="main-content">  
        <router-view></router-view>
    </div>
</template>
<script>
const hsapp = 0;
export default {
    inject: ["reload"],
    data() {
        return {
            timerw: false,
            timerh: false
        };
    },
    mounted: function() {
        var othis = this;
        var leftwidth = document.getElementsByClassName("left-side")[0].clientHeight;
        let topheight = document.getElementsByClassName("aside_top")[0] ? document.getElementsByClassName("aside_top")[0].clientHeight : 0;
        localStorage.getItem('hsapp') ? (hsapp = 30) : '';
        document.getElementsByClassName("left-side")[0].style.height = othis.fullHeight - hsapp + 'px';
        document.getElementsByClassName("main-content")[0].style.height = othis.fullHeight - topheight - hsapp + 'px';
        this.getMainContent(topheight - hsapp);
        window.onresize = function() {
            window.clientWidth = document.documentElement.clientWidth;
            window.clientHeight = document.documentElement.clientHeight;
            othis.$store.dispatch('FETCH_fullWidth', window.clientWidth);
            othis.$store.dispatch('FETCH_fullHeight', window.clientHeight);
        };
    },
    computed: {
        fullWidth: function() {
            return this.$store.state.Common.fullWidth;
        },
        fullHeight: function() {
            return this.$store.state.Common.fullHeight;
        },
        // 获取当前点击的id
        channelid() {
            return this.$store.getters.channelid;
        },
        newReload: function(){
            return this.$store.state.User.reload;
        },
    },
    methods: {
        getMainContent(newheight) {
            let othis = this;
            let ischange = true;
            let topheight = document.getElementsByClassName("aside_top")[0] ? document.getElementsByClassName("aside_top")[0].clientHeight : 0;
            if (newheight != topheight) {
                ischange = false;
            }
            if (!ischange) {
                document.getElementsByClassName("main-content")[0].style.height = othis.fullHeight - topheight - hsapp + 'px';
                newheight = topheight;
            }
            setTimeout(function() {
                othis.getMainContent(newheight);
            }, 400);
        }
    },
    watch: {
        fullHeight: function(val) {
            if (!this.timerh) {
                document.getElementsByClassName("left-side")[0].style.height = this.fullHeight - hsapp + 'px';
                let topheight = document.getElementsByClassName("aside_top")[0] ? document.getElementsByClassName("aside_top")[0].clientHeight : 0;
                document.getElementsByClassName("main-content")[0].style.height = this.fullHeight - topheight - hsapp + 'px';
                this.timerh = true;
                let that = this;
                setTimeout(function() {
                    that.timerh = false;
                }, 400);

            }
        },
        newReload: function(val){
            if(this.channelid.id != 'mmbhapuurs')
            this.reload();
        }
    }
};
</script>
