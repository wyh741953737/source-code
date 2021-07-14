# sourcing-app

> rn 环境配置 [参考文档](https://reactnative.cn/docs/environment-setup)  
> 依赖工具 `xCode` `Android Studio` `React Native debugger 调试工具`

#### 技术栈

`react` `ts` `umi`
[`react native`](https://reactnative.cn/docs/getting-started)
[`Ant Design Mobile RN`](https://rn.mobile.ant.design/docs/react/introduce-cn)
[`iconfont`](https://github.com/iconfont-cli/react-native-iconfont-cli)

iconfont 生成配置文件

```
npx iconfont-init
```

生成 rn iconfont 组件

```
npx iconfont-rn
```

#### 项目启动

安装依赖

```
yarn
```

web/h5 端

```
yarn web
```

ios 端

```
cd ios && pod install && cd ../
yarn ios
```

android 端

```
yarn android
```

#### 翻译词上报拉取

翻译词合并监听

```
yarn i18n-generate
```

上报

```
yarn reportWorlds:master/release/prod
```

拉取

```
yarn pullWorlds:master/release/prod
```

#### 文档

生成 html 文档

```
yarn doc
```

新增 markdown 并生成 html 文档

```
yarn doc xxx.md
```

#### 打包

ios 端  
客户端打包

android 端

> 打 release 包需要签名文件

```
cd android
./gradlew assembleRelease
```

安装包路径：android/app/build/outputs/apk/release/app-release.apk

#### 目录结构

```
sourcing-app
  ├── __tests__                   // 测试
  ├── android                     // android 原生代码
  ├── command                     // 翻译上报拉取工具
  ├── docs                        // 文档
  ├── ios                         // ios 原生代码
  ├── mock                        // mock
  ├── public                      // 翻译工具语言包
  ├── src                         // 项目资源
  │   ├── .umi                    // umi
  │   ├── assets                  // 静态资源
  │   ├── components              // 组件(基础组件/功能组件)
  │   ├── config                  // 环境配置(rn+h5)
  │   ├── hooks                   // 自定义hooks
  │   ├── i18n                    // i18n (rn)
  │   ├── iconfont                // 字体图标(rn)
  │   ├── layouts                 // 全局布局(h5)
  │   ├── navigation              // 导航器 (rn)
  │   ├── pages                   // h5页面/app屏幕
  │   ├── services                // 接口API
  │   ├── styles                  // 全局样式(h5)
  │   ├── utils                   // 工具包
  │   │   ├── constant            // 枚举类
  │   │   ├── jsTracking          // 埋点
  │   │   ├── location            // 页面跳转
  │   │   ├── platformMatch       // 运行平台匹配页面
  │   │   ├── px2dp               // app屏幕适配
  │   │   ├── request             // 请求
  │   │   └── storage             // 本地存储
  │   │   └── tools               // 工具方法
  │   └── global.less             // 全局样式文件(h5)
  ├── App.js                      // 入口文件(rn)
  ├── i18n.util.config.js         // i18n工具配置文件
  ├── .umirc.ts                   // umi配置文件
  ├── iconfont.josn               // 字体图标配置文件(rn)
  ├── package.josn                // package
  └── README.md                   // help
```
