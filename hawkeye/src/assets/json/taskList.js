export default {
    // 优先级列表
    priorityList: [
        {
            id: "1",
            value: "最高",
            color: "#de5f5f"
        }, {
            id: "2",
            value: "较高",
            color: "#f5941d"
        }, {
            id: "3",
            value: "普通",
            color: "#999"
        }, {
            id: "4",
            value: "最低",
            color: "#51b52f"
        },
    ],
    // 标签列表
    tagsList: [
        {
            name: "问题",
            color: "#de5f5f"
        }, {
            name: "待检验",
            color: "#f5941d"
        }, {
            name: "处理中",
            color: "#51b52f"
        }, {
            name: "需求",
            color: "#67a4dc"
        },
    ],
    // 项目组成员
    projectList: [
        {
            id: "1001",
            headImg: require("@i/face/担心.png"),
            name: "廖生",
            authority: "2", //团队权限 0 成员 1 管理员 2 超级管理员
        }, {
            id: "1002",
            headImg: require("@i/face/脸红.png"),
            name: "叶二姐",
            authority: "1", //团队权限 0 成员 1 管理员 2 超级管理员
        }, {
            id: '1003',
            headImg: require("@i/face/亲吻.png"),
            name: "廖三生",
            authority: "0", //团队权限 0 成员 1 管理员 2 超级管理员
        }
    ],
    // 项目列表
    itemList: [
        {
            id: "1",
            name: "项目一"
        }, {
            id: "2",
            name: "鹰眼"
        }, {
            id: "3",
            name: "项目二"
        }
    ],
    // 项目状态
    projectStateList: [
        {
            id: "1",
            value: "正常"
        }, {
            id: "2",
            value: "低风险"
        }, {
            id: "3",
            value: "高风险"
        }, {
            id: "4",
            value: "已失控"
        }
    ],
    // 权限列表
    authorityList: [
        {
            id: '0',
            name: "成员"
        },{
            id: "1",
            name: "管理员"
        }, {
            id: "2",
            name: "超级管理员"
        }
    ]
}