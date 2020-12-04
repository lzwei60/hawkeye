<!--
    弹窗组件 组件 <dialogAll></dialogAll>
    传参：
    1、show.sync(必填)         是否显示        Boolean         false
    2、url(必填)          组件路径        String
    3、title(必填)        组件标题        String
    4、shadebackground        更改遮罩层的背景颜色  
    5、shadeopacity         更改遮罩层的透明度
    6、width        Dialog 的宽度
    7、fullscreen           是否为全屏 Dialog
    8、top          Dialog CSS 中的 margin-top 值
    9、modal        是否需要遮罩层  有遮罩层的时候不允许拖拽，最小化，无遮罩层允许拖拽和最小化
    10、modalAppendToBody           遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
    11、appendToBody            Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
    12、lockScroll          是否在 Dialog 出现时将 body 滚动锁定
    13、customClass         Dialog 的自定义类名
    14、closeOnClickModal           是否可以通过点击 modal 关闭 Dialog
    15、closeOnPressEscape          是否可以通过按下 ESC 关闭 Dialog
    16、showClose           是否显示关闭按钮
    17、center              是否对头部和底部采用居中布局
    18、callback            是否需要添加beforeClose，如果要，则传入true
    19、beforeClose          关闭前的回调，会暂停 Dialog 的关闭      function(done)，done 用于关闭 Dialog       beforeClose在callback为true时有效
    20、id(必填)        弹窗id名称，唯一标识
    21、size        弹窗大小        Array       ["宽度","高度"] 
    22、position        位置定位位置    默认居中        Array       ["left","top"]      无遮罩层时有效
    23、number      限制弹窗弹出的最大数    number      默认5

-->
<template>
    <el-dialog 
        :id="id"
        :title="title" 
        :visible.sync="visible" 
        :width="width"
        :fullscreen="fullscreen"
        :top="top"
        :modal="modal"
        :modal-append-to-body="modalAppendToBody"
        :append-to-body="appendToBody"
        :lock-scroll="lockScroll"
        :custom-class="customClass"
        :close-on-click-modal="closeOnClickModal"
        :close-on-press-escape="closeOnPressEscape"
        :show-close="showClose"
        :center="center"
        @close="close" 
        :before-close="beforeClose"
        @mousedown.native="move($event)">
        <keep-alive>
            <component :is="plugs" :show.sync="visible" @onresultchange="onresultchange"></component>
        </keep-alive>
    </el-dialog>
