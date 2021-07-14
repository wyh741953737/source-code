# <center>Wed2c 两端公用 baseUI 基础组件文档</center>

> 公用基础组件，基于 h5 标签和 antd 和 react native 核心组件封装，用于两端公用页面结构搭建，基本功能的实现。  
> 一些基础组件除了文档定义参数外，还可支持原组件官方文档参数。请参考  
> https://ant.design/components/overview-cn/  
> https://reactnative.cn/docs/components-and-apis

### CJView

h5：`div`标签。  
app：基于 react native `View`组件封装，用于页面搭建布局。

**示例**

```jsx
import React from 'react';
import { CJView } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return (
    <CJView
      h5Class={`${styles.box1} ${styles.box2}`}
      h5Style={{ backgroundColor: 'blue' }}
    >
      <CJView rnClass={[styles.box3, styles.box4]}></CJView>
      <CJView rnStyle={{ backgroundColor: 'red' }}></CJView>
    </CJView>
  );
};
```

**API**

| 字段      | 说明           | 类型                           | 默认值 |
| :-------- | :------------- | :----------------------------- | :----- |
| style     | style 样式     | CSSProperties(h5)｜ object(rn) | -      |
| className | class 类名     | string(h5)｜ object(rn)        | -      |
| h5Style   | h5 style 样式  | CSSProperties                  | -      |
| h5Class   | h5 class 类名  | string                         | -      |
| rnStyle   | app style 样式 | object                         | -      |
| rnClass   | app class 类名 | object ｜[object,object]       | -      |
| ...       |                |                                |        |

**CJText**

h5： `span`标签  
app：基于 react native `Text`组件封装，用于放置文本。

**API**

| 字段      | 说明           | 类型                           | 默认值 |
| :-------- | :------------- | :----------------------------- | :----- |
| style     | style 样式     | CSSProperties(h5)｜ object(rn) | -      |
| className | class 类名     | string(h5)｜ object(rn)        | -      |
| h5Style   | h5 style 样式  | CSSProperties                  | -      |
| h5Class   | h5 class 类名  | string                         | -      |
| rnStyle   | app style 样式 | object                         | -      |
| rnClass   | app class 类名 | object ｜[object,object]       | -      |
| ...       |                |                                |        |

**示例**

```jsx
import React from 'react';
import { CJText } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return (
    <CJText
      h5Class={`${styles.box1} ${styles.box2}`}
      h5Style={{ backgroundColor: 'blue' }}
    >
      文本
      <CJText rnClass={[styles.box3, styles.box4]}>文本</CJText>
      <CJText rnStyle={{ backgroundColor: 'red' }}>文本</CJText>
    </CJText>
  );
};
```

### CJButton

h5：基于 antd `Button` 二次封装。  
app：基于 react native `TouchableOpacity` 组件封装，用于一个点击操作。

**API**

| 字段      | 说明              | 类型                           | 默认值  |
| :-------- | :---------------- | :----------------------------- | :------ |
| style     | style 样式        | CSSProperties(h5)｜ object(rn) | -       |
| className | class 类名        | string(h5)｜ object(rn)        | -       |
| h5Style   | h5 style 样式     | CSSProperties                  | -       |
| h5Class   | h5 class 类名     | string                         | -       |
| rnStyle   | app style 样式    | object                         | -       |
| rnClass   | app class 类名    | object ｜[object,object]       | -       |
| textStyle | 按钮文本样式(app) | object                         | -       |
| type      | 设置按钮类型      | primary ｜ default             | default |
| disabled  | 是否禁用按钮      | boolean                        | false   |
| onClick   | 点击事件          | (event) => void                | -       |
| onPress   | 点击事件          | (event) => void                | -       |
| ...       |                   |                                |         |

**示例**

```jsx
import React from 'react';
import { CJButton } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return <CJButton type="primary">button</CJButton>;
};
```

### CJImage

h5： `img`标签。  
app：基于 react native `Image`组件封装，用于渲染图片。

**API**

