<!--
    1、在父组件中引入Alert警告窗组件
    2、根据需要进行传值：
        1、title 标题
        2、type 类型
        3、description 内容
        4、closable 是否可关闭
        5、center 文字居中
        6、close-text 关闭按钮的自定义文本
        7、show-icon 是否显示图标
        8、effect 选择提供的主题
        9、@close 点击关闭后的执行函数
-->
<template>
    <el-alert
        :title="Atitle"
        :type="Atype"
        :description="Adescription"
        :closable="Aclosable"
        :center="Acenter"
        :close-text="AcloseText"
        :show-icon="AshowIcon"
        :effect="Aeffect"
        @close="close">
    </el-alert>
</template>
<script>
export default {
    props:{
        title:{
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "info"
        },
        description: {
            type: String,
            default: ""
        },
        closable: {
            type: Boolean,
            default: true
        },
        center: {
            type: Boolean,
            default: true
        },
        closeText: {
            type: String,
            default: ""
        },
        showIcon: {
            type: Boolean,
            default: false
        },
        effect: {
            type: String,
            default: "light"
        }
    },
    data(){
        return{
            Atitle: this.title,
            Atype: this.type,
            Adescription: this.description,
            Aclosable: this.closable,
            Acenter: this.center,
            AcloseText: this.closeText,
            AshowIcon: this.showIcon,
            Aeffect: this.effect
        }
    },
    methods: {
        close: function(){
            this.$emit('close');
        }
    }
}
</script>
