import React from 'react';
import { IconFont } from '@/global';
import styles from './style';

interface Props {
  visible?: boolean; // 是否展示
  position?: PositionNum;
}
interface PositionNum {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}
const ScrollToTop = ({
  visible = false,
  position = { right: 24, bottom: 160 },
}: Props) => {
  return (
    <div
      className={`${styles.toTop} ${visible && styles.toTopShow}`}
      style={{ ...position }}
      onClick={() => window.scrollTo(0, 0)}
    >
      <IconFont type="icon-fanhui" className="toTopIcon" />
    </div>
  );
};

export default ScrollToTop;
