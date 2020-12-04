<template>
    <div :class="isLeftNav ? 'shrink-dise left-side' : 'left-side'">
        <div class="left-content" @mouseenter="movebtn($event)" @mouseleave="outbtn($event)">
            <el-menu default-active="kztqbuddsg" class="menu-index drag" :default-active="activeIndex_channel" :class="sidebarHeight > 510 ? '' : 'menu-index-list-array'" ref="leftcontent">
                <li class="left-user no-drag" v-for="v in header" :class="channelid.id == v.id ? 'first-on' : ''" @click="getColumn(v,$event)">
                    <div class="user-img" title="姓名-在线:正常">
                        <img :src="v.img" />
                    </div>
                </li>
                <li v-for="(v, index) in channeldata" class="el-menu-item" @click="getColumn(v)" :title="v.name" :class="`${v.id == channelid.id ? ' is-active' : ''}`">
                    <i class="iconfont no-drag" :class="v.id == channelid.id ? v.activeicon : v.icon"></i>
                    <span class="font">{{v.name}}</span>
                </li>
            </el-menu>
            <div class="menu-index drag mode" :class="sidebarHeight > 510 ? '' : 'menu-index-list-array'" ref="leftcontent" v-if="isshow"></div>
            <el-menu :collapse="$store.state.User.isSidebarNavCollapse" :default-active="getActive()" class="sidebar" v-if="leftSide">
                <div class="menu-container-header">
                    <div>
                        <span class="mr50"><i class="mr5" :class="channelid.icon"></i>{{ channelid.name }}</span>
                        <i class="el-icon-third-rollback hk-hover ml50" title="返回项目" @click="chooseProject" v-if="channelid.id == '3'"></i>
                    </div>
                </div>
                <div class="menu-container">
                    <template v-for="(v,index) in column_first">
                        <el-menu-item class="menu-work-item" :key="v.path" :index="v.path" @click="gotoRoute(v, v.name)" style="padding-left: 10px;">
                            <i class="iconfont" :class="v.meta.icon" :style=" { backgroundColor: v.meta.color || '', color: v.meta.color ? '#fff' : ''}"></i>
                            <span slot="title">{{ v.meta.name }}</span>
                        </el-menu-item>
                    </template>
                </div>
            </el-menu>
        </div>
        <div class="flex no-drag" @click.stop="flexbtn()" v-show="leftSide" >
            <i :class="isLeftNav ? 'el-icon-caret-right' : 'el-icon-caret-left'"></i>
        </div>
    </div>
