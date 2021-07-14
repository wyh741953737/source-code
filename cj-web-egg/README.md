
### 初次启动项目
- 安装nodejs
- mac下 `sudo npm i -g yarn` 
- windows `npm i -g yarn`
- 安装项目依赖 `yarn`
- 默认启动端口 7000
### issues

- rollup 警告
  ```bash
  # Bease64 库中有用到 eval
  # 可以配置 rollup 的 onwarn 自定义警告
  Use of eval is strongly discouraged, as it poses security risks and may cause issues with minification
  ```
- 请使用 `@rollup/plugin-node-resolve` 代替 `rollup-plugin-node-resolve`
- 请使用 `@rollup/plugin-commonjs` 代替 `rollup-plugin-commonjs`

### 启动命令
```bash
yarn dev      # 启动全部脚本 (不用动脑子)

# 单独启动
yarn egg-dev  # 启动 egg 开发脚本
yarn gulp-dev # 启动 public/ 下面 global.js、*.less 编译
yarn cj-dev   # 启动 cj-web-webpack
```

### 目录结构
```
.
├── app/
.  ├── controller/
.  ├── extend/
.  .  ├── application.js                 # 扩展 - 服务端全局
.  .  ├── filter.js                      # 过滤器 - nunjucks 模版
.  ├── middleware/
.  .  ├── authorize.js                   # 登陆验证 (暂时没用)
.  .  ├── router-filter.js               # 路由拦截 (暂时没用)
.  ├── schedule/                         # 定时任务
.  .  ├── home/
.  .  .  ├── banner.js                   # 缓存 - banner
.  .  .  ├── category.js                 # 缓存 - 类目
.  .  .  ├── cjdropshippingFAQ.js        # 缓存 - banner 右侧 FAQ
.  .  .  ├── floor.js                    # 缓存 - 楼层
.  ├── service/
.  .  ├── home.js                        # 请求 - home 页面
.  ├── view/
.  .  ├── layout/
.  .  .  ├── base.njk                    # 基本布局 html、body 壳
.  .  .  ├── footer-copyright.njk        # 公用底部
.  .  .  ├── head.njk                    # 公用头部
.  .  ├── snippet/
.  .  .  ├── macor.njk                   # 组件 - 宏定义
.  .  .  ├── swiper.njk                  # 组件 - 轮播图
.  .  ├── home.njk                       # 页面 - 首页
.  .  ├── list-detail.njk                # 页面 - 列表
.  .  ├── product-detail.njk             # 页面 - 详情
.  ├── router.js
├── common/
.  ├── config.js                         # 公用 - 配置文件
.  ├── filter.js                         # 公用 - vue、njk 过滤器
.  ├── utils.js                          # 公用 - 工具类
├── config/                              # egg 配置
├── logs/
├── mycj/                                # cj-web-webpack
.  ├── config/
.  ├── public/
.  ├── script/
.  ├── src/
.  ├── src/
.  .  ├── components/
.  .  ├── pages/
.  .  .  ├── mycj/
.  .  .  ├── pages-md5.js
.  .  ├── provider/
.  .  .  ├── commonjs/
.  .  .  ├── filter.js
.  .  .  ├── order-infro.js
.  .  .  ├── utils.js
.  .  ├── utils/
├── mycj-public/
├── public/egg
.  ├── image/                            # 静态 - 图片
.  ├── libs/                             # 静态 - 第三方 js
.  ├── script/
.  .  ├── global/                        # 扩展 - 客户端全局 (gulp编译)
.  .  .  ├── define.js                   # 扩展 - 给 window 定义属性
.  .  .  ├── index.js
.  .  .  ├── utils.js                    # 客户端 utils
.  .  .  ├── vue.component.js            # vue - 全局组件
.  .  .  ├── vue.mixin.js                # vue - mixin
.  .  .  ├── window.js                   # 扩展 - window 属性挂载文件
.  .  ├── home.js
.  ├── style/
.  .  ├── less/                          # *.less 会被编译到 style 下 *.css
.  .  .  ├── common.less                 # less 全局变量、mixin，会被编译到 global.less 中
.  .  .  ├── global.less                 # less 全局样式
├── run/
├── scripts/
.  ├── before.js                         # 钩子 - 启动前
.  ├── gulp-rollup.js                    # public/xxx/global/ 打包
.  ├── gulp.js                           # 打包 - less、js
├── .babelrc
├── .gitignore
├── app.js                               # egg 自定义启动 (生命周期)
├── package.json
├── README.md
├── yarn.lock

```

### 一些有必要的说明
- 开发期可以将一些日志写到根目录 `.tmp` 下
  ```js
  this.app.writeToTmp('axios/error.json', JSON.stringify(error, null, 2));
  // 然后在 .tmp/axios/error.json 查看日志
  ```
- 如果启动后发现 `egg` 命令行有报错，先去看 **定时任务** `app/schedule/*`
- 首页缓存(增加加载速度)思路
  * 类目、banner、楼层等数据均用定时任务缓存到 `cj-cache` 下
  * `njk`、`vue` 渲染共存机制
    - 如 banner 右侧的个人信息
    - 如 banner 右侧的 `FAQ`
    - 如9楼点击 `View more`
    - ...
