<template>
    <div class="white-bg mt10 p10">
        <choose-list v-if="isShow == 'choose'" @function="createPorject"></choose-list>
        <function-list v-else></function-list>
    </div>
</template>
<script>
import chooseList from './choose_list.vue';
import functionList from './function_list.vue';
export default {
    inject: ["reload"],
    components: {
        chooseList,
        functionList
    },
    data() {
        return{
            isShow: "",
        }
    },
    created(){
        let obj = JSON.parse(localStorage.getItem("createList")) || {};
        this.isShow = obj.isShow || 'choose';
        this.$store.commit("SET_isChoose", this.isShow == "choose" ? true : false);
    },
    computed: {
        /**
         * 获取一级栏目
         */
        firstColumn() {
            return this.$store.state.User.firstColumn;
        },
        /**
         * 是否返回选择项目
         */
        isChoose() {
            return this.$store.state.User.isChoose;
        }
    },
    methods: {
        /**
         * 进入项目
         */
        createPorject(type){
            this.firstColumn[0].meta.leftSide = false;
            localStorage.setItem('createList', JSON.stringify({isShow: type}))
            this.isShow = type;
            this.reload();
        },
    },
    watch: {
        isChoose(val){
            if(val){
                this.firstColumn[0].meta.leftSide = true;
                this.reload();
            }
        }
    }
}
</script>