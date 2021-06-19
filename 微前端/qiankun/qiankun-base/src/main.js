import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { registerMicroApps, start } from 'qiankun';
Vue.use(ElementUI);

const apps = [
  {
    name: 'vueApp',
    entry: '//localhost:1000', // 默认会加载这个html，解析里面的js动态执行，子应用要解决跨域，fetch
    fetch,
    container: '#vue',
    activeRule: '/tvue' // 激活规则
  },
  {
    name: 'reactApp',
    entry: '//localhost:2000', // 默认会加载这个html，解析里面的js动态执行，子应用要解决跨域，fetch
    fetch,
    container: '#react', // 容器名字
    activeRule: '/treact' // 激活规则路径
  }
]

registerMicroApps(apps); // 根据不同规则，加载不同应用
start({
  prefetch: false
}); //开启，如果不想预加载，可以关闭

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