- `$` 第三方库均以 $ 开头，**且服务端、客户端通用**

### 开发规范
- 少特么打无用的 **console.log** 🤬
- 异步报错请求 **只使用resolve**
  ```js
  // 服务端
  async getData() {
    const [err, data] = await this.app.$axios(url, param);
    if (err) {
      this.app.writeToLog('xxx.log', err);
    } else {
      // Render page
    }
  }

  // 客户端1
  getData() {
    CJ_.$axios(url, param).then(([err, data]) => {
      if (err) {
        console.warn(err);
      } else {
        // Render page
      }
    });
  }
  ```
- vue
  * 插值表达式换成了 `${ vueData }`，避开与 `nunjucks` 冲突
  * 所有公用的 vue 功能写在 `script/global/vue.mixin.js`
  * 渲染的部分请用 id 命名要明确
    ```html
    <div id="vue-xxx">
    <!-- vue 接管 -->
    </div>

    <script>
      new Vue({
        mixins: [CJ_.vueMixin], // 公用的 vue 功能
        el: '#vue-xxx',         // id 均以 vue- 开头
      });
    </script>
    ```
  * 全局组在 `script/global/vue.component.js`
    ```html
    <!-- 嵌套用法 -->
    <load-bounce :loading="loading">
      <div v-for="item of data">${ item.xxx }</div>
    </load-bounce>

    <!-- 单独用法 -->
    <load-bounce style="height:40px;" :loading="loading"/>
    ```
    ...
- `jquery` 作为保留选项
  * 能用 `vue` 接管的，尽量 vue
  * jquery 代码难维护，少用 🙃
- egg 中必须遵循 `MVC` 结构开发
  * controller 中写调度
  * service 中写请求
- 扩展、utils 不要乱写
  * 服务端扩展写到 `application.js` 中，会自动挂载到 `this.app`、`cxt` 上面
  * 客户端扩展全挂到 `CJ_` 上面

### 公用部分
- 可以公用前端 vue 后台 njk 两个地方的东西
  * 公用模板过滤器 `common/filter.js`
  * 公用 utils `common/utils.js`
  * 公用 config `common/config.js`
- 可以理解为客户端 `window` 和服务端 `this.app`、`cxt` 等价
- `CJ_.$axios`、`this.app.$axios` 说明
  ```js
  // 请求监听
  const listen = bool => {
    // 发起请求，bool 为 true；请求结束或出错 bool 自动变为 false
  }
  // GET
  CJ_.$axios(url, jsonParam, listen)
  // POST
  this.app.$axios.post(url, jsonParam, listen)
  ```

### 服务端
- 所有 egg 扩展写在 `app/extend/application.js`
- 模板变量
  ```
  EGG_ENV: // egg 运行环境

  // 静态文件目录
  PUBLIC: '/egg',
  PUBLIC_LIBS: '/egg/libs',
  PUBLIC_STYLE: '/egg/style',
  PUBLIC_SCRIPT: '/egg/script',
  PUBLIC_IMG: '/egg/image',
  ```

### 客户端
- 所有 window 扩展写在 `public/xxx/script/global/window.js`
  ```js
    // CJ_ 挂载了所有扩展
    // $ 开头的均为第三方库
    window.CJ_ = {
      $axios,
      $base64,
      $cookie,
      config,
      store,
      vueMixin,
      getUserInfo,           // 最好不要用，推荐用 CJ_userInfo 属性
      checkLogin,            // 最好不要用，推荐使用 CJ_isLogin 属性
      authLoginUrl,          // 有些 URL 只能登陆后才能访问
      statusCode200,         // 处理 statusCode === "200" 的这种接口，返回 [null, data.result]
    };

    defUserinfo(window);     // CJ_userInfo
    defIsLogin(window);      // CJ_isLogin
  ```

### 继承基础 BaseController

BaseController类内置提供了如下：

i18next -- i18next对象
```javascript
const { i18next } = this.PARAMS
const static = i18next.t('hellow world')
```

getLng(lng:string) 获取当前语言 如：en
```javascript
const { getLng } = this.PARAMS
const lng = getLng(this.lng) // this.lng 继承了BaseController的Controller就会内置
```

_createNav 顶部的菜单列表集合 如：仓库列表
```javascript
const { _createNav } = this.PARAMS
await _createNav() // 会生成 this.PARAMS.topNavList 数组属性 供 app\view\snippet\common-top.njk 使用
```

createRelatedLinks() 创建底部link列表
```javascript
const { createRelatedLinks } = this.PARAMS
createRelatedLinks() // 会生成 this.PARAMS.relatedLinks 数组属性 供 app\view\snippet\home\related-links.njk 使用
```

createPageModule({ route:string, totalNum:number }) 创建分页对象
```javascript
const { createPageModule } = this.PARAMS
// await 数据请求回来拿到数据和totalNum
createPageModule({
  route:'/blog/list',
  totalNum
}) // 会生成 this.PARAMS.pageModule 数组属性 供 app\view\snippet\common\page.njk 使用
```