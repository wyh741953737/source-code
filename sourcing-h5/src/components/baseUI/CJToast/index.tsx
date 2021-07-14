import React from 'react';
import Notification from 'rmc-notification';
import {ActivityIndicator} from 'antd-mobile';
import {CJView, CJText, CJIcon} from '../index';
import styles from './styles';

/** toast类型 */
type ToastType = 'success' | 'fail' | 'info' | 'config' | 'loading';
/** toast默认展示时间 */
const DEFAULT_DURATION = 1.5;
/** toast展示时间最大值 */
const MAX_DURATION = 3600;
interface IProps {
  /** 提示内容 */
  content: string;
  /** 展示类型 */
  type?: ToastType;
  /** 展示时间, 单位：秒 */
  duration?: number;
  /** 提示之后，回调函数 */
  onClose?: () => void;
  /** 自定义icon */
  iconUrl?: string | React.ReactNode;
  /** 自定义icon颜色 */
  iconColor?: string;
}

// 实例化
/**
 * https://www.npmjs.com/package/rmc-notification
 */
let notification: any = null;
// toast弹窗id
const key = 'cj_toast';
Notification.newInstance({}, (n: any) => (notification = n));

const notice = (props: IProps) => {
  let {content, type, duration, iconUrl, iconColor, onClose} = props;

  // 根据type选用设置icon
  switch (type) {
    case 'success':
      iconUrl = 'iconduihao-Checkmark';
      break;
    case 'fail':
      iconUrl = 'icon_Bold';
      break;
    case 'info':
      iconUrl = null;
      break;
    case 'config':
      iconUrl = iconUrl;
      break;
    case 'loading':
      iconUrl = (
        <ActivityIndicator className={styles.icon} animating size="large" />
      );
      // 如果传入时间等于0时
      if (duration && duration === 0) {
        duration = MAX_DURATION;
      }
      break;
  }
  const iconObj: Object = {
    name: iconUrl,
    color: iconColor || '#FFFFFF',
  };

  notification.notice({
    content: (
      <CJView className={styles.mask}>
        <CJView className={styles.content_wrap}>
          {iconUrl &&
            (typeof iconUrl === 'string' ? (
              <CJIcon className={styles.icon} {...iconObj} size={24} />
            ) : (
              iconUrl
            ))}
          <CJText className={styles.content}>{content}</CJText>
        </CJView>
      </CJView>
    ),
    key,
    duration: duration || DEFAULT_DURATION,
    onClose() {
      onClose && onClose();
    },
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
  success(content: string, duration?: number, onClose?: () => void) {
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
  fail(content: string, duration?: number, onClose?: () => void) {
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
  info(content: string, duration?: number, onClose?: () => void) {
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
  loading(content: string, duration?: number) {
    return notice({content, type: 'loading', duration});
  },
  /** 隐藏toast弹出 */
  hide() {
    notification.removeNotice(key);
  },
  /**
   * 自定义图标和颜色
   * @param content 展示内容
   * @param duration 展示时间, 单位：秒
   * @param onClose 提示之后，回调函数
   * @param iconUrl 自定义icon
   * @param iconColor  自定义icon颜色
   * @returns
   */
  config(
    content: string,
    duration?: number,
    onClose?: () => void,
    iconUrl?: string,
    iconColor?: string,
  ) {
    return notice({
      content,
      type: 'config',
      duration,
      onClose,
      iconUrl,
      iconColor,
    });
  },
};
