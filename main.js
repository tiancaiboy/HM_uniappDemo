import Vue from 'vue'
import App from './App'
import api from './common/app'
import request from './until/request.js'

Vue.prototype.request = request
Vue.prototype.api = api

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
