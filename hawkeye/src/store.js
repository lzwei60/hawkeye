import Vue from 'vue'
import Vuex from 'vuex'
import User from './store/modules/user' //用户模块
import Common from './store/modules/common' //通用模块
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        User,
        Common
    }
})