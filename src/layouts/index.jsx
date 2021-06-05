import React from 'react';
import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { CJLocaleProvider } from '../components/mobile';
import JsTracking from '../utils/jsTracking';
// import { GLOBAL_ENV } from '../config';

// 加载埋点脚本
JsTracking();

// if (GLOBAL_ENV === 'prod') {
//  /** 1. 获取站点
//   *  2. 如果不是中国站点，执行统计 */
//  (async () => {
//    const cookieRes = await getCookieModelWithoutTokenApi();
//    const areaId = cookieRes.data?.areaId;
//    if (areaId !== SITE_INFO[0].areaId) {
//      // 线上新增运营提供 google 统计代码
//      googleJs();
//    }
//  })();
// }

export default (props) => {
  const { children } = props;
  // language 需要根据地区动态获取，暂时写死英语
  // const { language } = getUrlAndLang();
  const urlPath = window.location.pathname; // 页面路由
  return (
    <LocaleProvider locale={enUS}>
      <CJLocaleProvider lng="en" urlPath={urlPath}>
        {children}
      </CJLocaleProvider>
    </LocaleProvider>
  );
};
