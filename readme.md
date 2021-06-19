以下都可以import XX from umi
dynamic: 动态加载组件，常用场景：组件体积大不适合计入bundle以免首屏加载慢
Prompt,
withRouter可以获取到history，location， match对象
useHistory, 获取istory的hooks
useLocation
useParams 获取params对象，params为动态路由，例如/user/:id里的参数键值对
useRouteMatch获取当前路由匹配信息，match.params



PWA: 离线缓存，基于https协议，能够被搜索引擎搜索到，在不打开页面前提下推送新的消息
能够将web像app一样添加到桌面
常更新：一旦web网页有什么改动就能立马在用户端体现出来

使用：
1： public文件下添加manifest.json配置文件
2：html中引入 <link rel="manifest" href="/manifest.json">
3 在public中新建serviceWork.js，serviceWorker要加载到head标签中，这个文件可以在create-react-app时生成，该文件主要用来增加缓存的监听方式
post请求不会被缓存且会报错，在service-worker.js文件里做出路：
Service Worker可以截获任何异步请求，因此我们处理POST请求没有问题。缺少的是在离线时缓存它们并检索相应的响应的可能性。




redux-persits数据持久化，也是将redux数据保存到本地localstorage只是redux-persits封装好了，你可以直接在redux中取

redux页面刷新。redux状态变为初始化状态


### ServiceWorker
离线体验，消息推送，ServiceWorker要作用域https
1: ServiceWorker注册
2：ServiceWorker作用域，register2个参数，'/sw.js', {scope:'/'}  scope是作用域，不指定默认为/根目录
3: ServiceWorker 作用域污染
比如： A页面： https://www.test.com/a  A页面下的scope是/a/
      B页面： http://www.test.com/a/b  B页面下scope是/a/b/
      A页面的Service Worker污染了B页面

    
不同架构：
全局一个ServiceWorker
多个ServiceWorker： 维护上和页面关联，灵活，缺点：


ServicerWorker触发更新
1：浏览器每24小时更新
2：注册新的ServiceWorker，带上版本号，比如: /sw.js?v=20200908
3:手动更新registration.update（）
4：逐字逐句比对sw新旧文件，有区别才更新



