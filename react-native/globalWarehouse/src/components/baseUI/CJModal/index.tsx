import React from 'react';
import { CJView, CJText } from '../index';
import { useStopScoll } from '../../../hooks';
import styles from './styles.less';

interface IProps {
  /* 是否显示隐藏 */
  visible: boolean;
  /* 标题 */
  title: string | React.ReactNode;
  /* 内容 */
  content: string | React.ReactNode;
  /* 弹窗底部内容 */
  footer?: string | React.ReactNode;
  /* 弹窗第一个按钮事件 */
  onOk?: () => void;
  /* 弹窗第二个按钮事件 */
  onCancel?: () => void;
  /* 弹窗第一个按钮文本 */
  okText?: () => void;
  /* 弹窗第二个按钮文本 */
  cancelText?: () => void;
  /* 弹窗按钮文本高亮 索引值 */
  activeButtonIndex?: 0 | 1;
  /* 自定义内容样式 */
  contentStyles?: React.CSSProperties;
}

export default (props: IProps) => {
  const {
    visible,
    title,
    content,
    footer,
    onOk,
    onCancel,
    okText = 'Confirm',
    cancelText = 'Cancel',
    activeButtonIndex = 0,
    contentStyles,
  } = props;

  useStopScoll(visible);

  const handleOk = () => {
    if (onOk && typeof onOk === 'function') {
      onOk();
    }
  };

  const handleCancel = () => {
    if (onCancel && typeof onCancel === 'function') {
      onCancel();
    }
  };

  const buttons = (
    <>
      <CJText
        onClick={handleOk}
        h5Class={`${styles.modal_button} ${
          activeButtonIndex === 0 ? styles.active_color : ''
        }`}
      >
        {okText}
      </CJText>
      <CJText
        onClick={handleCancel}
        h5Class={`${styles.modal_button} ${
          activeButtonIndex === 1 ? styles.active_color : ''
        }`}
      >
        {cancelText}
      </CJText>
    </>
  );

  return (
    <>
      {visible && (
        <CJView h5Class={styles.modal_mask}>
          <CJView h5Class={`${styles.modal_warp} ${contentStyles}`}>
            <CJText h5Class={styles.modal_title}>{title}</CJText>
            <CJView h5Class={`${styles.modal_content} modal_content_wrap`}>
              {content}
            </CJView>
            <CJView h5Class={styles.modal_buttons}>{footer || buttons}</CJView>
          </CJView>
        </CJView>
      )}
    </>
  );
};
