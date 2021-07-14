/* eslint-disable no-undef */
import React, { FC, useEffect, useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocalLang, getPageLang, urlToRouter } from '@cckj/i18n-util';
import getI18nextUtilConfig from '../../../../i18n.util.config';
import { GLOBAL_ENV } from '../../../config';

const i18nextUtilConfig = getI18nextUtilConfig({ env: GLOBAL_ENV });

// 初始化i18n
const initI18n = (langPath: string) => {
  //   console.log('langPath', langPath);
  i18n
    // .use(languagedetector) // 嗅探当前浏览器语言
    .use(initReactI18next) // passes i18n down to react-i18next
    .init(
      {
        ns: ['common'], // 可以放公共的词库 比如公共组件的
        defaultNS: langPath,
        debug: false, // debug模式
        lng: 'en', // 值为'cimode'时输出文本将是键
        // 选择默认语言，要和加载资源时的语言配置一致，比如：en/zh
        fallbackLng: 'en',
        nsSeparator: false,
        keySeparator: false,
        interpolation: {
          escapeValue: false,
        },
        resources: {
          en: {
            translation: require('@/locales/en/resource.json'),
          },
          'zh-cn': {
            translation: require('@/locales/zh-cn/resource.json'),
          },
        },
      },
      (err, t) => {
        // i18n('common-components-CjLocaleProvider-index-my'); // 默认命名空间用法
        // i18n('common-components-CjLocaleProvider-index-component:withdrawal-record'); // 其他命名空间用法
      },
    );
};

/**
 * 获取当前是复数还是单数 key
 * @param {Array} args i18n 参数
 */
function getSingularOrPluralKey(args) {
  const [key] = args.slice(0, 1);
  const [{ plural }] = args.slice(args.length - 1);

  // 如果已经添加了复数，就不用再添加，解决重复添加复数 key 的问题
  if (key.endsWith('--plural')) {
    return key;
  }
  if (typeof plural === 'number' && plural > 1) {
    // 表示复数
    return `${key}--plural`;
  }
  if (typeof plural === 'boolean' && plural) {
    // 表示复数
    return `${key}--plural`;
  }

  // 单数
  return key;
}

// 重写 i18n.t
const oldI18nTranslate = i18n.t;
i18n.t = (...args) => {
  // 是否有复数
  const [extentConfig] = args.slice(args.length - 1);
  if (
    typeof extentConfig === 'object' &&
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

initI18n('my');

window.i18n = i18n;

interface params {
  /** 语言 */
  lng: string;
  /** 页面路径 */
  urlPath: string;
}

const CJLocaleProvider: FC<params> = ({ lng = 'en', urlPath, children }) => {
  const [langPath, setLangPath] = useState('');

  // 动态拉取优先
  useEffect(() => {
    const initLang = async () => {
      let langResource: any = {};
      const _langPath =
        (await urlToRouter(urlPath, i18nextUtilConfig.router)) ||
        Date.now().toString();

      initI18n(_langPath);

      if (GLOBAL_ENV === 'local') {
        // 如果是开发环境,取本地的词库
        langResource = await getLocalLang('/lang/local/all.json');
      } else {
        langResource = await getPageLang({
          lang: lng,
          localLangPath: '/lang/pull',
          pages: [
            {
              router: i18nextUtilConfig.defaultRouter.path,
              pageId: i18nextUtilConfig.defaultRouter.push.pageId,
            },
            {
              router: _langPath,
              pageId: i18nextUtilConfig.router[_langPath]?.push?.pageId,
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

      i18n.addResources(lng, _langPath, langResource);
      //  timeout 解决部分词没获取到，就刷新页面问题（未找到具体原因）
      setLangPath(_langPath);
    };

    // setTimeout(()=> {
    // 	initLang();
    // },300)
    initLang();

    return () => setLangPath(''); // 为防止内存泄漏，需要一个清除函数
  }, [urlPath, lng]);

  i18n.changeLanguage(lng);

  return (
    <div key={langPath} style={{ height: '100%' }}>
      {i18n.getResource(lng, langPath) ? children : ''}
    </div>
  );
};

export default CJLocaleProvider;
