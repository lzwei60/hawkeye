import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import NotFound from './views/errorPage/404.vue'
import Forbidden from './views/errorPage/403.vue'
import Index from './views/home/home_index.vue'
import Login from './views/login/login_index.vue'
import Layout from './views/layout/category_index.vue'
import CreateTeam from './views/team/createTeam.vue'

/**
 * 重写路由的push方法
 */
const routerMethods = ['push', 'replace']
routerMethods.forEach(method => {
    const originalCall = Router.prototype[method]
    Router.prototype[method] = function (location, onResolve, onReject) {
        if (onResolve || onReject) {
            return originalCall.call(this, location, onResolve, onReject)
        }
        return originalCall.call(this, location).catch(err => err)
    }
})
/* 初始路由 */
export default new Router({
    routes: [
        {
            path: '/index',
            name: "index",
            component: Index
        },
        {
            path: '/login',
            name: "login",
            component: Login
        }
    ]
})
/* 准备动态添加的路由 */
export const DynamicRoutes = [
    {
        path: '',
        component: Layout,
        name: 'container',
        redirect: 'workIndex',
        meta: {},
        children: []
    },
    {
        path: '/createTeam',
        component: CreateTeam,
        name: 'createTeam',
        meta: {},
    },
    {
        path: '/403',
        component: Forbidden
    },
    {
        path: '*',
        component: NotFound
    }
]