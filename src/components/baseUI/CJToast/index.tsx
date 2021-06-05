import React from 'react';
import Notification from 'rmc-notification';
import CJLoadingIcon from '../CJLoadingIcon';
import { CJView, CJText, CJIcon } from '../index';
import styles from './styles';

/** toast默认展示时间 */
const DEFAULT_DURATION = 1.5;

/** toast展示时间最大值 */
const MAX_DURATION = 3000;

const key = 'cj_toast';

interface Props {
  /** 提示内容 */
  content?: string;
  /** 展示类型 */
  type?: 'success' | 'fail' | 'info' | 'config' | 'loading';
  /** 展示时间, 单位：秒 */
  duration?: number;
  /** 提示之后，回调函数 */
  onClose?: () => void;
  /** 自定义icon */
  icon?: React.ReactComponentElement<any>;
}

let notification: any = null;

Notification.newInstance({}, (n: any) => (notification = n));

const notice = (props: Props) => {
  const { content = 'loading', type = 'info', duration, icon, onClose } = props;

  const typeObj: any = {
    info: null,
    fail: <CJIcon name="icon_Bold" size={24} />,
    success: <CJIcon name="iconduihao-Checkmark" size={24} />,
    loading: <CJLoadingIcon />,
  };

  const _content = (
    <CJView className={styles.mask}>
      <CJView className={styles.content_wrap}>
        {icon || typeObj[type]}
        <CJText className={styles.content}>{content}</CJText>
      </CJView>
    </CJView>
  );

  notification.notice({
    key,
    content: _content,
    duration: type === 'loading' ? MAX_DURATION : duration || DEFAULT_DURATION,
    onClose: typeof onClose === 'function' && onClose(),
  });
};

export default {
  /**
   * 成功
   * @param content 展示内容
   * @param duration 展示时间, 单位：秒
   * @param onClose 提示之后，回调函数
   * @returns
   */
  success(content?: string, duration?: number, onClose?: () => void) {
    return notice({
      content,
      type: 'success',
      duration,
      onClose,
    });
  },
  /**
   * 失败
   * @param content 展示内容
   * @param duration 展示时间, 单位：秒
   * @param onClose 提示之后，回调函数
   * @returns
   */
  fail(content?: string, duration?: number, onClose?: () => void) {
    return notice({
      content,
      type: 'fail',
      duration,
      onClose,
    });
  },
  /**
   * 只显示文本
   * @param content 展示内容
   * @param duration 展示时间, 单位：秒
   * @param onClose 提示之后，回调函数
   * @returns
   */
  info(content?: string, duration?: number, onClose?: () => void) {
    return notice({
      content,
      type: 'info',
      duration,
      onClose,
    });
  },
  /**
   * 加载中
   * @param content 展示内容
   * @param duration 展示时间, 单位：秒
   * @returns
   */
  loading(content?: string) {
    return notice({ content, type: 'loading' });
  },
  /** 隐藏toast弹出 */
  hide() {
    notification.removeNotice(key);
  },
};
