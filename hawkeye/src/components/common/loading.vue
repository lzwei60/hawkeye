<!--
    1、在父组件中引入自定义加载组件
    2、传入图标img 和 文字 text
-->
<template>
    <div class="el-loading-mask" style="background-color: rgba(255, 255, 255, 0.8);" >
        <div class="el-loading-spinner">
            <img id="logo" :src="imgUlr">
            <p class="el-loading-text">{{tips}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        img:{
            type: String,
            default: ""
        },
        text:{
            type: String,
            default: "拼命加载中"
        }
    },
    data(){
        return{
            imgUlr: this.img,
            tips: this.text
        }
    },
    updated:function(){
        console.log(this.show)
    }
}
</script>
