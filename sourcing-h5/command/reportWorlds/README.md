# 翻译词上报

> 翻译词上报命令行工具

## 商家端二级模块代码
1. 新增页面的时候，要把页面的模块分类填在上报配置中

18 - 引导
19 - 推荐
20 - 邀请
21 - 我的
25 - 通用

## 使用示例

1、上报到test环境

```
npm run reportWorlds:test
```

2、上报到release环境

```
npm run reportWorlds:release
```

3、上报到prod环境

```
npm run reportWorlds:prod
```

## 配置信息

1、修改config.js文件
2、上报的翻译词文件放在locales/dev-locales目录下
3、运行上报脚本，会在locales/dev-locales目录下生成upload-log-环境.json文件，已经上报过的翻译文件，在upload-log-环境.json文件中会被置为true，如果发现本次上传的翻译词没有全部成功，可以将upload-log-环境.json中的相应翻译词文件置为false，并重新运行上报命令

## 翻译词文件命名规范

report-项目版本或tapd单号-日期.json

示例：

report-033-20201009.json

## 修复词语重复

```
node command/reportWorlds/index.js test fix
```