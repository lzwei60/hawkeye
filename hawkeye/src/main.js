import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./store.js";
Vue.config.productionTip = false;
/*--------------------引入全局js--------------------------*/
//引用外部全局js
import verify from './assets/js/controller/verify.js' //验证js
Vue.prototype.verify = verify;
import common from './assets/js/controller/common.js' //md5 js
Vue.prototype.common = common;
import tools from './assets/js/controller/tools.js' //工具 js
Vue.prototype.$tools = tools;
import request from './assets/js/controller/axios.js' //axios js
Vue.prototype.$axios = request;
import datetime from './assets/js/controller/date.js' //日期 js
Vue.prototype.datetime = datetime;
/*--------------------注册全局组件------------------------*/
//引入element-ui组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
import '@c/admin.scss'
//引入第三方图标库
import './assets/icon/iconfont.css'
// 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//引入全局common的全局组件
import glComponents from './components/common/js/glComponents.js'
Vue.use(glComponents)
/* ---------------------路由 start------------------------- */
router.beforeEach((to, from, next) => {
    if (!store.state.User.token) {
        if ( to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth) ) {
            next()
        } else {
            next({ path: '/index' })
        }
    } else {
        if (!store.state.User.permissionList) {
            store.dispatch('FETCH_PERMISSION').then(() => { next({ path: to.path }) })
        } else {
            if (to.path !== '/index') {
                next()
            } else {
                next(from.fullPath)
            }
        }
    }
})
/* -------------------路由 end---------------------------- */
/* -------------------自定义聚焦指令 start----------------- */
Vue.directive('focus', function(el){
    el.querySelector('input').focus();
})
/* -------------------自定义聚焦指令 end------------------- */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");