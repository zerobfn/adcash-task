import Vue from 'vue'
import App from './App.vue'
import store from './store'

import VueSimpleAlert from "vue-simple-alert"
Vue.use(VueSimpleAlert)

import OutsideClick from '@/directives/OutsideClick'
Vue.directive('outside-click', OutsideClick)

import BaseSelectBox from '@/components/BaseSelectBox.vue'
Vue.component('base-select-box', BaseSelectBox)

import BaseComboBox from '@/components/BaseComboBox.vue'
Vue.component('base-combo-box', BaseComboBox)

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
