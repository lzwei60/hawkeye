/**
 * 作用：时间戳转指定结构日期
 * @param {*} time 需要转为日期的时间戳
 * @param {*} date 需要转化的指定日期格式
 */
function forwardDate(time, date) {
    //获取输入的时间戳并转为年月日时分秒;
    var tt = new Date(time/1000*1000);
    var y = tt.getFullYear();
    var m = tt.getMonth() + 1;
    var d = tt.getDate();
    var t = tt.getHours();
    var mm = tt.getMinutes();
    var s = tt.getSeconds();
    //给月,日,时,分,秒为个数时补0;
    m = (m < 10) ? ("0" + m) : m;
    d = (d < 10) ? ("0" + d) : d;
    t = (t < 10) ? ("0" + t) : t;
    mm = (mm < 10) ? ("0" + mm) : mm;
    s = (s < 10) ? ("0" + s) : s;
    //判断输入格式,并按输入格式输出;
    if (date.indexOf("-") != -1 && date.indexOf(":") != -1) {
        return y + "-" + m + "-" + d + "     " + t + ":" + mm + ":" + s;
    } else if (date.indexOf("-") != -1) {
        return y + "-" + m + "-" + d;
    } else if (date.indexOf("/") != -1 && date.indexOf(":") != -1) {
        return y + "/" + m + "/" + d + "/" + t + ":" + mm + ":" + s;
    } else if (date.indexOf("/") != -1) {
        return y + "/" + m + "/" + d;
    } else if (date.indexOf("年") != -1 && date.indexOf(":") != -1) {
        return y + "年" + m + "月" + d + "日" + t + ":" + mm + ":" + s;
    } else if (date.indexOf("年") != -1) {
        return y + "年" + m + "月" + d + "日";
    } else {
        alert("格式输入有误");
    }
}
/**
 * 作用: 日期转化为时间戳
 * @param {*} date 日期 yyyy-MM-dd HH:ss:mm
 */
function timestamp(date) {
    //将传入的数据进行转换;
    // var yd = date.slice(0, 10).replace(/[\u4e00-\u9fa5]/g, "-");
    // var time = date.slice(10).replace(/[\u4e00-\u9fa5-/]/g, ":");
    //获取输入的时间并转为时间戳;
    return new Date(Date.parse(date)).getTime() / 1000;
}
/**
 * 作用: 判断当前日期是属于哪个时间区间
 * @param {*} date 日期 
 */
function thinktime(date) {
    //将传入的数据进行转换;
    var yd = date.slice(0, 10).replace(/[\u4e00-\u9fa5]/g, "-");
    //获取输入的年月日
    var ipt = new Date(yd);
    var years = ipt.getFullYear();
    var months = ipt.getMonth() + 1;
    var days = ipt.getDate();
    //将输入的日期转换为周
    var firstDay = new Date(years, 0, 1);
    var dayOfWeek = firstDay.getDay();
    var spendDay = 1;
    if (dayOfWeek != 0) {
        spendDay = 7 - dayOfWeek + 1;
    }
    firstDay = new Date(years, 0, 1 + spendDay);
    var d = Math.ceil((ipt.valueOf() - firstDay.valueOf()) / 86400000);
    var result = Math.ceil((d + 1) / 7) + 1;
    //将当前日期转换为年月日;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    //将当前日期转换为周;
    var firstDays = new Date(year, 0, 1);
    var dayOfWeeks = firstDays.getDay();
    var spendDays = 1;
    if (dayOfWeeks != 0) {
        spendDays = 7 - dayOfWeeks + 1;
    }
    firstDays = new Date(year, 0, 1 + spendDays);
    var ds = Math.ceil((date.valueOf() - firstDays.valueOf()) / 86400000);
    var results = Math.ceil((ds + 1) / 7) + 1;
    //3.6根据输入的年月日与当前的年月日进行判断输出;
    if (day - days == 0) {
        return "今天";
    } else if (day - days == 1) {
        return "昨天";
    } else if (day - days == -1) {
        return "明天";
    } else if (results - result == 0) {
        return "本周";
    } else if (results - result == 1) {
        return "上周";
    } else if (results - result == -1) {
        return "下周";
    } else if (month - months == 0) {
        return "本月";
    } else if (month - months == 1) {
        return "上月";
    } else if (month - months == -1) {
        return "下月";
    } else {
        return "日期输入超出上下限";
    }
}
/**
 * 作用：格式化日期
 * @param {*} date 日期字符串 
 * @param {*} bool 是否需要时分秒 true / false
 */
function formatdate(date, bool) {
    //4.1将传入的字符串分段切割并转换
    var b = date.slice(0, 10).replace(/[\u4e00-\u9fa5]/g, "-");
    var c = date.slice(10).replace(/[\u4e00-\u9fa5-/]/g, ":");
    //4.2获取输入的年月日时分秒;
    var tt = new Date(b + c);
    var y = tt.getFullYear();
    var m = tt.getMonth() + 1;
    var d = tt.getDate();
    var t = tt.getHours();
    var mm = tt.getMinutes();
    var s = tt.getSeconds();
    //4.3给月,日,时,分,秒为个数时补0;
    m = (m < 10) ? ("0" + m) : m;
    d = (d < 10) ? ("0" + d) : d;
    t = (t < 10) ? ("0" + t) : t;
    mm = (mm < 10) ? ("0" + mm) : mm;
    s = (s < 10) ? ("0" + s) : s;
    //4.4根据布尔值判断输出格式;
    if (bool) {
        return y + "-" + m + "-" + d + " " + t + ":" + mm + ":" + s;
    } else {
        return y + "-" + m + "-" + d;
    }
}
/**
 * 作用： 判断传入的日期的某个月的天数
 * @param {*} date 日期 
 */
function howmanydays(date) {
    //5.1将输入的日期转换格式;
    var yd = date.slice(0, 10).replace(/[\u4e00-\u9fa5]/g, "-");
    //5.2获取输入的年月;
    var tt = new Date(yd);
    var y = tt.getFullYear();
    var m = tt.getMonth() + 1;
    //5.3根据输入的年月判断天数;
    if (((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) && m == 2) {
        return 29;
    } else if (m == 2) {
        return 28;
    }
    switch (m) {
        case 1:
            return 31;
            break;
        case 3:
            return 31;
            break;
        case 4:
            return 30;
            break;
        case 5:
            return 31;
            break;
        case 6:
            return 30;
            break;
        case 7:
            return 31;
            break;
        case 8:
            return 31;
            break;
        case 9:
            return 30;
            break
        case 10:
            return 31;
            break;
        case 11:
            return 30;
            break;
        case 12:
            return 31;
            break;
        default:
            return '非法的状态码';
    }
}
/**
 * 作用：正常日期下，转换日期格式
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
        date = time;
    } else {
        if (typeof time === "string" && /^[0-9]+$/.test(time)) {
            time = parseInt(time);
        }
        if (typeof time === "number" && time.toString().length === 10) {
            time = time * 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
            return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        if (result.length > 0 && value < 10) {
            value = "0" + value;
        }
        return value || 0;
    });
    return time_str;
}
export default {
    forwardDate,
    timestamp,
    thinktime,
    formatdate,
    howmanydays,
    parseTime
}