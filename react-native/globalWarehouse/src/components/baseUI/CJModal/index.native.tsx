import React from 'react';
import { Modal } from 'react-native';
import { CJView, CJText, CJScrollView } from '../index';
import styles from './styles';

interface IProps {
  /* 是否显示隐藏 */
  visible?: boolean;
  /* 标题 */
  title: string | React.ReactNode;
  /* 内容 */
  content: string | React.ReactNode;
  /* 内容样式 */
  contentStyles: object;
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
  /* modal 的动画类型 */
  animationType?: 'slide' | 'fade' | 'none';
  /* 弹窗按钮文本高亮 索引值 */
  activeButtonIndex?: 0 | 1;
  /* 自定义最外层盒子样式 */
  outerBoxStyles: object;
}

export default (props: IProps) => {
  const {
    visible,
    title,
    content,
    contentStyles,
    footer,
    onOk,
    onCancel,
    okText = 'Confirm',
    cancelText = 'Cancel',
    animationType = 'fade',
    activeButtonIndex = 0,
    outerBoxStyles,
  } = props;

  const buttons = (
    <>
      <CJText
        rnClass={[
          styles.modal_footer_button,
          activeButtonIndex === 0 && styles.active_color,
        ]}
        onClick={onOk}
      >
        {okText}
      </CJText>
      <CJText
        rnClass={[
          styles.modal_footer_button,
          activeButtonIndex === 1 && styles.active_color,
        ]}
        onClick={onCancel}
      >
        {cancelText}
      </CJText>
    </>
  );

  return (
    <Modal transparent animationType={animationType} visible={visible}>
      <CJView className={styles.modal_mask}>
        <CJView className={[styles.modal_warp, outerBoxStyles]}>
          <CJText className={styles.modal_title}>{title}</CJText>
          <CJView style={[styles.modal_content, contentStyles]}>
            {typeof content === 'string' ? (
              <CJText className={styles.modal_content_text}>{content}</CJText>
            ) : (
              content
            )}
          </CJView>
          <CJView className={styles.modal_footer_buttons}>
            {footer || buttons}
          </CJView>
        </CJView>
      </CJView>
    </Modal>
  );
};
