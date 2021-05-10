import React from 'react';
import HTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { px2dp } from '../../../utils/px2dp';

export default (props: any) => {
  const { content, ...args } = props;
  const contentWidth = useWindowDimensions().width;
  const tagsStyles = { img: { width: px2dp(313), height: 'auto' } };

  // 修改图片的大小
  const computeEmbeddedMaxWidth = (availableWidth: any) =>
    Math.min(availableWidth, 345);

  const _props = {
    tagsStyles,
    contentWidth,
    computeEmbeddedMaxWidth,
    enableExperimentalPercentWidth: true,
    source: { html: htmlStr(content) },
    ...args,
  };

  return <HTML {..._props} />;
};

// 删除img标签的行内样式
function htmlStr(str: string) {
  if (!str) return '<div/>';
  const reg = new RegExp('(i?)(<img.*?style=[\'"])([^>]+>)', 'gmi');
  return str.replace(reg, function (match: any) {
    return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/, '');
  });
}
