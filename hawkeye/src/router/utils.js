import store from '@/store'
import { DynamicRoutes } from '@/router.js'
/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */
export function recursionRouter(userRouter = [], allRouter = []) {
    let realRoutes = [];
    let obj = JSON.parse(localStorage.getItem("createList")) || {isShow: 'choose'};
    allRouter[0].meta.leftSide = obj.isShow == 'choose' ? true : false;
    for(let i = 0; i < allRouter.length; i++){
        realRoutes.push(allRouter[i]);
    }
    return realRoutes
}

/**
 *
 * @param {Array} routes 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
export function setDefaultRoute(routes) {
    routes.forEach((v, i) => {
        if (v.children && v.children.length > 0) {
            if (v.meta.pid != 'mmbhapuurs') {
                v.redirect = { name: v.children[0].name }
            }
            setDefaultRoute(v.children)
        }
    })
}