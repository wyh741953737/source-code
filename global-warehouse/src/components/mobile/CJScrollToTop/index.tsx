import { IconFont } from '@/global';
import { CJView } from '../../baseUI';
import styles from './style';

interface Props {
  visible?: boolean; // 是否展示
  position?: PositionNum;
  onclick?: () => void;
}
interface PositionNum {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}
const ScrollToTop = ({
  visible = false,
  position = { right: 8, bottom: 17 },
  onclick,
}: Props) => (
  <CJView
    className={`${styles.toTop} ${visible && styles.toTopShow}`}
    style={{ ...position }}
    onClick={onclick}
  >
    <IconFont type="icon-fanhuidingbu" className="toTopIcon" />
  </CJView>
);

export default ScrollToTop;
