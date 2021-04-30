### app分类
1）native APP原生IOS，安卓
2）web app ：会话管理，安全离线存储以及访问原生设备功能有局限性
3）hybrid app 混合app，集合原生和h5应用的优点

### 搭建环境



#### api
AcessiblityInfo：查询/监听读屏应用当前状态
Appearence：检测用户是否开启了夜间模式，appearence.getColorScgeme
AppRegister是rn的js入口，registerComponent注册组件，runApplication：原生启动后调用启动
Appstate告诉你应用在前台还是后台，active：前台运行， background：后台运行：对应在别的应用中，停留在桌面，ios：inactive应用正在前后台切换过程或者来电状态。AppState.currentState动态的
Dimensions：通过get方法获取窗口window和屏幕screen，Dimensions.addEventListener('change', fn)
Easing动画缓存函数
Interactionmanager将一些耗时长的工作安排到所以交互或者动画完成之后，保证js动画流畅
    requestAnimationFrame：执行在一段时间内控制视图动画的代码
    setImmediate/setTimeout
    runAfterInteractions稍后执行，不延迟当前进行的动画

keyboard监听原生键盘事件，dismiss将弹出的键盘收回去，同时当前文本框失去焦点
