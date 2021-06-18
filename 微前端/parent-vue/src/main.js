import Vue from 'vue'
import App from './App.vue'
import {registerApplication} from 'single-spa-vue';
Vue.config.productionTip = false

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  })
}
registerApplication('myVueApp', 
async () => {
  console.log('加载模块')
  await loadScript(`http://localhost:1000/js/chunk-vendors.js`);
  await loadScript(`http://localhost:1000/js/app.js`);
  return window.singleVue
}, 
location => location.pathname.startsWith('/vue')), // 用户切换到/vue的路径下，我需要加载刚才定义的子应用
// {a:1} //传给子应用的参数
new Vue({
  render: h => h(App),
}).$mount('#app')

// 我们需要父应用加载子应用，bootstrap，mount，unmount
