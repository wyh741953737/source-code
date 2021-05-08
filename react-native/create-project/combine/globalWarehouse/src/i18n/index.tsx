import React, { useState, useEffect } from 'react';
import i18n from 'react-native-i18n';
import { getPageLang } from '@cckj/i18n-util';
import { GLOBAL_ENV } from '../config';
import getI18nextUtilConfig from '../../i18n.util.config';

i18n.defaultLocale = 'en';
i18n.fallbacks = true;

const addResources = (lng: string, translationJson: any) => {
  i18n.translations = Object.assign(i18n.translations, {
    [lng]: translationJson,
  });
};

/**
 * 获取当前是复数还是单数 key
 * @param {Array} args i18n 参数
 */
const getSingularOrPluralKey = (args: any) => {
  const [key] = args.slice(0, 1);
  const [{ plural }] = args.slice(args.length - 1);

  // 如果已经添加了复数，就不用再添加，解决重复添加复数 key 的问题
  if (key.endsWith('--plural')) {
    return key;
  }

  if (typeof plural === 'number' && plural > 1) {
    // 表示复数
    return `${key}--plural`;
  } else if (typeof plural === 'boolean' && plural) {
    // 表示复数
    return `${key}--plural`;
  }

  // 单数
  return key;
};

// 重写 i18n.t
const oldI18nTranslate = i18n.t;

i18n.t = (...args: any) => {
  // 是否有复数
  const [extentConfig] = args.slice(args.length - 1);

  if (
    typeof extentConfig === 'object' &&
    // eslint-disable-next-line no-prototype-builtins
    extentConfig.hasOwnProperty('plural')
  ) {
    //  如果有复数,替换新复数 key
    const newKey = getSingularOrPluralKey(args);
    const [, ...rest] = args;

    return oldI18nTranslate.apply(i18n, [newKey, ...rest]);
  }

  // 没有复数
  return oldI18nTranslate.apply(i18n, args);
};

global.i18n = i18n;

export default (Component: any, navigationRef: any) => (props: any) => {
  const currentPagePath = navigationRef.current?.getCurrentRoute().name || '';
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      // 1. 切换路由时，找到对应的路由
      // 2. 根据配置 找到对应的 页面id  => pageId
      // 3. 根据 pageId 请求后端数据，初始化 i18n
      let resource;
      let resource2;
      let pagePath = Date.now().toString();
      const lang = 'en';
      const env = GLOBAL_ENV;
      const i18nextUtilConfig = getI18nextUtilConfig({ env });
      const pagePaths = Object.keys(i18nextUtilConfig.router).sort(
        (a, b) => b.length - a.length,
      );

      for (const path of pagePaths) {
        if (currentPagePath.includes(path)) {
          pagePath = path;
          break;
        }
      }

      if (__DEV__) {
        resource = (await import('../../public/lang/local/all.json')).default;
      } else {
        const localLangPath = `${i18nextUtilConfig.config.pageUrl}/lang/pull`;
        // console.log('拉取翻译词的路径===》', localLangPath);
        resource = (await import('../../public/lang/local/all.json')).default;

        resource2 = await getPageLang({
          lang,
          localLangPath,
          pages: [
            {
              router: i18nextUtilConfig.defaultRouter.path,
              pageId: i18nextUtilConfig.defaultRouter.push.pageId,
            },
            {
              router: pagePath,
              pageId: i18nextUtilConfig.router[pagePath]?.push?.pageId,
            },
          ],
          serverConfig: {
            apiUrl: `${i18nextUtilConfig.config.apiUrl}/cj-translation-api/v2/word/findByApplicationIdAndLinkAndCountryCode`,
            data: {
              applicationId: i18nextUtilConfig.config.applicationId,
            },
          },
        });
      }

      // console.log('拉取到的翻译词===》', resource);
      addResources(lang, { ...resource, ...resource2 });
      !!resource && setRefresh(true);
    };

    init();
  }, [currentPagePath]);
  if (!refresh) {
    return null;
  }

  return <Component {...props} />;
};
