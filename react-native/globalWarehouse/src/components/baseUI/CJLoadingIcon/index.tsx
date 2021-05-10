import React from 'react';
import Lottie from 'lottie-web-react';
import { CJView } from '../index';

const loadingData = require('./loading.json');

interface Props {
  /* 宽度 */
  width?: number;
  /* 高度 */
  height?: number;
  /* 路径 */
  path?: string;
}

export default (props: Props) => {
  const { width = 50, height = 50, path = loadingData } = props;

  const _props = {
    playingState: 'play',
    speed: 1,
    direction: 1,
    options: {
      loop: true,
      autoplay: true,
      renderer: 'svg',
      animationData: path,
      rendererSettings: {
        preserveAspectRatio: 'xMinYMin slice',
      },
    },
  };

  return (
    <CJView style={{ width, height }}>
      <Lottie {..._props} />
    </CJView>
  );
};