</template>
<script>
export default {
    inject: ["reload"],
    data() {
        return {
            leftSide: true,
            header: [
                {
                    id: "1", //1
                    name: "个人中心", //个人中心
                    icon: "el-icon-user",
                    img: require("@i/index/logo.png")
                }
            ],
            channeldata: [
                {
                    id: "2", 
                    name: "消息", //消息中心
                    icon: "el-icon-third-message",
                    activeicon: "el-icon-third-message-fill"
                },
                {
                    id: "3", 
                    name: "项目", //项目
                    icon: "el-icon-third-jinriricheng",
                    activeicon: "el-icon-third-richeng"
                },
                {
                    id: "4", 
                    name: "日历", //日历
                    icon: "el-icon-third-securityscan",
                    activeicon: "el-icon-third-securityscan-fill"
                },
                {
                    id: "5", 
                    name: "动态", //动态
                    icon: "el-icon-third-RectangleCopy",
                    activeicon: "el-icon-third-gongju-"
                },
                {
                    id: "6", 
                    name: "团队", //团队
                    icon: "el-icon-third-container",
                    activeicon: "el-icon-third-container-fill"
                },
                {
                    id: "7", 
                    name: "我自己", //我自己
                    icon: "el-icon-third-weimingmingwenjianjia_gongzuotai",
                    activeicon: "el-icon-third-gongzuotai"
                }
            ],
            column_first: [], //所有的一级栏目内容
            sidebarHeight: "", //左侧栏目高度
            oldcannelid: {}, //上次点击的频道id
            oldcolumn: {}, //上次点击的栏目id
            isshow: false, //
            isLeftNav: false, // 是否伸缩折叠左侧导航栏 false不折叠 true折叠
        };
    },
    created() {
        let othis = this;
        var click_column = JSON.parse(localStorage.getItem("click-column"));
        //获取指定一级栏目内容（路由跳转）
        var column = othis.$store.state.User.sidebarMenu.filter(p => {
            return p.meta.pid == othis.activeIndex_channel;
        });
        othis.column_first = column; // 获取一级栏目
        othis.$store.dispatch('FETCH_firstColumn', othis.column_first);
        if (!click_column) { // 如果没有点击的栏目 则自动获取
            othis.gotoRoute(column[0], column[0].name);
            othis.isshow = true;
        }
        othis.leftSide = column[0].meta.leftSide ? false : true; // 是否需要左侧栏目
        //获取展示的频道
        othis.showchannel(othis.header, othis.sidebarMenu, "header");
        othis.showchannel(othis.channeldata, othis.sidebarMenu, "channeldata");
    },
    mounted() {
        this.sidebarHeight = document.getElementsByClassName('left-side')[0].clientHeight;
        this.getMainContent(this.sidebarHeight);
    },
    methods: {
        /**
         * 左侧导航默认聚焦
         */
        getActive() {
            let index;
            index = "/" + this.$route.path.split("/")[1];
            return index;
        },
        /**
         * 导航伸缩(点击)
         */
        flexbtn() {
            if (!this.isLeftNav) { // 目前是展开
                this.isLeftNav = true;
                this.$store.commit("toggleNavCollapse", true);
            } else { // 目前是折叠
                this.isLeftNav = false;
                this.$store.commit("toggleNavCollapse", false);
            }
        },
        /**
         * 导航伸缩(移入)
         * @param {Object} e 点击事件
         */
        movebtn(e) {
            if (this.isLeftNav) {
                var tagdom = document.getElementsByClassName("flex")[0];
                this.$store.commit("toggleNavCollapse", false);
                tagdom.style.right = "-213px";
            }
        },
        /**
         * 导航伸缩(移出)
         * @param {Object} e 点击事件
         */
        outbtn(e) {
            if (this.isLeftNav) {
                var tagdom = document.getElementsByClassName("flex")[0];
                this.$store.commit("toggleNavCollapse", true);
                tagdom.removeAttribute("style");
            }
        },
        /**
         * 返回选择项目
         */
        chooseProject(){
            this.$store.commit("SET_isChoose", true);
            localStorage.setItem('createList', JSON.stringify({isShow: "choose"}))
        },
        /**
         * 点击频道——显示一级栏目  (ok)
         * @param {Object} obj 点击的频道信息
         */
        getColumn(obj) {
            localStorage.setItem("channelid", JSON.stringify(obj));
            this.$store.dispatch("FETCH_channelId", obj);
        },
        /**
         * 点击栏目——路由跳转
         * @param {Object} router 点击的栏目的数据
         * @param {name} name 点击的栏目的名称
         */
        gotoRoute(router, name) {
            if (this.oldcolumn.name != name) {
                this.oldcolumn = this.$tools.clone({ name: name }, true)
                if (router.children) {
                    if (router.children[0].children) {
                        localStorage.setItem("click-column", JSON.stringify({ one: name,  two: router.children[0].name, three: router.children[0].children[0].name }) );
                    } else {
                        localStorage.setItem("click-column", JSON.stringify({ one: name, two: router.children[0].name }) );
                    }
                } else {
                    localStorage.setItem( "click-column", JSON.stringify({ one: name }));
                }
                this.$store.commit("setCrumbList", router);
                this.$router.push( { name }, onComplete => {}, onAbort => {} );
            }
        },
        /**
         * 获取展示的频道
         * @param {Array} arr 点击的栏目的数据
         * @param {Array} sidebarMenu 侧边栏的数组
         */
        showchannel(arr, sidebarMenu, type) {
            let newArr = [];
            for (var i = 0; i < arr.length; i++) {
                let channel = sidebarMenu.filter(p => {
                    return p.meta.pid == arr[i].id;
                });
                if (channel.length != 0) {
                    newArr.push(arr[i]);
                }
            }
            if (type == "header") {
                this.header = newArr;
            } else {
                this.channeldata = newArr;
            }
        },
        /**
         * 实时更改内容的高度 自适应
         * @param {Number} newheight 内容的高度
         */
        getMainContent(newheight) {
            let othis = this;
            let ischange = true;
            let leftheight = document.getElementsByClassName("left-side")[0].clientHeight;
            if (newheight != leftheight) {
                ischange = false;
            }
            if (!ischange) {
                this.sidebarHeight = leftheight;
                newheight = leftheight;
            }
            setTimeout(function() {
                othis.getMainContent(newheight);
                othis.isshow = false;
            }, 400);
        }
    },
    computed: {
        /**
         * 点击展示一级栏目
         */
        activeIndex_channel() {
            var channel = JSON.parse(localStorage.getItem("click-column")) ? JSON.parse(localStorage.getItem("click-column")).one : "projectList";
            var column = this.$store.state.User.sidebarMenu.filter(p => {
                return p.name == channel;
            });
            var activeIndex_channel = column.length > 0 ? column[0].meta.pid + "" : "3";
            return activeIndex_channel;
        },
        /**
         * 获取点击的频道信息
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
    watch: {
        /**
         * 监听点击的频道 (ok)
         */
        channelid(val) {
            let othis = this;
            if (othis.oldcannelid.id != val.id) {
                othis.oldcannelid = othis.$tools.clone(val, true);
                othis.column_first = [];
                let column = othis.$store.state.User.sidebarMenu.filter(p => {
                    return p.meta.pid == val.id;
                });
                if(column[0]){
                    othis.gotoRoute(column[0], column[0].name);
                    othis.leftSide = column[0].meta.leftSide ? false : true;
                }
                othis.column_first = column;
                othis.$store.dispatch("FETCH_firstColumn", othis.column_first);
            }
        },
    }
};
</script>
<style lang="scss" scoped>
.mode {
    position: absolute;
    height: 100%;
    left: 0;
}
</style>
