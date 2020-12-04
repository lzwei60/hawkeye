//自定义验证
var verify = {
    //用户名
    Username: function(rule, value, callback) {
        if(/[\u4E00-\u9FA5]/.test(value)) {
            return callback(new Error('用户名不能带中文'));//用户名不能带中文
        }else if(new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]._<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]").test(value)) {
            return callback(new Error('用户名不能有特殊符号'));//用户名不能有特殊符号
        }else if(!/^[a-zA-Z0-9]{3,16}$/.test(value)) {
            return callback(new Error('用户名必须3到16位数字和字母组合，且不能出现空格'));//用户名必须3到16位，且不能出现空格
        }else{
            callback();
        }
    },
    Nickname: function(rule, value, callback){ //value：表单的值、item：表单的DOM对象
        if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
          return callback(new Error('用户名不能有特殊字符'));
        }else if(/(^\_)|(\__)|(\_+$)/.test(value)){
          return callback(new Error('用户名首尾不能出现下划线\'_\''));
        }else if(/^\d+\d+\d$/.test(value)){
          return callback(new Error('用户名不能全为数字'));
        }else{
            callback();
        }
    },
    //请输入4位验证码
    Vercode: function(rule, value, callback) {
        if(value.length < 4) {	
            return callback(new Error('请输入正确的验证码'));
        }else{
            callback();
        }
    },
    //公司全称
    Company:function(rule, value, callback){
        if(!/^[\S]{6,50}$/.test(value)) {
            return callback(new Error('请输入公司全称'));
        }else{
            callback();
        }
    },
     //ip
    Ip:function(rule, value, callback){
        if(!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)) {
            return callback(new Error('请输入正确的ip'));
        }else{
            callback();
        }
    },
    //密码
    Pass: function(rule, value, callback) {
        if(!/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/.test(value)) {
            return callback(new Error('密码必须6到16位，且必须包含数字和字母'));//密码必须6到16位，且必须包含数字和字母
        }else{
            callback();
        }
    },
    //验证密码
    Pass2: function(rule, value, callback) {
        if($('input[name=pass]').val() != value) {
            return callback(new Error('密码输入不一致'));//密码输入不一致
        }else{
            callback();
        }
    },
    //限制中文
    Cn: function(rule, value, callback) {
        if(!/[\u4E00-\u9FA5]/.test(value)) {
            return callback(new Error('只能输入中文'));//只能输入中文
        }else{
            callback();
        }
    },
    //不能输入中文
    Notcn: function(rule, value, callback) {
        if(/[\u4E00-\u9FA5]/.test(value)) {
            return callback(new Error('不能输入中文'));//不能输入中文
        }else{
            callback();
        }
    },
    //限制英文
    En: function(rule, value, callback) {
        if(!/^([a-zA-Z\\s]+)$/.test(value)) {
            return callback(new Error('只能输入英文'));//只能输入英文
        }else{
            callback();
        }
    },
    //手机
    Phone: function(rule, value, callback) {
        if(!/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-9])|(17[\d]))\d{8}$/.test(value)) {
            return callback(new Error('请输入正确的手机号'));//请输入正确的手机号
        }else{
            callback();
        }
    },
    //电话
    Tel: function(rule, value, callback) {
        if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
            return callback(new Error('请输入正确的电话号码'));//请输入正确的电话号码
        }else{
            callback();
        }
    },
    //传真
    Fax: function(rule, value, callback) {
        if(!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
            return callback(new Error('请输入正确的传真号码'));//请输入正确的传真号码
        }else{
            callback();
        }
    },
    //身份证
    Identity: function(rule, value, callback) {
        if(!/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)) {
            return callback(new Error('请输入正确的身份证号码'));//请输入正确的身份证号码
        }else{
            callback();
        }
    },
    //图片格式
    Img: function(rule, value, callback){
        if(!/.(jpg|gif|jpeg)+$/.test(value)){
            return callback(new Error('请上传图片格式'));
        }else{
            callback();
        }
    },
    //只能输入小点后2位数
    Float: function(rule, value, callback){
        if(!/^\d+(\.\d{1,2})?$/.test(value)){
            return callback(new Error('可输入小数点后2位数'));
        }else{
            callback();
        }
    },
    //只能输入数字格式
    Number: function(rule, value, callback){
        if(!/^[0-9]+$/.test(value)){
            return callback(new Error('请输入数字格式'));
        }else{
            callback();
        }
    },
    //QQ
    Qq: function(rule, value, callback){
        if(!/^[1-9]\d{4,11}$/.test(value)){
            return callback(new Error('请输入数字格式'));
        }else{
            callback();
        }
    },
    //邮箱
    Email: function(rule, value, callback){
        if(!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)){
            return callback(new Error('请输入有效的邮箱'));
        }else{
            callback();
        }
    }
}
export default verify