| 字段          | 说明           | 类型                           | 默认值     |
| :------------ | :------------- | :----------------------------- | :--------- |
| style         | style 样式     | CSSProperties(h5)｜ object(rn) | -          |
| className     | class 类名     | string(h5)｜ object(rn)        | -          |
| h5Style       | h5 style 样式  | CSSProperties                  | -          |
| h5Class       | h5 class 类名  | string                         | -          |
| rnStyle       | app style 样式 | object                         | -          |
| rnClass       | app class 类名 | object ｜[object,object]       | -          |
| source        | 设置图片地址   | string ｜ { uri: string }      | 本地默认图 |
| defaultSource | 默认图片地址   | string ｜ { uri: string }      | 本地默认图 |
| ...           |                |                                |            |

> app 端 source 字段设置网络图、base64 格式图片和本地图片要区分，网络图、base64 格式图片需要指定尺寸。

**示例**

```jsx
import React from 'react';
import { CJImage } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return (
    <CJImage source={require('@/assets/images/common/logo.png')}/>
    <CJImage source={{uri: https://xxx.png}}/>
  )
}
```

### CJInput

h5：基于 antd `Input` 封装。  
app：基于 react native `TextInput` 组件封装，用于文本输入。

**API**

| 字段           | 说明                                   | 类型                           | 默认值 |
| :------------- | :------------------------------------- | :----------------------------- | :----- |
| style          | style 样式                             | CSSProperties(h5)｜ object(rn) | -      |
| className      | class 类名                             | string(h5)｜ object(rn)        | -      |
| h5Style        | h5 style 样式                          | CSSProperties                  | -      |
| h5Class        | h5 class 类名                          | string                         | -      |
| rnStyle        | app style 样式                         | object                         | -      |
| rnClass        | app class 类名                         | object ｜[object,object]       | -      |
| prefix         | 前缀图标                               | ReactNode                      | -      |
| suffix         | 后缀图标                               | ReactNode                      | -      |
| value          | 输入框内容                             | string                         | -      |
| inputType      | 输入框类型                             | string                         | -      |
| onCJChangeText | 输入框内容变化时的回调, 回传输入的文本 | function                       | -      |
| isVerify       | 是否开启验证（app）                    | boolean                        | false  |
| errMsg         | 错误消息（app）                        | string                         | -      |
| ...            |                                        |                                |        |

**示例**

```jsx
import React from 'react';
import { CJInput } from '../../components/baseUI';
import { Icon } from '@ant-design/react-native';
import styles from './styles';

export default () => {
  return (
    <CJInput
      value={email}
      onCJChange={(value: string) => setEmail(value.trim())}
      onChangeText={(value: string) => setEmail(value.trim())}
      suffix={<Icon name="mail" size="sm" style={styles.icon} />}
      onSubmitEditing={handleNext}
      errMsg={errorInfo.msg}
      returnKeyType="next"
      keyboardType="email-address"
      placeholder="Enter email address"
    />
  );
};
```

### CJIcon

