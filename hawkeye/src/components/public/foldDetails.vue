<template>
    <div class="hs-fold-open">
        <div class="hs-fold-main">
            <div class="white-bg mt10 p10">
                <!-- 功能菜单 -->
                <el-row :gutter="10" class="mb10">
                    <el-col :lg="21" :md="24">
                        <div class="hk-hover line-15">
                            <i class="el-icon-arrow-left mr2 bold gray f22"></i>
                            <span class="f16 mb5">文件夹1</span>
                        </div>
                    </el-col>
                    <el-col :lg="3" :md="24">
                        <div class="hk-hover line-15">
                            <i class="el-icon-close right bold mr20 gray f22"></i>
                        </div>
                    </el-col>
                </el-row>
                <!-- 功能菜单 -->
                <el-row :gutter="10" class="mb10">
                    <el-col :lg="21" :md="24">
                        <el-upload action="" :on-success="(res) => handleChange(res)" :before-upload="beforeUpload" :show-file-list="false">
                            <el-button type="primary" class="el-icon-plus hk-mini-button" size="mini" title="上传文件" @click="">上传文件</el-button>
                        </el-upload>
                    </el-col>
                    <el-col :lg="3" :md="24">
                        <el-radio-group class="right" size="mini" v-model="listMethods">
                            <el-radio-button label="1"><i class="el-icon-third-appstore-fill no-drag"></i></el-radio-button>
                            <el-radio-button label="2"><i class="el-icon-third-unorderedlist no-drag"></i></el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            listMethods: "1", // 展示方式
        }
    },
    methods: {
        /**
         * 上传图片之前的回调 
         */
        beforeUpload(file) {
            const isLt20M = file.size / 1024 < 204000;
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 20MB!');
            }
            return isLt2M;
        },
        /**
         * 上传成功后的回调
         * @param {object} res 后台返回的图片数据
         */
        handleChange(res) {
            if (res.code == 1) {
                this.dataFile.push(res.data);
                this.$message.success(res.msg);
            } else {
                this.$message.error(res.msg);
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.hs-fold-open{
    position: absolute;
    left: 0;
    top: 0;
    background-color: #f9f9f9;
    width: 100%;
    height: 100%;
}
.hs-fold-open .hs-fold-main {
    transition: left 0.25s;
    padding: 0 10px 10px 10px;
    background: #f9f9f9;
    overflow: auto;
    position: relative;
}
</style>