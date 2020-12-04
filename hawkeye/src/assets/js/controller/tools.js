import { Loading } from 'element-ui'
var windowloading = ""; //全局变量
/**
 * 数组去重
 */
Array.prototype.unique = function() {
        var temp = {},
            arr = [],
            len = this.length;
        for (var i = 0; i < len; i++) {
            if (!temp[this[i]]) { // undefined 取反
                temp[this[i]] = "a";
                arr.push(this[i]);
            }
        }
        return arr;
    }
    //自定义常用函数
export default {
    /** 
     * 作用：清除空格
     * @param {*} arr 对象{} 清除空格的文字
     * @param {*} fn 函数 回调函数 
     */
    Trim_fn(arr, fn) {
        var result,
            str = arr.str,
            is_global = arr.is_global ? arr.is_global : "g";
        result = str.replace(/(^\s+)|(\s+$)/g, "");
        if (is_global.toLowerCase() == "g") {
            result = result.replace(/\s/g, "");
        }
        fn ? fn(result) : "";
        return result;
    },
    /** 
     * 作用：补齐0
     * @param {*} obj 字符串 只有一位数时，在前面补两个0 两位数时，补一个0
     */
    padleft0(obj) {
        if (obj.length == 1) {
            return obj.toString().replace(/^[0-9]{1}$/, "00" + obj);
        } else if (obj.length == 2) {
            return obj.toString().replace(/^[0-9]{2}$/, "0" + obj);
        }
    },
    /** 
     * 作用：一维数组获取下级值
     * @param {*} arr 对象{} 需要获取下级的一维数组对象
     * @param {*} fn 函数 回调函数
     */
    filterAray_fn(arr, fn) {
        var data = arr.data,
            module = arr.module,
            type = arr.type,
            pid = arr.pid ? arr.pid : "pid",
            tree = [];
        tree["sub"] = [];
        for (var i = 0; i < data.length; i++) {
            var name = data[i]["moduleName"];
            if (name == module) {
                tree["sup"] = data[i];
                //只获取当前栏目数据
                if (type) {
                    tree = data[i];
                    break;
                };
                //获取下级数据
                var id = data[i]["id"];
                for (var j = 0; j < data.length; j++) {
                    if (id == data[j][pid]) {
                        var obj = data[j];
                        tree["sub"].push(obj);
                    };
                };
                break;
            };
        };
        fn ? fn(tree) : "";
        return tree;
    },
    /** 
     * 作用：一维数组转树状结构
     * @param {*} arr 数组对象
     * @param {*} type 类型
     */
    filterArray(arr, type) {
        let childTree = [];
        let newarr = $.extend(true, {}, arr);
        if (type) {
            for (let key in arr) {
                if (arr[key].type == type) {
                    for (let i in newarr) {
                        if (newarr[i].type != type) {
                            let str = key.split(',')[key.split(',').length - 1];
                            if (i.indexOf(str) != -1 && i.split(',')[i.split(',').length - 1] != str) {
                                delete newarr[i]
                            }
                        }
                    }
                }
            }
            arr = newarr;
        }
        for (let key in arr) {
            if (arr[key].pid != 0) {
                if (arr[arr[key].pid] && arr[key].pid == arr[arr[key].pid].id) {
                    if (!arr[arr[key].pid].children) {
                        arr[arr[key].pid].children = [];
                    }
                    arr[arr[key].pid].children.push(arr[key])
                } else {
                    childTree.push(arr[key])
                }
            } else {
                childTree.push(arr[key])
            }
        }
        return childTree;
    },
    /**
     * 对象混合,将第二个参数开始的对象,混合到第一个对象中
     * @param {Object} obj 对象混合的参数
     */
    minxin(obj) {
        //当只有一个对象的时候返回
        if (arguments.length <= 1) return obj
            //获取参数对象列表，这里我们假设已经按照要求传过来的是对错
        var args = Array.from(arguments)
            //循环这个列表。
        for (var i = 1; i < args.length; i++) {
            for (var prop in args[i]) {
                //将列表中的每个属性，复制到obj中，也就是我们的第一个参数
                obj[prop] = args[i][prop]
            }
        }
        return obj
    },
    /**
     * 克隆一个对象
     * @param {Object || Array} 克隆的数据
     * @param {boolean} deep 是否深度克隆
     */
    clone(obj, deep) {
        //对象及数组深拷贝函数封装
        if(deep){
            var type = obj instanceof Array ? 'arr' : 'obj'
            var newObjOrArr = obj instanceof Array ? [] : {}
            if (type === 'arr') {
                newObjOrArr = JSON.parse(JSON.stringify(obj))
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        newObjOrArr[key] = typeof obj[key] === 'object' ? this.clone(obj[key],deep) : obj[key]
                    }
                }
            }
            return newObjOrArr
        }else{
            return obj;
        }
    },
    /**
     * 根据文件名后缀区分 文件类型
     * @param {String} fileName 文件名 
     */
    matchType(fileName) {
        // 后缀获取
        let suffix = "";
        // 获取类型结果
        let result;
        try {
            const fileArr = fileName.split(".");
            suffix = fileArr[fileArr.length - 1];
        } catch (err) {
            suffix = "";
        }
        // fileName无后缀返回 false
        if (!suffix) {
            result = false;
            return result;
        }
        // 图片格式
        const imgList = [
            "png",
            "jpg",
            "jpeg",
            "bmp",
            "gif",
            "svg",
            "icon",
            "ico"
        ];
        // 进行图片匹配
        result = imgList.some(function(item) {
            return item === suffix;
        });
        if (result) {
            result = "image";
            return result;
        }
        // 匹配txt
        const txtList = ["txt"];
        result = txtList.some(function(item) {
            return item === suffix;
        });
        if (result) {
            result = "txt";
            return result;
        }
        // 匹配 excel
        const excelList = ["xls", "xlsx"];
        result = excelList.some(function(item) {
            return item === suffix;
        });
        if (result) {
            result = "excel";
            return result;
        }
        // 匹配 word
        const wordList = ["doc", "docx"];
        result = wordList.some(function(item) {
            return item === suffix;
        });
        if (result) {
            result = "word";
            return result;
        }
        // 匹配 pdf
        const pdfList = ["pdf"];
        result = pdfList.some(function(item) {
            return item === suffix;
        });
        if (result) {
            result = "pdf";
            return result;
        }
        // 匹配 ppt
        const pptList = ["ppt", "pptx"];
        result = pptList.some(function(item) {
            return item === suffix;
        });
        if (result) {
            result = "ppt";
            return result;
        }
        // 匹配 视频
        const videoList = ["mp4", "m2v", "mkv"];
        result = videoList.some(function(item) {
            return item === suffix;
        });
        if (result) {
            result = "video";
            return result;
        }
        // 匹配 音频
        const radioList = ["mp3", "wav", "wmv"];
        result = radioList.some(function(item) {
            return item === suffix;
        });
        if (result) {
            result = "radio";
            return result;
        }
        // 其他 文件类型
        result = "other";
        return result;
    },
    /** 
     * 作用：向上找上级
     * @param {*} arr 对象{} id值
     * @param {*} fn 回调函数
     */
    Upsup_fn(arr, fn) {
        var id = arr.id,
            res = {},
            menu = layui.sessionData("menu").menu;
        $.each(menu, function(i, t) {
            if (id == t.id) {
                var level = t.level;
                if (level == 1) {
                    res["path"] = t.moduleName;
                } else if (level == 2) {
                    res["one"] = t.moduleName;
                    $.each(menu, function(it, tt) {
                        if (t.pid == tt.id) {
                            res["path"] = tt.moduleName;
                            return false;
                        }
                    });
                } else if (level == 3) {
                    res["two"] = t.moduleName;
                    $.each(menu, function(it, tt) {
                        if (t.pid == tt.id) {
                            res["one"] = tt.moduleName;
                            $.each(menu, function(itt, ttt) {
                                if (tt.pid == ttt.id) {
                                    res["path"] = ttt.moduleName;
                                    return false;
                                }
                            });
                            return false;
                        }
                    });
                }
                return false;
            };
        });
        fn ? fn(res) : "";
    },
    /** 
     * @param {*} 判断浏览器类型
     * @param {*} oneIE 字符串 是否为ie浏览器
     */
    myBrowser(oneIE) {
        var userAgent = navigator.userAgent, //取得浏览器的userAgent字符串
            isOpera = userAgent.indexOf("Opera") > -1, //判断是否Opera浏览器
            isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera, //判断是否IE11以下浏览器
            isIE11 = !!window.ActiveXObject || "ActiveXObject" in window, //判断是否IE11浏览器
            isFF = userAgent.indexOf("Firefox") > -1, //判断是否Firefox浏览器
            isSafari = userAgent.indexOf("Safari") > -1, //判断是否Safari浏览器
            isChrome = userAgent.indexOf("Chrome") > -1; //判断是否Chrome浏览器
        if (oneIE && isIE11) {
            return "IE";
        } else {
            if (isIE && !isIE11) {
                var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = IE10 = false,
                    reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                var fIEVersion = parseFloat(RegExp["$1"]),
                    IE55 = fIEVersion == 5.5,
                    IE6 = fIEVersion == 6.0,
                    IE7 = fIEVersion == 7.0,
                    IE8 = fIEVersion == 8.0,
                    IE9 = fIEVersion == 9.0,
                    IE10 = fIEVersion == 10.0;
                if (IE55) {
                    return "IE55";
                }
                if (IE6) {
                    return "IE6";
                }
                if (IE7) {
                    return "IE7";
                }
                if (IE8) {
                    return "IE8";
                }
                if (IE9) {
                    return "IE9";
                }
                if (IE10) {
                    return "IE10";
                }
            }
            if (isIE11) {
                return "IE11";
            }
        }
        //isIE end
        if (isFF) {
            return "FF";
        }
        if (isOpera) {
            return "Opera";
        }
        if (isSafari) {
            return "Safari";
        }
        if (isChrome) {
            return "Chrome";
        }
    },
    /** 
     * @param {*} 判断使用设备类型
     */
    myFacility() {
        var ua = navigator.userAgent;
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/), //平板模式
            isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/), //苹果模式
            isAndroid = ua.match(/(Android)\s+([\d.]+)/); //安卓模式
        if (ipad) {
            return "ipad";
        } else if (isIphone) {
            return "Iphone";
        } else if (isAndroid) {
            return "android";
        } else {
            return "browser";
        }
    },
    //刷新当前页
    /*
        1、在当前页面中注入inject: ['reload']
        2、在需要进行刷新的地方调用this.reload
    */
    /** 
     * 作用：通用加载
     * @param {*} arr 对象{} 判断id为1时，加载样式，否为 清除加载
     */
    hsLoad(arr) {
        if (arr.id == 1) {
            windowloading = Loading.service({
                lock: true,
                text: '加载中……',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        } else {
            windowloading.close()
        }
    },
    /** 
     * 作用：获取指定类名的所有样式
     * @param {*} sname    类名    
     */
    getstyle(sname) {
        for (var i = 0; i < document.styleSheets.length; i++) {
            var rules;
            if (document.styleSheets[i].cssRules) {
                rules = document.styleSheets[i].cssRules;
            } else {
                rules = document.styleSheets[i].rules;
            }
            for (var j = 0; j < rules.length; j++) {
                if (rules[j].selectorText == sname) {
                    return rules[j].style;
                }
            }
        }
    },
    /**
     * 作用：生成随机数
     * @param {*} len   String  判断是要生成几位数的随机数
     * @param {*} id   String      数字字母混合随机数：1         纯数字随机数：2       纯字母随机数：3
     */
    hsRandom(len, id) {
        var $chars, i;
        var number = '';
        if (id == '1') {
            $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
        } else if (id == '2') {
            $chars = '1234567890';
        } else if (id == '3') {
            $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoprstuvwxyz';
        }
        var maxPos = $chars.length;
        for (i = 0; i < len; i++) {
            number += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return number;
    },
    /** 
     * 作用：清除本地缓存
     */
    hsClear() {
        localStorage.clear();
    },

    loadJs(url, hasCallback) {
        var scriptElement = document.createElement('script');
        document.body.appendChild(scriptElement);
        var promise = new Promise((resolve, reject) => {
            scriptElement.addEventListener('load', e => {
                document.body.removeChild(scriptElement);
                if (!hasCallback) {
                    resolve(e);
                }
            }, false);
            scriptElement.addEventListener('error', e => {
                document.body.removeChild(scriptElement);
                reject(e);
            }, false);
            if (hasCallback) {
                window.____callback____ = function() {
                    resolve();
                    window.____callback____ = null;
                }
            }
        });
        if (hasCallback) {
            url += '&callback=____callback____'
        }
        scriptElement.src = url;
        return promise;
    },
    /**
     * 作用：阻止选中
     */
    stopchoose() {
        document.body.onselectstart = document.body.ondrag = () => { return false }
    },
    /**
     * 设置cookie
     */
    setCookie(name, value, day) {
        var exp = new Date();
        exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    /**
     * 获取cookie
     */
    getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    },
    /**
     * 删除cookie
     * @param {String} name 名称
     */
    delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}