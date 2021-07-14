import React, {useState, createRef} from 'react';
import {WebView} from 'react-native-webview';
import {CJProgressBar} from '../index';
import {matchWebViewUrl} from '../../utils/tools/index.native';
import {addWindowAttr, handleOnMessage} from './app';
import config from './config';

export const webViewRef: any = createRef();

export default (props: any) => {
  const {url, injectedJavaScript = '', setCanGoBack, ...rest} = props;
  const [progress, setProgress] = useState<number>(0);

  // 在web view加载前执行的js
  const injectedJs = () => addWindowAttr();

  const webViewProps = {
    ref: webViewRef,
    source: {uri: matchWebViewUrl(url)},
    onLoadProgress: ({nativeEvent}: any) => setProgress(nativeEvent.progress),
    onNavigationStateChange: (navState: any) =>
      typeof setCanGoBack === 'function' && setCanGoBack(navState.canGoBack),
    onMessage: (nativeEvent: any) =>
      handleOnMessage({nativeEvent, setCanGoBack}),
    injectedJavaScriptBeforeContentLoaded: injectedJs() + injectedJavaScript,
    ...config,
    ...rest,
  };

  return (
    <>
      {progress !== 1 && (
        <CJProgressBar progressTintColor="#4400FA" progress={progress} />
      )}
      <WebView {...webViewProps} />
    </>
  );
};
