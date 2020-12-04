<template>
    <div class="aside_top">
        <div class="one_nav" v-if="issecondshow && secondNav.length>0">
            <el-row>
                <el-col :span="24">
                    <el-menu :default-active="activeIndex_second + ''" class="thy-nav justify-content no-drag" mode="horizontal" @select="(key,indexPath) => goToRouter(key,indexPath,'second')">
                        <template v-for="item in secondNav">
                            <el-menu-item :index="item.name">
                                {{ item.meta.name }}
                            </el-menu-item>
                        </template>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
        <div class="hs-tabs-two" v-if="isthirdshow && thirdNav.length > 0">
            <el-menu :default-active="activeIndex_third" :active="activeIndex_third" class="thy-nav justify-content no-drag" mode="horizontal" @select="(key,indexPath) => goToRouter(key,indexPath,'third')" :collapse-transition="false">
                <template v-for="item1 in thirdNav">
                    <el-menu-item :index="item1.name">{{ item1.meta.name }}</el-menu-item>
                </template>
            </el-menu>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex_second: '',
            activeIndex_third: '',
            thirdNav: [], //三级栏目
            issecondshow: true, //展示二级栏目
            isthirdshow: true, //展示三级栏目
        };
    },
    created(){

    },
    methods: {
         /**
         * 点击二级三级栏目跳转
         * @param {String} key 选中菜单项的 index
         * @param {Array} indexPath 选中菜单项的 index path
         * @param {String} type 判断二级栏目还是三级栏目
         */
        goToRouter(key,indexPath,type){
            let object,newcolumn,index,data,name,clickcolumn;
            object = type == 'second' ? this.secondNav : this.thirdNav;
            newcolumn = object.filter(p => {
                return p.name == key;
            });
            index = object.indexOf(newcolumn[0]);
            data = object[index];
            name = data.name;
            clickcolumn = JSON.parse(localStorage.getItem('click-column'));
            if(type == 'second'){
                if (data.children) {
                    this.thirdNav = data.children;
                    if(clickcolumn.two != name){
                        clickcolumn.three = data.children[0].name + '';
                        this.$router.push({ name }, onComplete => { }, onAbort => { });
                    }
                } else {
                    this.thirdNav = [];
                    delete clickcolumn.three;
                    this.$router.push({ name }, onComplete => { }, onAbort => { });
                }
                clickcolumn.two = name;
            }else{
                clickcolumn.three = name;
                this.$router.push({ name }, onComplete => { }, onAbort => { });
            }
            localStorage.setItem('click-column', JSON.stringify(clickcolumn));

        },
    },
    computed: {
        //获取一级栏目
        crumbList() {
            return this.$store.getters.crumbList || [];
        },
        //获取二级栏目
        secondNav() {
            this.issecondshow = false;
            var sec_child = this.crumbList.children; // 二级是否存在
            this.$nextTick(function() {
                this.issecondshow = true;
                var click_column = JSON.parse(localStorage.getItem('click-column'));
                if (sec_child) {
                    this.activeIndex_second = click_column.two ? click_column.two + '' : sec_child[0].name + '';
                    var third_child = sec_child.filter(p => {
                        return p.name == this.activeIndex_second;
                    });
                    if (third_child[0] && third_child[0].children) {
                        this.thirdNav = third_child[0].children;
                    } else {
                        this.thirdNav = [];
                    }
                } else {
                    sec_child = [];
                    this.thirdNav = [];
                }
            });
            return sec_child || [];
        },
    },
    watch: {
        thirdNav(arr){
            if(arr[0]){
                this.isthirdshow = false;
                this.$nextTick(() => {
                    var click_column = JSON.parse(localStorage.getItem('click-column'));
                    this.isthirdshow = true;
                    this.activeIndex_third = click_column.three ? click_column.three + '' : arr[0].name + '';
                })
            }
        }
    }
}
</script>
