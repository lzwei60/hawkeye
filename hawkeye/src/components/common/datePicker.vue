<!--
    日期选择器/日期时间选择器 组件
    传参：
    1、readonly         完全只读        Boolean
    2、disabled         禁用        Boolean
    3、editable         文本框可输入        Boolean
    4、clearable        是否显示清除按钮        Boolean
    5、size             输入框尺寸         large, small, mini
    6、placeholder      非范围选择时的占位内容          
    7、startPlaceholder 范围选择时开始日期的占位内容
    8、endPlaceholder   范围选择时结束日期的占位内容
    9、type             显示类型        year/month/date/dates/ week/datetime/datetimerange/ daterange/monthrange
    10、format          显示在输入框中的格式        yyyy-MM-dd
    11、align           对齐方式        left, center, right
    12、popperClass     DatePicker 下拉框的类名         
    13、rangeSeparator  选择范围时的分隔符  
    14、defaultValue    可选，选择器打开时默认显示的时间
    15、defaultTime     范围选择时选中日期所使用的当日内具体时刻        数组，长度为 2，每项值为字符串，形如12:00:00，第一项指定开始日期的时刻，第二项指定结束日期的时刻，不指定会使用时刻 00:00:00
    16、valueFormat     可选，绑定值的格式。不指定则绑定值为 Date 对象
    17、name            原生属性
    18、unlinkPanels    在范围选择器里取消两个日期面板之间的联动        Boolean
    19、prefixIcon      自定义头部图标的类名        icon
    20、clearIcon       自定义清空图标的类名        icon
    21、validateEvent   输入时是否触发表单的校验        Boolean
    22、options         输入需要显示的快捷选项          Array          nowday/lastday/nowweek/lastweek/nowmonth/lastmonth/nowyear/lastyear
    23、change          用户确认选定的值时触发      function() 组件绑定值。格式与绑定值一致，可受 value-format 控制
    24、blur            当 input 失去焦点时触发     function() 组件实例
    25、focus           当 input 获得焦点时触发     function() 组件实例
-->
<template>
    <div class="block">
        <el-date-picker
            v-model="datavalue"
            :readonly="readonly"
            :disabled="disabled"
            :editable="editable"
            :clearable="clearable"
            :size="size"
            :placeholder="placeholder"
            :start-placeholder="startPlaceholder"
            :end-placeholder="endPlaceholder"
            :type="type"
            :format="format"
            :align="align"
            :popper-class="popperClass"
            :range-separator="rangeSeparator"
            :default-value="defaultValue"
            :default-time="defaultTime"
            :value-format="valueFormat"
            :name="name"
            :unlink-panels="unlinkPanels"
            :prefix-icon="prefixIcon"
            :clear-icon="clearIcon"
            :validate-event="validateEvent"
            :picker-options="options"
            @change="change"
            @blur="blur"
            @focus="focus"
        ></el-date-picker>
    </div>
