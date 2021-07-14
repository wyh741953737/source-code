import React, {useEffect} from 'react';
import {Modal, ActivityIndicator} from 'react-native';
import {CJView, CJText, CJIcon} from '../index';
import RootSiblings from 'react-native-root-siblings';
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
/** https://www.npmjs.com/package/react-native-root-siblings/v/3.2.3 */
const sibling: any = new RootSiblings(<></>);

const Toast = (props: IProps) => {
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
      iconUrl = <ActivityIndicator animating color={'#fff'} size={24} />;
      // 如果传入时间等于0时
      if (duration === 0) {
        duration = MAX_DURATION;
      }
      break;
  }
  const iconObj: Object = {
    name: iconUrl,
    color: iconColor || '#FFFFFF',
  };
  duration =
    duration == MAX_DURATION ? duration * 1000 : DEFAULT_DURATION * 1000;

  useEffect(() => {
    setTimeout(() => {
      // 如果该实例属于RootSiblings对象下
      if (sibling instanceof RootSiblings) {
        sibling.destroy();
      }
      onClose && onClose();
    }, duration);
  }, []);

  return (
    <Modal transparent={true}>
      <CJView style={styles.mask}>
        <CJView style={styles.content_wrap}>
          {iconUrl &&
            (typeof iconUrl === 'string' ? (
              <CJIcon className={styles.icon} {...iconObj} size={24} />
            ) : (
              iconUrl
            ))}
          <CJText style={styles.content}>{content}</CJText>
        </CJView>
      </CJView>
    </Modal>
  );
};

export default {
  /**
   * 成功
   * @param content 展示内容
   * @param duration 展示时间, 单位：秒
   * @param onClose 提示之后，回调函数
   * @returns
   */
  success: (content: string, duration?: number, onClose?: () => void) => {
    const props = {
      content,
      type: 'success',
      duration,
      onClose,
    };
    sibling.update(<Toast {...props} />);
  },
  /**
   * 失败
   * @param content 展示内容
   * @param duration 展示时间, 单位：秒
   * @param onClose 提示之后，回调函数
   * @returns
   */
  fail: (content: string, duration?: number, onClose?: () => void) => {
    const props = {
      content,
      type: 'fail',
      duration,
      onClose,
    };
    sibling.update(<Toast {...props} />);
  },
  /**
   * 只显示文本
   * @param content 展示内容
   * @param duration 展示时间, 单位：秒
   * @param onClose 提示之后，回调函数
   * @returns
   */
  info: (content: string, duration?: number, onClose?: () => void) => {
    const props = {
      content,
      type: 'info',
      duration,
      onClose,
    };
    sibling.update(<Toast {...props} />);
  },
  /**
   * 加载中
   * @param content 展示内容
   * @param duration 展示时间, 单位：秒
   * @returns
   */
  loading(content: string, duration?: number) {
    const props = {
      content,
      type: 'loading',
      duration,
    };
    sibling.update(<Toast {...props} />);
  },
  /** 隐藏toast弹出 */
  hide() {
    sibling.destroy();
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
  config: (
    content: string,
    duration?: number,
    onClose?: () => void,
    iconUrl?: string,
    iconColor?: string,
  ) => {
    const props = {
      content,
      type: 'config',
      duration,
      onClose,
      iconUrl,
      iconColor,
    };
    sibling.update(<Toast {...props} />);
  },
};
