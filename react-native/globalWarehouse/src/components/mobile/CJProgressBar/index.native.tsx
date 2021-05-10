import React from 'react';
import { CJView } from '../../baseUI';
import px2dp from '../../../utils/px2dp';

interface IProps {
  /* 进度条加载进度 */
  progress: number;
  /* 进度条颜色 */
  progressTintColor: string;
}

export default (props: IProps) => {
  const { progress, progressTintColor } = props;
  const styles = {
    width: `${progress * 100}%`,
    height: px2dp(2),
    backgroundColor: progressTintColor,
  };

  return <CJView rnStyle={styles} />;
};
