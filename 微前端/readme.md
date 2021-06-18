### 什么是微前端
将不同功能按照不同维度拆成多个子应用，通过主要应用来加载这些子应用，核心在于拆，拆完合

### 为什么要用
不同团队开发同一个技术栈不同，希望每个团队独立开发，项目中还有老的应用代码（嵌）

### 历史
2018年Single-SPA诞生，是一个用于前端微服务话的js前端解决方案（本身没有处理样式隔离，js执行隔离出现的冲突）主要实现了路由解除和应用加载
2019年，qiankun基于Single-SPA提供了更加开箱即用的API，（Single-SPA+sandobox+import-html-entry）接入简单，就像iframe一样简单，子应用可以独立构建，运行时加载，主应用完全解耦，技术栈无关，靠<协议>接入，子应用必须导出bootstrap，mount，unmount方法
iframe方法中的子应用切换路由时用户刷新页面导致问题（丢失）

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