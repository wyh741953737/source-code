### 什么是微前端
将不同功能按照不同维度拆成多个子应用，通过主要应用来加载这些子应用，核心在于拆，拆完合

### 为什么要用
不同团队开发同一个技术栈不同，希望每个团队独立开发，项目中还有老的应用代码（嵌）

### 历史
2018年Single-SPA诞生，是一个用于前端微服务话的js前端解决方案（本身没有处理样式隔离，js执行隔离出现的冲突）主要实现了路由接入和应用加载
2019年，qiankun基于Single-SPA提供了更加开箱即用的API，（Single-SPA+sandobox+import-html-entry）接入简单，就像iframe一样简单，子应用可以独立构建，运行时加载，主应用完全解耦，技术栈无关，靠<协议>接入，子应用必须导出bootstrap，mount，unmount方法
iframe方法中的子应用切换路由时用户刷新页面导致问题（丢失）
iframe最大特性就是提供了浏览器原生的隔离方案，不论是样式隔离，js隔离都能呗完美解决，最大问题在于他的隔离性无法被突破，导致应用间上下文件无法被共享。
1：url不同步，浏览器刷新iframe，url丢失，前进后退无法使用
2：UI不同步，DOM结构不共享，全局上下文完全隔离，变量不共享


### 特点
基于URL来进行数据传递，但是传递消息弱
基于CustomEvent实现通信
基于props主子应用间通信，使用全局变量，redux进行通信

### 公共依赖
CDN， externals
webpack联邦模块

### 实现
子：1：npm i single-spa-vue
2: import SingleSpaVue from 'single-spa-vue'
3: 改造new Vue


### 微前端部署
主应用和微应用都是独立开发和部署，属于不同仓库
1：主微部署到一个服务器（ip端口一样）
    主：一级目录，微：2/3级目录
    微应用要部署在非跟目录，在微应用打包前做2件事
    1：必须配置webpack构建时的publicPath为目录名称
    2：history路由的微应用要设置base，值为目录名称，用于独立时候访问
    部署后注意点：1：activeRule不能和微应用的真实访问路径一样，否则主应用页面刷新会变成微应用页面
                 2: 微应用的真实访问路径就是微应用的entry，entry可以是相对路径
                 3：微应用的entry后面/不可省略，否则publicPath会设置错误，例如：子项访问路径 http://localhost:9090/app1，entry就是 http://localhost:9090/app1/
            
方案1：微应用都放在一个特殊文件夹下
需要设置微应用构建时候的publicPath和history模式的路由base，然后才能打包到对应目录
比如：
    qiankun-vue，路由base：无， pablicPath： /child/qiankun-vue/        真实访问路径： http://localhost:8000/child.qiankun-vue
    qiankun-vue-history 路由base:/child/qiankun-vue-history/    publicPath: /child/qiankun-vue-history/   真实访问路径  http://localhost:8000/child/qiankun-vue-history/

qiankun-vue微应用，路由配置
base：window.__POWERD_BY_QIANKUN__ ? '/qiankun-vue/' : /child/qiankun-vue/'

webpack打包publicPath配置vue.config.js
module.exports = {
    publicPath: '/child/qiankun-vue/'
}

注册时候函数
registerMicroApps([
    {
        name: 'vue-hash',
        entry: '/child/vue-hash/',
        container: '#container',
        activeRule: '/vue-hash'
    }
])