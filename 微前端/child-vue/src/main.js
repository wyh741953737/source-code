import Vue from 'vue'
import App from './App.vue'
import router from './router'
import SingleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')

const appOptions = {
  el: '#vue', // 挂载到父应用中id为vue的标签中
  router,
  render: h => h(App)
}

const vueLifeCycle = SingleSpaVue({ // 传进去之后就包含了bootStrap， mount， unmount,  vueLiseCycle包含的就是这三个生命周期, SingleSpaVue包装了vue的属性
  Vue, 
  appOptions
})

// 协议接入，定好协议，父应用加载， 应用要打包成一个个lab给父应用使用
export const bootstrap = vueLifeCycle.bootstrap;
export const mount = vueLifeCycle.mount;
export const unmount = vueLifeCycle.unmount;
