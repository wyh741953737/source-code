import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.use(router)
Vue.config.productionTip = false


let instance = null;
function render() {
      instance = new Vue({
        render: h => h(App),
      }).$mount('#app') 
}


if(!window.__POWERED_BY_QIANKUN__) {
  render();
} else {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 子组件的协议
export async function bootstrap() {}
export async function mount(props) {
  render(props)
}
export async function unmount() {
  instance.$destory();
}
