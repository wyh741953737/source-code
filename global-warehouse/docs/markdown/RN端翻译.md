# <center>RN 端翻译方案</center>

> 翻译方案基于翻译中心 v0.2 版本
> (RN 端翻译方案)[https://www.tapd.cn/66473603/markdown_wikis/show/#1166473603001000866]

# 安装

```
yarn add react-native-i18n
react-native link react-native-i18n
```

# 使用

1. 在项目中配置页面路径，RN 和 h5 页面路径要保持一致,保证 h5 和 RN 中页面拉取到的词一致

```
$ jobs-seller-h5/src/lang/router.json
{
  "Login": {
    "path": "/login",
    "push": {
      "pageId": "SJYD04"
    }
  },
  "/login/pwd":{
    "path":"/login/pwd",
    "push":{
      "pageId": "SJYD05"
    }
  },
}

```

2. 页面中，还是以前的写法

```
// 带页面参数、带单复数情况
{i18n.t('register-create_pwd-index-the-next-step', { order: 333666 }, { plural: 2 })}
// 带页面参数情况
{i18n.t('register-create_pwd-index-the-next-step', { order: 333666 })}
// 仅翻译
{i18n.t('register-create_pwd-index-the-next-step')}
```

3. 翻译参数说明
   3.1 最后一项是配置，单独复数形式，支持传一个变量（默认变量 > 1）的情况是复数

```
const [order,setOrder] = useState()

{i18n.t('register-create_pwd-index-the-next-step', { order: 333666 }, { plural: order })}
```

3.2 最后一项是可以表达式,根据表达式的 true or false 去判断

```
{i18n.t('register-create_pwd-index-the-next-step', { order: 333666 }, { plural: money >0.73 })}
```

# 注意事项

1. 上报词时，单复数都得上报,默认复数形式的 key 是在单数形式上加 '--plural',默认词的存放路径为 src/lang/local

```
$ jobs-seller-h5/src/lang/local

"register-create_pwd-index-the-next-step": "Next {{order}}",
"register-create_pwd-index-the-next-step--plural": "Nexts {{order}}",
```