用于展示字体图表库。  
h5：基于阿里字体图表库使用封装。  
app：基于[react-native-iconfont-cli](https://github.com/iconfont-cli/react-native-iconfont-cli)库封装。

**API**

| 字段      | 说明           | 类型                           | 默认值 |
| :-------- | :------------- | :----------------------------- | :----- |
| style     | style 样式     | CSSProperties(h5)｜ object(rn) | -      |
| className | class 类名     | string(h5)｜ object(rn)        | -      |
| h5Style   | h5 style 样式  | CSSProperties                  | -      |
| h5Class   | h5 class 类名  | string                         | -      |
| rnStyle   | app style 样式 | object                         | -      |
| rnClass   | app class 类名 | object ｜[object,object]       | -      |
| name      | 图标名称       | string                         | -      |
| size      | 图标大小       | number ｜ string               | 16     |
| color     | 图标颜色       | object                         | -      |
| onClick   | 点击事件       | function                       | -      |
| ...       |                |                                |        |

**示例**

```jsx
import React from 'react';
import { CJIcon } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return (
    <CJIcon
      size="18"
      h5Style={{ fontSize: '50px' }}
      h5Class={`${styles.iconfont2} ${styles.iconfont1}`}
      rnClass={`${styles.iconfont}`}
      name="daifukuan"
    />
  );
};
```

### CJFragment

h5：基于`div`标签封装。  
app：基于 react native `SafeAreaView`组件封装，用于在一个“安全”的可视区域内渲染内容，常用于处理 iPhone 刘海屏幕。

**API**

| 字段      | 说明           | 类型                           | 默认值 |
| :-------- | :------------- | :----------------------------- | :----- |
| style     | style 样式     | CSSProperties(h5)｜ object(rn) | -      |
| className | class 类名     | string(h5)｜ object(rn)        | -      |
| h5Style   | h5 style 样式  | CSSProperties                  | -      |
| h5Class   | h5 class 类名  | string                         | -      |
| rnStyle   | app style 样式 | object                         | -      |
| rnClass   | app class 类名 | object ｜[object,object]       | -      |
| ...       |                |                                |        |

**示例**

```jsx
import React from 'react';
import { CJFragment } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return (
    <CJFragment rnClass={styles.warp} rnStyle={{ backgroundColor: 'red' }}>
      ...
    </CJFragment>
  );
};
```

### CJScrollView

用于内容区域滚动。

h5：基于`div`标签封装。  
app：基于 react native `ScrollView `组件封装。

**API**

| 字段      | 说明           | 类型                           | 默认值 |
| :-------- | :------------- | :----------------------------- | :----- |
| style     | style 样式     | CSSProperties(h5)｜ object(rn) | -      |
| className | class 类名     | string(h5)｜ object(rn)        | -      |
| h5Style   | h5 style 样式  | CSSProperties                  | -      |
| h5Class   | h5 class 类名  | string                         | -      |
| rnStyle   | app style 样式 | object                         | -      |
| rnClass   | app class 类名 | object ｜[object,object]       | -      |
| ...       |                |                                |        |

**示例**

```jsx
import React from 'react';
import { CJScrollView } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return <CJScrollView rnClass={styles.warp}>...</CJScrollView>;
};
```

### CJImageBackground

用于显示背景图。

h5：基于`div`标签封装，设置 backgroundImage。  
app：基于 react native `ImageBackground`组件封装。

**API**

| 字段      | 说明           | 类型                           | 默认值 |
| :-------- | :------------- | :----------------------------- | :----- |
| style     | style 样式     | CSSProperties(h5)｜ object(rn) | -      |
| className | class 类名     | string(h5)｜ object(rn)        | -      |
| h5Style   | h5 style 样式  | CSSProperties                  | -      |
| h5Class   | h5 class 类名  | string                         | -      |
| rnStyle   | app style 样式 | object                         | -      |
| rnClass   | app class 类名 | object ｜[object,object]       | -      |
| source    | 设置背景图地址 | string ｜ { uri: string }      | -      |
| ...       |                |                                |        |

**示例**

```jsx
import React from 'react';
import { CJImageBackground } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return (
    <CJImageBackground rnClass={styles.warp} source={{uri: https://xxx.png}}>
      ...
    </CJImageBackground>
  )
}
```

### CJCheckbox

用于选中某一项。

h5：基于基础组件封装。  
app：基于基础组件封装。

**API**

| 字段     | 说明      | 类型     | 默认值 |
| :------- | :-------- | :------- | :----- | -------- |
| type     | 样式类型  | checkbox | radio  | checkbox |
| color    | icon 颜色 | string   | -      |
| checked  | 是否选中  | boolean  | -      |
| onChange | 回调函数  | function | -      |
| ...      |           |          |        |

**示例**

```jsx
import React from 'react';
import { CJCheckbox } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return <CJCheckbox checked>...</CJCheckbox>;
};
```

### CJKeyboard

h5：基于 react `Fragment`代码片段组件封装，用于放置代码片段，  
app：基于 react native `KeyboardAvoidingView`组件封装，解决手机上弹出的键盘常常会挡住当前的视图的问题。

**API**

| 字段      | 说明           | 类型                           | 默认值 |
| :-------- | :------------- | :----------------------------- | :----- |
| style     | style 样式     | CSSProperties(h5)｜ object(rn) | -      |
| className | class 类名     | string(h5)｜ object(rn)        | -      |
| rnStyle   | app style 样式 | object                         | -      |
| rnClass   | app class 类名 | object ｜[object,object]       | -      |
| ...       |                |                                |        |

**示例**

```jsx
import React from 'react';
import { CJKeyboard, CJView } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return (
    <CJKeyboard rnClass={styles.warp} rnStyle={{ backgroundColor: 'red' }}>
      ...
    </CJKeyboard>
  );
};
```

### CJLink

链接跳转或者路由跳转。  
h5：基于 react `Fragment`代码片段组件封装，用于放置代码片段，  
app：基于 react native `KeyboardAvoidingView`组件封装，解决手机上弹出的键盘常常会挡住当前的视图的问题。

**API**

| 字段      | 说明                           | 类型                           | 默认值 |
| :-------- | :----------------------------- | :----------------------------- | :----- |
| style     | style 样式                     | CSSProperties(h5)｜ object(rn) | -      |
| className | class 类名                     | string(h5)｜ object(rn)        | -      |
| h5Style   | h5 style 样式                  | CSSProperties                  | -      |
| h5Class   | h5 class 类名                  | string                         | -      |
| rnStyle   | app style 样式                 | object                         | -      |
| rnClass   | app class 类名                 | object ｜[object,object]       | -      |
| href      | 网页链接地址                   | string                         | -      |
| to        | h5: 路由地址 app: 屏幕导航地址 | string                         | -      |
| onClick   | 点击事件(app)                  | function                       | -      |
| ...       |                                |                                |        |

**示例**

```jsx
import React from 'react';
import { CJLink } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return (
    <CJLink href="https://www.baidu.com" to="home">
      link
    </CJLink>
  );
};
```

### CJModal

模态对话框。  
h5：基于 CJView、CJText 组件实现。  
app：基于 react native `Modal`组件封装。

**API**

| 字段              | 说明                    | 类型                  | 默认值            |
| :---------------- | :---------------------- | :-------------------- | :---------------- |
| visible           | 是否显示隐藏            | boolean               | false             |
| title             | 标题                    | string ｜ ReactNode   | -                 |
| content           | 内容                    | string ｜ ReactNode   | -                 |
| footer            | 弹窗底部内容            | ReactNode             | Confirm ｜ Cancel |
| onOk              | 弹窗第一个按钮事件      | function              | -                 |
| onCancel          | 弹窗第二个按钮事件      | function              | -                 |
| okText            | 弹窗第一个按钮文本      | string                | -                 |
| cancelText        | 弹窗第二个按钮文本      | string                | -                 |
| animationType     | modal 的动画类型（app） | slide ｜ fade ｜ none | fade              |
| activeButtonIndex | 弹窗按钮文本高亮 索引值 | 0 ｜ 1                | 1                 |

**示例**

```jsx
import React from 'react';
import { CJModal } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return (
    <CJModal {...modalProps} />;
  )
}
```

### CJPicker

带关键字检索的底部弹出选择器。  
h5：基于基础组件实现。  
app：基于基础组件实现。

**API**

| 字段       | 说明           | 类型          | 默认值  |
| :--------- | :------------- | :------------ | :------ |
| h5Style    | h5 style 样式  | CSSProperties | -       |
| rnStyle    | app style 样式 | object        | -       |
| visible    | 是否显示隐藏   | boolean       | false   |
| dataSource | 数据源         | object[]      | -       |
| okText     | 确认按钮文字   | string        | Confirm |
| cancelText | 取消按钮文字   | string        | Cancel  |
| onOk       | 确认事件回调   | function      | -       |
| onCancel   | 取消事件回调   | function      | -       |
| initValue  | 初始值         | string        | -       |
| showSearch | 是否显示搜索栏 | boolean       | false   |

**示例**

```jsx
import React from 'react';
import { CJPicker } from '../../components/baseUI';
import styles from './styles';

export default () => {
  return (
    <CJPicker {...pickerProps} />;
  )
}
```
