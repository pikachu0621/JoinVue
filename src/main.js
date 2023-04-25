import Vue from 'vue'
import ElementUI , { Table } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './elm/theme/index.css'
import * as echarts from 'echarts'

import App from './App.vue'
import '@/build/root.css'

Vue.prototype.$echarts = echarts

const fixElTableErr = table => {
  const oldResizeListener = table.methods.resizeListener
  table.methods.resizeListener = function () {
    window.requestAnimationFrame(oldResizeListener.bind(this))
  }
}

fixElTableErr(Table)

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
})