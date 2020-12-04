<template>
    <div :class="{navCollapsed:isSidebarNavCollapse,software:issoftware}">
        <keep-alive>
            <sidebarNav />
        </keep-alive>
        <mainContent />
    </div>
</template>
<script>
import sidebarNav from "./common/sidebarContent/sidebar_nav.vue";
import mainContent from "./common/mainContent/index.vue";
export default {
    components: {
        sidebarNav,
        mainContent
    },
    computed: {
        "isSidebarNavCollapse": function() {
            return this.$store.state.User.isSidebarNavCollapse;
        },
        "issoftware":function(){
            // 获取localstrong
            if (localStorage.getItem('hsapp')) {
                return true;
            }else{
                return false;
            }

        }
    },
};
</script>