</template>
<script>
export default {
    props: {
        id: {
            type: String
        },
        show: {
            type: Boolean,
            default: false
        },
        url: {
            type: String,
            default: ""
        },
        title: {
            type: String,
            default: "标题"
        },
        shadebackground: {
            type: String,
            default: "#000"
        },
        shadeopacity: {
            type: String,
            default: ".5"
        },
        width: {
            type: String,
            default: "50%"
        },
        fullscreen: {
            type: Boolean,
            default: false
        },
        top: {
            type: String,
            default: "15vh"
        },
        modal: {
            type: Boolean,
            default: true
        },
        modalAppendToBody: {
            type: Boolean,
            default: true
        },
        appendToBody: {
            type: Boolean,
            default: true
        },
        lockScroll: {
            type: Boolean,
            default: true
        },
        customClass: {
            type: String,
            default: ""
        },
        closeOnClickModal: {
            type: Boolean,
            default: true
        },
        closeOnPressEscape: {
            type: Boolean,
            default: true
        },
        showClose: {
            type: Boolean,
            default: true
        },
        center: {
            type: Boolean,
            default: false
        },
        callback: {
            type: Boolean,
            default: false
        },
        size: {
            type: Array
        },
        position: {
            type: Array
        },
        number: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            visible: this.show,//是否显示
            vmodal: "",// 遮罩层
            plugs: "",// 路径
            cdom: "", // 弹窗主体元素
            cwidth: "",// 弹窗宽度
            cheight: "",// 弹窗高度
            lwidth: "",// 浏览器宽度
            lheight: "",// 浏览器高度
            cleft: "",// 弹窗left值
            ctop: "",// 弹窗top值
            oldid: this.id,// 旧id
        };
    },
    mounted: function(){
        var othis = this;
        othis.lheight = window.screen.height || document.documentElement.clientHeight || window.innerHeight; //获取浏览器高度
        othis.lwidth =  window.screen.width || document.documentElement.clientWidth || window.innerWidth; //获取浏览器宽度
        var theader = document.getElementsByClassName("el-dialog__header");
        for(var i = 0; i < theader.length; i++){
            theader[i].style.cssText = "text-overflow:ellipsis; white-space:nowrap; overflow:hidden;";
        }
        var pdom = document.getElementById(othis.id).childNodes[0].childNodes;
        var newDom = document.createElement('span');
        if(othis.fullscreen){
            var maximize = '<button type="button" style="right:40px;top:15px;" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-third-fullscreen-exit"></i></button><button type="button" style="right:60px;top:15px;" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-third-line"></i></button>';
        }else{
            var maximize = '<button type="button" style="right:40px;top:15px;" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-third-fullscreen"></i></button><button type="button" style="right:60px;top:15px;" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-third-line"></i></button>';
        }
        pdom[0].appendChild(newDom);
        newDom.innerHTML = maximize;
        //有遮罩层的时候不允许最小化
        if(othis.modal || othis.fullscreen){
            let line = document.getElementsByClassName("el-icon-third-line");
            for(let i = 0; i < line.length; i++) {
                line[i].style.display = 'none';
            }
        }
    },
    watch: {
        show (val) {
            var isshow = 0;
            if(!val){
                return false;
            }
            if(this.url != ""){
                var myComponent = resolve => require.ensure([], () => resolve(require('@/' + this.url + '.vue')));
                this.plugs = myComponent;
            }
            let pdm = document.getElementsByClassName("el-dialog");
            for(var i = 0; i < pdm.length; i++){
                if(pdm[i].parentNode.style.display != 'none'){
                    isshow ++;
                }
            }
            if(isshow > this.number){
                this.$message({
                    type: "error",
                    message: "当前弹窗已达最大数"
                })
                this.$emit('update:show', false)
            }else{
                var othis = this;
                othis.visible = othis.show;
                othis.vmodal = othis.$tools.getstyle(".v-modal");
                othis.vmodal.backgroundColor = othis.shadebackground;
                othis.vmodal.opacity = othis.shadeopacity;
                var pdom = document.getElementById(othis.id);
                othis.cdom = pdom.childNodes[0];
                if(othis.size){
                    othis.cwidth = othis.size[0] == '' ? '' : othis.size[0];
                    othis.cheight = othis.size[1] == '' ? '' : othis.size[1];
                    othis.cdom.style.width = othis.cwidth+'px';
                    othis.cdom.style.height = othis.cheight+'px';
                }else{
                    if(!othis.fullscreen){
                        othis.cdom.style.width = othis.cwidth = othis.lwidth/2;
                    }else{
                        othis.cheight = othis.lheight;
                        othis.cdom.style.width = '100%';
                        othis.cdom.style.height = '';
                        othis.cdom.style.marginTop = '';
                    }
                }
                //没有遮罩层
                if(!othis.modal){
                    pdom.classList.remove("el-dialog__wrapper");
                    if(othis.position){
                        othis.cleft = othis.position[0];
                        othis.ctop = othis.position[1];
                    }else{
                        othis.ctop = (othis.lheight - othis.cheight) / 2,othis.cleft = (othis.lwidth - othis.cwidth) / 2;
                    }   
                    othis.cdom.style.position = "fixed";
                    othis.cdom.style.top = othis.ctop + 'px';
                    othis.cdom.style.left = othis.cleft + 'px';
                    othis.cdom.style.marginTop = "0px";
                }
                othis.cdom.style.overflow = "auto";
            }
        }
    },
    methods: {
        /**
         * 右上角关闭弹窗
         */
        close(){
            this.vmodal.backgroundColor = "#000";
            this.vmodal.opacity = ".5";
            this.$emit('update:show', false)
        },
        /**
         * 右上角关闭弹窗之前的回调
         */
        beforeClose(done){
            if(this.callback){
                this.$emit('beforeClose', done)
            }else{
                done();
            }
        },
        /**
         * 移动
         */
        move(e){
            var othis = this;
            var parentdom = e.target;
            var maxindex = 1;
            // 暂未修改
            if(othis.id != othis.oldid){
                var elDom = document.getElementsByClassName("el-dialog");
                for(var i = 0; i < elDom.length; i++){
                    console.log(elDom[0].parentNode)
                    if(elDom[0].parentNode.style.zIndex > maxindex){
                        maxindex = elDom[0].parentNode.style.zIndex;
                    }
                }
                document.getElementById(othis.id).style.zIndex =  parseInt(maxindex) + parseInt(document.getElementsByClassName("el-dialog").length);
                othis.oldid = othis.id;
            }
            if(parentdom.className.includes("el-dialog__header")){
                if(!othis.modal){
                    var pdom = parentdom.parentNode;
                    var disX = e.clientX - pdom.offsetLeft;
                    var disY = e.clientY - pdom.offsetTop;
                    document.onmousemove = (e) => {
                        if(parentdom.childNodes[2].style.display != 'none'){
                            othis.ctop =  e.clientY - disY;
                            othis.cleft = e.clientX - disX;
                            pdom.style.top = othis.ctop +"px";
                            pdom.style.left = othis.cleft +"px";
                        }else{
                            pdom.style.top = e.clientY - disY +"px";
                            pdom.style.left = e.clientX - disX +"px";
                        }
                    }
                    document.onmouseup = (e) => {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    }
                }
            }else if(parentdom.className.includes("el-icon-third-fullscreen") || parentdom.className.includes("el-icon-third-fullscreen-exit")){
                othis.maximize(parentdom,e);
            }else if(parentdom.className.includes("el-icon-third-line")){
                othis.minimize(e);
            }
        },
        /**
         * 放大缩小
         */
        maximize(dom,e){
            var othis = this;
            var pdom = document.getElementById(othis.id)
            var mindom = e.target.parentNode.nextSibling;
            if(mindom.style.display == 'none'){
                othis.cdom.childNodes[1].style.display = "block";
                mindom.style.display = 'block';
                othis.cdom.style.position = "fixed";
                othis.cdom.style.bottom = '';
                othis.cdom.style.width = othis.cwidth + 'px';
                othis.cdom.style.height = othis.cheight + 'px';
                othis.cdom.style.top = othis.ctop + 'px';
                othis.cdom.style.left = othis.cleft + 'px';
            }else{
                if(dom.className == "el-dialog__close el-icon el-icon-third-fullscreen"){
                    othis.cheight = pdom.childNodes[0].clientHeight;
                    othis.cdom.style.width = othis.lwidth + 'px';
                    othis.cdom.style.height = '100%';
                    othis.cdom.style.top = 0 + 'px';
                    othis.cdom.style.left = 0 + 'px';
                    othis.cdom.style.margin = 0 + 'px';
                    dom.classList.remove("el-icon-third-fullscreen");
                    dom.classList.add("el-icon-third-fullscreen-exit");
                }else if(dom.className == "el-dialog__close el-icon el-icon-third-fullscreen-exit"){
                    othis.cdom.style.margin = '';
                    if(othis.modal){
                        if(othis.fullscreen){
                            othis.cdom.style.width = '500px';
                            othis.cdom.style.height = '500px';
                        }else{
                            othis.cdom.style.width = othis.cwidth + 'px';
                            othis.cdom.style.height = '';
                        }
                        othis.cdom.style.top = '';
                        othis.cdom.style.left = '';
                        othis.cdom.style.marginTop = '15vh';
                    }else{
                        othis.cdom.style.width = othis.cwidth + 'px';
                        othis.cdom.style.height = othis.cheight + 'px';
                        othis.cdom.style.top = othis.ctop + 'px';
                        othis.cdom.style.left = othis.cleft + 'px';
                    }
                    dom.classList.add("el-icon-third-fullscreen");
                    dom.classList.remove("el-icon-third-fullscreen-exit");
                }
            }
        },
        //最小化
        minimize(e){
            var othis = this,minindex = 0,mindom = [];
            var line = document.getElementsByClassName("el-icon-third-line");
            othis.cheight = document.getElementById(othis.id).childNodes[0].clientHeight;
            othis.cdom.childNodes[1].style.display = "none";
            e.target.parentNode.style.display = "none";
            for(var i = 0; i < line.length; i++){
                line[i].parentNode.style.display == 'none'
                if(line[i].parentNode.style.display == 'none'){
                    minindex ++;
                    mindom.push(line[i].parentNode);
                }
            }
            if(minindex * 210 > othis.lwidth){
                for(var i = 1; i < mindom.length; i++){
                    mindom[i].parentNode.parentNode.style.left = '0px';
                    mindom[i].parentNode.parentNode.style.bottom = 55 * i + 'px';
                } 
            }else{
                othis.cdom.style.left = minindex == 1 ? 0 : (minindex-1) * 205 + 'px';
                othis.cdom.style.bottom = '0px';
            }
            othis.cdom.style.margin = 0 + 'px';
            othis.cdom.style.position = "absolute";
            othis.cdom.style.top = '';
            othis.cdom.style.width = '200px';
            othis.cdom.style.height = '55px';
        },
        //获取自定义按钮的值
        onresultchange(val){
            this.visible = val;
        }
    }
}
</script>
<style scoped>
.dialog_title{
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    width: 80%;
}
</style>
