import router, { DynamicRoutes } from '@/router.js'
import { recursionRouter, setDefaultRoute } from '@/router/utils'
import dynamicRouter from '@/router/dynamic-router'

const state = {
    /* 获取token */
    get token() {
        return localStorage.getItem('token')
    },
    /* 设置token */
    set token(value) {
        localStorage.setItem('token', value)
    },
    /* 获取权限 */
    get power() {
        return JSON.parse(localStorage.getItem('Permission'));
    },
    /* 设置权限 */
    set power(value) {
        localStorage.setItem('Permission', JSON.stringify(value));
    },
    /* 获取锁屏值 */
    get lockKey() {
        return localStorage.getItem('lockKey')
    },
    /* 设置锁屏值 */
    set lockKey(value) {
        localStorage.setItem('lockKey', value)
    },
    /* 完整的路由表 */
    permissionList: null,
    /* 所有路由 */
    sidebarMenu: [],
    /* 导航菜单 */
    currentMenu: '',
    /* 当前active导航菜单 */
    isSidebarNavCollapse: false,
    /* 导航菜单是否折叠 */
    crumbList: '',
    /* 子导航列表 */
    /* 选中频道的id */
    channelid: {
        id: '3',
        name: '项目', //项目
        icon: 'el-icon-third-weimingmingwenjianjia_gongzuotai',
        activeicon: 'el-icon-third-gongzuotai'
    },
    /* 所有的一级栏目 */
    firstColumn: {},
    /*刷新的标识*/
    reload: 1,
    /* 工作台的标签页数组 */
    tagsArray: [
        {
            title: '我的看板',
            name: 'index',
            icon: 'el-icon-third-gongzuotai'
        }
    ],
    /* 工作台的标签页定位 */
    tagsValue: "index",
    /* 是否返回选择项目 */
    isChoose: false
}

const getters = {
    crumbList(state) {
        if (!state.crumbList) {
            state.crumbList = JSON.parse(localStorage.getItem('column'))
        }
        return state.crumbList
    },
    channelid(state) {
        var arr = JSON.parse(localStorage.getItem('channelid'));
        if (arr) {
            state.channelid = arr;
        } else {
            state.channelid = {
                id: '3',
                name: '项目', //项目
                icon: 'el-icon-third-weimingmingwenjianjia_gongzuotai',
                activeicon: 'el-icon-third-gongzuotai'
            };
        }
        return state.channelid;
    },
    keepLive(state){
        let container;
        let workIndex;
        state.keepLive = "";
        for(let i = 0, arr = state.permissionList; i < arr.length; i++){
            if(arr[i].name == 'container'){ container = arr[i]; break;}
        }
        for(let i = 0, arr = container.children; i < arr.length; i++){
            if(arr[i].name == 'workIndex'){ workIndex = arr[i]; break;}
        }
        let keepLive = [];
        state.keepLive = getList(workIndex.children,keepLive);
        return state.keepLive
    }  
}

let getList = function(arr,keepLive){
    for(let i = 0; i < arr.length; i++){
        if(arr[i].meta.keepAlive){
            keepLive.push(arr[i].name)
        }
        if(arr[i].children){
            getList(arr[i].children,keepLive)
        }
    }
    return keepLive
}

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    OUT_TOKEN(state) {
        state.token = '';
        localStorage.clear();
    },
    SET_PERMISSION(state, routes) {
        state.permissionList = routes
    },
    CLEAR_PERMISSION(state) {
        state.permissionList = null
    },
    SET_MENU(state, menu) {
        state.sidebarMenu = menu
    },
    CLEAR_MENU(state) {
        state.sidebarMenu = []
    },
    SET_CURRENT_MENU(state, currentMenu) {
        state.currentMenu = currentMenu
    },
    toggleNavCollapse(state, value) {
        state.isSidebarNavCollapse = value
    },
    setCrumbList(state, list) {
        localStorage.setItem('column', JSON.stringify(list));
        state.crumbList = list
    },
    SET_channelId(state, arr) {
        state.channelid = arr
    },
    SET_firstColumn(state, obj) {
        state.firstColumn = obj
    },
    SET_LOCKKEY(state, lock) {
        state.lockKey = lock
    },
    SET_RELOAD(state, reload) {
        state.reload = reload
    },
    SET_TAGS(state, array){
        state.tagsArray = array;
    },
    /**
     * 工作台标签页定位
     */
    SET_tagsValue(state, val){
        state.tagsValue = val;
    },
    /**
     * 返回选择项目
     */
    SET_isChoose(state, val){
        state.isChoose = val;
    }
}

const actions = {
    FETCH_TOKEN(commit, token) {
        commit.commit('SET_TOKEN', token)
    },
    async FETCH_PERMISSION({ commit, state }) {
        /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
        let routes = recursionRouter([], dynamicRouter)
        let MainContainer = DynamicRoutes.find(v => v.path === '')
        let children = MainContainer.children
        children.push(...routes)
        /* 生成左侧导航菜单 */
        commit('SET_MENU', children)

        setDefaultRoute([MainContainer])

        /*  初始路由 */
        let initialRoutes = router.options.routes

        /*  动态添加路由 */
        router.addRoutes(DynamicRoutes)

        /* 完整的路由表 */
        commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])

    },
    FETCH_channelId(commit, arr) {
        commit.commit('SET_channelId', arr)
    },
    FETCH_LOCKKEY(commit, lock) {
        commit.commit('SET_LOCKKEY', lock)
    },
    FETCH_RELOAD(commit, reload) {
        commit.commit('SET_RELOAD', reload)
    },
    FETCH_firstColumn(commit, obj) {
        commit.commit('SET_firstColumn', obj)
    },
    /**
     * 调用工作台标签页数组
     */
    FETCH_tagsArray(commit, arr){
        commit.commit('SET_TAGS', arr)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}