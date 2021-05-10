import React, { useState } from 'react';
import { CJHeader, CJWebView } from '../../components/mobile';
import { webViewRef } from '../../components/mobile/CJWebView/index.native';
import { goBack, toPage } from '../../navigation/common';

export default (props: any) => {
  const { url, title, ...args } = props.route.params;
  const [canGoBack, setCanGoBack] = useState<boolean>(false);

  const handleBack = (targetScreen?: string) => {
    if (canGoBack) {
      // webview h5返回
      webViewRef.current.goBack();
    } else if (targetScreen) {
      // 返回到指定屏幕
      toPage(targetScreen);
    } else {
      // APP 返回
      goBack();
    }
  };

  const _props = {
    url,
    setCanGoBack,
    ...args,
  };

  if (!url) {
    return null;
  }

  return (
    <>
      <CJHeader title={title} onBack={handleBack} />
      <CJWebView {..._props} />
    </>
  );
};
