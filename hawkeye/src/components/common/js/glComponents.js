import alertAll from '../alert.vue'
import datePickerAll from '../datePicker.vue'
import dialogAll from '../dialog.vue'
import loadingAll from '../loading.vue'
import pageTableAll from '../pageTable.vue'
function plugin(Vue){
    if(plugin.installed){
        return;
    }

    Vue.component('alertAll',alertAll);
    Vue.component('datePickerAll',datePickerAll);
    Vue.component('dialogAll',dialogAll);
    Vue.component('loadingAll',loadingAll);
    Vue.component('pageTableAll',pageTableAll);
}

export default plugin