</template>
<script>
export default {
    props:{
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        editable: {
            type: Boolean,
            default: true
        },
        clearable: {
            type: Boolean,
            default: true
        },
        size: {
            type: String
        },
        placeholder: {
            type: String,
            default: '请选择日期'
        },
        startPlaceholder: {
            type: String
        },
        endPlaceholder: {
            type: String
        },
        timeArrowControl:{
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'date'
        },
        format: {
            type: String,
            default: 'yyyy-MM-dd'
        },
        align: {
            type: String,
            default: 'left'
        },
        popperClass: {
            type: String
        },
        pickerOptions: {
            type: Array,
            default: () => {
                return []
            }
        },
        rangeSeparator: {
            type: String,
            default: '-'
        },
        defaultValue: {
            type: Date
        },
        defaultTime: {
            type: Array
        },
        valueFormat: {
            type: String,
            default: 'yyyy-MM-dd'
        },
        name: {
            type: String
        },
        unlinkPanels: {
            type: Boolean,
            default: false
        },
        prefixIcon: {
            type: String,
            default: 'el-icon-date'
        },
        clearIcon: {
            type: String,
            default: 'el-icon-circle-close'
        },
        validateEvent: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            datavalue: "",
            options: ""
        };
    },
    created: function(){
        if(this.type == "year" || this.type == "month" || this.type == "date" || this.type == "week" || this.type == "datetime"){
            var newshort = [];
            if(this.pickerOptions.indexOf("nowday") > -1){
                newshort.push({
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                })
            }
            if(this.pickerOptions.indexOf("lastday") > -1){
                newshort.push({
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                })
            }
            if(this.pickerOptions.indexOf("lastweek") > -1){
                newshort.push({
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        picker.$emit('pick', date);
                    }
                })
            }
            if(this.pickerOptions.indexOf("lastmonth") > -1){
                 newshort.push({
                    text: '一个月前',
                    onClick(picker) {
                        var date = new Date();
                        var year = date.getFullYear();
                        var month = date.getMonth()+1;
                        var day = date.getDate();
                        var days = new Date(year,month,0);
                        days = days.getDate();
                        var year2 = year;
                        var month2 = parseInt(month) - 1;
                        if (month2 == 0) {
                            year2 = parseInt(year2) - 1;
                            month2 = 12;
                        }
                        var day2 = day;
                        var days2 = new Date(year2, month2, 0);
                        days2 = days2.getDate();
                        if (day2 > days2) {
                            day2 = days2;
                        }
                        if (month2 < 10) {
                            month2 = '0' + month2;
                        };
                        date = year2 + '-' + month2 + '-' + day2;
                        picker.$emit('pick', date);
                    }
                })
            }
            if(this.pickerOptions.indexOf("lastyear") > -1){
                newshort.push({
                    text: '一年前',
                    onClick(picker) {
                        var date = new Date();
                        var year = date.getFullYear() - 1;    
                        var day = date.getDate();    
                        var month = date.getMonth()+1;  
                        if(month < 10){    
                            month = "0" + month;    
                        }  
                        if(day <10){    
                            day = "0" + day;    
                        }  
                        date =year + "-" + month + "-" + day;  
                        picker.$emit('pick', date);
                    }
                })
            }
        }else if(this.type == "datetimerange" || this.type == "daterange" || this.type == "monthrange"){
            var newshort = [];
            if(this.pickerOptions.indexOf("nowday") > -1){
                newshort.push({
                    text: '今天',
                    onClick(picker) {
                        var start,end;
                        start = end = new Date();
                        picker.$emit('pick', [start,end]);
                    }
                })
            }
            if(this.pickerOptions.indexOf("lastday") > -1){
                newshort.push({
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        var start, end;
                        start = end = date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', [start,end]);
                    }
                })
            }
            if(this.pickerOptions.indexOf("nowweek") > -1){
                newshort.push({
                    text: '本周',
                    onClick(picker) {
                        const date = new Date();
                        var start, end;
                        var weekday = date.getDay() || 7;
                        var data = date.getDate();
                        start = date.setDate(data - weekday + 1);
                        end = date.setDate(data - weekday + 7);
                        picker.$emit('pick', [start,end]);
                    }
                })
            }
            if(this.pickerOptions.indexOf("lastweek") > -1){
                newshort.push({
                    text: '上周',
                    onClick(picker) {
                        const date = new Date();
                        var start, end;
                        var weekday = date.getDay() || 7;
                        var data = date.getDate();
                        start = date.setDate(data - weekday + 1 -7);
                        end = date.setDate(data - weekday +7 -7);
                        picker.$emit('pick', [start,end]);
                    }
                })
            }
            if(this.pickerOptions.indexOf("nowmonth") > -1){
                newshort.push({
                    text: '本月',
                    onClick(picker) {
                        var date = new Date();
                        var start, end;
                        var year = date.getFullYear();
                        var month = date.getMonth()+1;
                        var days = new Date(year,month,0);
                        days = days.getDate();
                        start = date.setDate(1);
                        end = date.setDate(days);
                        picker.$emit('pick', [start,end]);
                    }
                })
            }
            if(this.pickerOptions.indexOf("lastmonth") > -1){
                newshort.push({
                    text: '上月',
                    onClick(picker) {
                        var date = new Date();
                        var start, end;
                        var year = date.getFullYear();
                        var month = date.getMonth()+1;
                        var day = date.getDate();
                        var days = new Date(year,month,0);
                        days = days.getDate();
                        var year2 = year;
                        var month2 = parseInt(month) - 1;
                        if (month2 == 0) {
                            year2 = parseInt(year2) - 1;
                            month2 = 12;
                        }
                        var day2 = day;
                        var days2 = new Date(year2, month2, 0);
                        days2 = days2.getDate();
                        if (day2 > days2) {
                            day2 = days2;
                        }
                        if (month2 < 10) {
                            month2 = '0' + month2;
                        };
                        day2 = parseInt(day2)-parseInt(day) + "1";
                        start = year2 + '-' + month2 + '-' + day2;
                        end = year2 + '-' + month2 + '-' + days2;
                        picker.$emit('pick', [start,end]);
                    }
                })
            }
            if(this.pickerOptions.indexOf("nowyear") > -1){
                newshort.push({
                    text: '今年',
                    onClick(picker) {
                        var date = new Date();
                        date.setDate(1);
                        date.setMonth(0);
                        var start = date,end;
                        var year = date.getFullYear();
                        end = year + '-' + 12 + '-' + 31;
                        picker.$emit('pick', [start,end]);
                    }
                })
            }
            if(this.pickerOptions.indexOf("lastyear") > -1){
                newshort.push({
                    text: '上年',
                    onClick(picker) {
                        var date = new Date();
                        var year = date.getFullYear() - 1;
                        var start,end;
                        start = year + '-' + 1 + '-' + 1;
                        end = year + '-' + 12 + '-' + 31;
                        picker.$emit('pick', [start,end]);
                    }
                })
            }
        }else if(this.type == "dates"){
            this.options = {};
        }
        if(this.pickerOptions.length != 0){
            this.options = {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: newshort
            }
        }
    },
    methods: {
        change: function(data){
            this.$emit('change',data);
        },
        blur: function(data){
            this.$emit('blur',data);
        },
        focus: function(data){
            this.$emit('focus',data);
        }
    }
};
</script>
