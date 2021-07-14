import React from 'react';
import {Linking} from 'react-native';
import {CJText} from '../index';
import {toPage} from '../../../../../navigation/common';

interface IProps {
  /* rn 点击事件 */
  onClick: () => void;
  /* 网页链接地址 */
  href: string;
  /* 屏幕导航地址 */
  to: string;
  /* 自定义按钮行内样式 */
  style?: object;
  /* 自定义按钮class样式 */
  className?: object;
  /* 自定义按钮行内样式(rn) */
  rnStyle?: object;
  /* 自定义按钮class样式(rn) */
  rnClass?: object;
  /* 其他参数 */
  [key: string]: any;
}

const Link: React.FC<IProps> = props => {
  const {onClick, href, rnClass, rnStyle, className, style, to, ...arg} = props;

  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      onClick();
      return;
    }

    if (href) {
      Linking.openURL(href);
      return;
    }

    if (to.indexOf('/') === 0) {
      to = to.slice(1);
    }

    const queryIndex = to.indexOf('?');
    const query: any = {};

    if (queryIndex > -1) {
      const queryString = to.slice(queryIndex + 1);

      to = to.slice(0, queryIndex);

      for (const item of queryString.split('&')) {
        const [name, value] = item.split('=');

        query[name] = value;
      }
    }

    toPage(to, query);
  };

  const _props = {
    style: [className, rnClass, style, rnStyle],
    onClick: handleClick,
    ...arg,
  };

  return <CJText {..._props} />;
};

export default Link;
