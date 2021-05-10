import { Platform } from 'react-native';
import { ON_MESSAGE } from '../../../utils/constant/index.native';

// 在web view加载前执行的js方法
const webJavascript = (config = {}) => {
  // 在window上挂载属性，
  window.App = { ...config };

  // web view加载的h5向app发起通信方法
  window.postMessage = function (data) {
    window.ReactNativeWebView.postMessage(data);
  };

  // 重写h5 history的pushState、replaceState方法，添加popstate监听事件
  // h5调用history.push方法发送postMessage消息到rn端，rn端通过onMessage监听
  // onMessage方法可拿到页面状态信息，根据拿到信息中canGoBack决定返回走web view返回还是rn返回
  // Android端没办法的解决办法。。。
  const historyRewrite = (fn) =>
    function () {
      const res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: ON_MESSAGE.NAVIGATION_STATE_CHANGE }),
      );
      return res;
    };

  history.pushState = historyRewrite(history.pushState);
  history.replaceState = historyRewrite(history.replaceState);
  window.addEventListener('popstate', () => {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: ON_MESSAGE.NAVIGATION_STATE_CHANGE }),
    );
  });

  // 登录信息
  window.localStorage.setItem('TOKEN', config.user.token);
};

// 添加挂载在window上的属性
export const addWindowAttr = (config: object = {}) => {
  const appConfig = {
    os: Platform.OS,
    version: Platform.Version,
  };

  return `(${webJavascript.toString()})(${JSON.stringify({
    ...appConfig,
    ...config,
  })})`;
};

// 监听 h5 postMessage 发送消息
export const handleOnMessage = async (params: any = {}) => {
  const { nativeEvent, setCanGoBack } = params;

  try {
    if (nativeEvent.data === 'undefined') {
      return;
    }

    const { type, data } = JSON.parse(nativeEvent.data || '{}');

    if (type === ON_MESSAGE.NAVIGATION_STATE_CHANGE) {
      // web view 设置是否可返回状态（Android端）
      typeof setCanGoBack === 'function' && setCanGoBack(nativeEvent.canGoBack);
    }
  } catch (err) {
    console.log('error', err);
  }
};
