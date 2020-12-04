// 项目
const ProjectList = () => import('../views/project/projectList/list_index.vue') // 项目列表
const ProjectFile = () => import('../views/project/projectFile/file_index.vue') // 项目文件
const ProjectDoc = () => import('../views/project/projectDoc/doc_index.vue') // 项目文档
const ProjectEvolve = () => import('../views/project/projectEvolve/evolve_index.vue') // 项目进展
const ProjectUser = () => import('../views/project/projectUser/user_index.vue') // 项目成员
const ProjectRecycle = () => import('../views/project/projectRecycle/recycle_index.vue') // 项目回收站
// 日历
const Calendar = () => import('../views/calendar/calendar_index.vue') // 日历
// 汇报
// 动态
const Statistics = () => import('../views/statistics/statistics_index.vue') // 动态
// 团队
const TeamUser = () => import('../views/team/teamUser.vue') // 团队列表
// 我自己
const MyselfTask = () => import('../views/myself/myselfTask/task_index.vue') // 我自己任务
const MyselfCollect = () => import('../views/myself/myselfCollect/collect_index.vue') // 我自己收藏
const MyselfAgenda = () => import('../views/myself/myselfAgenda/agenda_index.vue') // 我自己日程
const MyselfReport = () => import('../views/myself/myselfReport/report_index.vue') // 我自己汇报
// 个人中心
const PersonCenter = () => import('../views/personCenter/person_index.vue') // 个人中心

/* 需要权限判断的路由 */
const dynamicRoutes = [
    {
        path: '/projectList',
        name: 'projectList',
        component: ProjectList,        
        meta: {
            leftSide: true,
            pid: '3',
            name: "项目列表",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/projectFile',
        name: 'projectFile',
        component: ProjectFile,        
        meta: {
            pid: '3',
            name: "项目文件",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/projectDoc',
        name: 'projectDoc',
        component: ProjectDoc,        
        meta: {
            pid: '3',
            name: "项目文档",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/projectEvolve',
        name: 'projectEvolve',
        component: ProjectEvolve,        
        meta: {
            pid: '3',
            name: "项目进展",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/projectUser',
        name: 'projectUser',
        component: ProjectUser,        
        meta: {
            pid: '3',
            name: "项目成员",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/projectRecycle',
        name: 'projectRecycle',
        component: ProjectRecycle,        
        meta: {
            pid: '3',
            name: "回收站",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/calendar',
        name: 'calendar',
        component: Calendar,        
        meta: {
            pid: "4",
            name: "日历",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/statistics',
        name: 'statistics',
        component: Statistics,        
        meta: {
            pid: "5",
            name: "统计",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/teamUser',
        name: 'teamUser',
        component: TeamUser,        
        meta: {
            pid: "6",
            name: "团队",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/myselfTask',
        name: 'myselfTask',
        component: MyselfTask,        
        meta: {
            pid: "7",
            name: "任务",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/myselfCollect',
        name: 'myselfCollect',
        component: MyselfCollect,        
        meta: {
            pid: "7",
            name: "收藏",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/myselfAgenda',
        name: 'myselfAgenda',
        component: MyselfAgenda,        
        meta: {
            pid: "7",
            name: "日程",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/myselfReport',
        name: 'myselfReport',
        component: MyselfReport,        
        meta: {
            pid: "7",
            name: "汇报",
            icon: "el-icon-third-renshiguanli"
        },
    }, {
        path: '/personCenter',
        name: 'personCenter',
        component: PersonCenter,        
        meta: {
            pid: "1",
            name: "个人中心",
            icon: "el-icon-third-renshiguanli"
        },
    }
]

export default dynamicRoutes
