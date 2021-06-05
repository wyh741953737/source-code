import React from 'react';
import { View } from 'react-native';
import { elementClick } from '../../../utils/jsTracking';
import EventWrap from '../common/eventWrap';

export default (props: any) => {
  const { onClick, ...args } = props;
  let _onClick;

  // 点击上报
  if (props['data-tracking-element-click']) {
    _onClick = () => {
      typeof onClick === 'function' && onClick();
      elementClick(JSON.parse(props['data-tracking-element-click']));
    };
  } else {
    _onClick = onClick;
  }

  const _props = {
    onClick: _onClick,
    ...args,
  };

  return EventWrap(_props)(View);
};
