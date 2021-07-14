WAREHOUSE PROJECT
===========================

# 环境依赖
**node v10.x+**

# 快速上手

### 克隆项目
*git clone http://192.168.5.143/web/erp-group/warehousenew.git*

### 安装node依赖
npm install 

### 启动项目
yarn start

### 项目打包编译
yarn build



# 目录结构描述
```
├── mock  //*存储本地调试Mock数据的js文件*
├── node_modules         //*安装包依赖文件夹*
├── src
│   ├── colors.less      //*公共样式*
│   ├── enum.config.ts   //*统一枚举存储文件*
│   ├── global.less      //*全局通用样式*
│   ├── option.apply.ts  //*公共请求api方法* 
│   ├── proxy.ts         //*代理配置文件*
│   ├── proxyToMockServer.ts
│   ├── regExp.config.ts  //*统一存储正则匹配文件*  
│   ├── assist           //*存储公共图片资源*
│   ├── components       //*通用组件文件夹*
│   ├── ts
│   │   ├── useButton.ts
│   │   ├── useChanged.ts
│   │   ├── useModal.ts
│   │   ├── useOptions.ts
│   │   ├── useRowSelection.ts
│   │   └── useSearchForm.ts
│   ├── layouts        //*页面框架布局及菜单栏文件夹*
│   │   ├── index.tsx
│   │   └── menuConfig.ts
│   ├── models         //*dva数据存储文件夹models* 
│   ├── pages          //*页面模块文件*   
│   ├── services       //*统一接口文件夹*
│   └── ts
│       ├── enum.ts        //*枚举*
│       ├── exportData.ts  //*Excel文件导出*
│       ├── index.ts       //*通用方法*
│       ├── lazy.ts        //*动态加载组件方法*  
│       ├── print.ts       //*打印面单方法*
│       ├── publisher.ts   //*小型的发布订阅类*
│       ├── report.ts      //*语音播报方法*
│       ├── request.ts     //*http请求封装方法*
│       ├── serviceResponse.ts //*http请求返回结果的中间件处理方法*
│       ├── stateUtil.ts   //*Dva中公共reducer*
│       ├── storage.ts     //*本地缓存*
│       ├── throttle.ts    //*防抖节流*
│       └── upload.ts      //*文件上传*
├── .editorconfig       //*用于定义编码样式的文件格式和一组文本编辑器插件组成*
├── .gitignore          //*git软件要忽略的文件列表*
├── .npmrc              //*npm 仓库镜像地址* 
├── .prettierignore     //*忽略格式化文件的配置文件*
├── .prettierrc         //*自定义的代码格式化工具配置文件* 
├── .umirc.ts           //*Umi 基础配置文件*
├── package-lock.json   //*锁定安装时的包的版本号，并且需要上传到git，以保证其他人在npm install时大家的依赖能保证一致。*
├── package.json        //*管理你本地安装的npm包，用于定义了这个项目所需要的各种模块，以及项目的配置信息*
├── README.md           //*项目说明文档*
├── tsconfig.json       //*typescript 基础配置文件*
├── typings.d.ts        //*帮助编译器识别类型,让开发者做到先声明后使用*
└── yarn.lock           //*准确存储每个安装的依赖的版本*
```
# 项目发版
#### [测试环境](http://warehousenew.test.com/)
git合并代码到master分支自动触发部署。

# 参考文档

[React](https://react.docschina.org/)

[UmiJS](https://umijs.org/)

[TypeScript](https://www.tslang.cn/)

[Dva](https://dvajs.com/)

# 相关资料
- [蓝湖原型设计稿](https://lanhuapp.com/web/#/item/project/product?tid=f9eb51d4-f2b3-4c5b-949a-5d8cacb4b1d4&teamId=f9eb51d4-f2b3-4c5b-949a-5d8cacb4b1d4&pid=48019ad4-0062-4645-9499-76b16aeba016&project_id=48019ad4-0062-4645-9499-76b16aeba016&image_id=fa11b657-2897-4e79-9d53-4f1475530692&docId=fa11b657-2897-4e79-9d53-4f1475530692&docType=axure&type=share_board&pwd=Ek08&activeSectionId=&userId=332e5925-8bad-4c28-827a-0f95559e0f65&versionId=29960a87-f4c0-4b3a-bc3d-20c763be1aea&pageId=88087c3f67354aeb8ede665f74b95d64&parentId=9660288347e8484fb6ea84fc352f0c4f)
- [后端API接口文档](http://192.168.5.222/project/201/interface/api)


# 版本更新

#### V1.0.0 版本内容更新
- 库存管理
    - **库存看板**
    - **库内移动**
- 系统管理
    - **库位管理**
    - **库区管理**
    - **容器管理**
- 入库
    - **入库单查询**
    - **分标管理**
    - **质检管理**
    - **称重管理**
    - **上架管理**
    - **异常处理**

#### V2.1.1 版本内容更新
- 系统管理
    - **抵扣规则配置**
    - **耗材管理**
- 出库
    - **出库单查询**
    - **波次管理**
    - **拣货管理**

#### V2.1.2 版本内容更新
- 出库
    - **分拣管理**
    - **验货包装**
        - **直发单**
        - **代发单**
        - **打包记录**
        - **异常记录**
    - **称重出库**
        - **等待出库**
        - **称重异常**
        - **配置**
        - **包裹打印**
        - **揽件出库**
    - **揽收记录**
        - **清单详情**
        - **货袋详情**
    - **异常类型**
        - **出库异常**
        - **面单补打**


#### V2.1.3 版本内容更新
- 库存管理
    - **库存转移**
    - **库存调整**
- 出库
    - **调度任务**
        - **调拨出库单**
    - **订单调度**
        - **订单调度**
        - **到达仓签收**
    - **绩效规则**
        - **绩效规则列表**
        - **绩效规则配置**






