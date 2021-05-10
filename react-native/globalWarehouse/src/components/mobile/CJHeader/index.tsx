import React from 'react';
import {
  CJView,
  CJText,
  CJFragment,
  CJIcon,
  CJImageBackground,
} from '../../baseUI';
import { toBack } from '../../../utils/location';
import styles from './styles';

interface IProps {
  /* 标题 */
  title: string;
  /* 是否需要返回 */
  isBack?: boolean;
  /* 自定义返回函数 */
  onBack?: (params?: any) => void;
  /* 右侧元素 */
  right?: React.ReactNode;
  /* 头部主题颜色 */
  theme?: 'default' | 'deep' | 'white';
  /* 自定义样式 */
  cssStyle?: React.CSSProperties;
  /* 自定义字体颜色 */
  customColor?: string;
  /* 头部背景图 */
  headerBackgroundImage?: string;
  /* 其他参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const {
    title,
    isBack = true,
    onBack,
    right,
    theme,
    cssStyle,
    customColor,
    headerBackgroundImage,
  } = props;

  // 头部返回处理
  const handleBack = () => {
    if (onBack && typeof onBack === 'function') {
      onBack();
    } else {
      toBack();
    }
  };

  // 头部主题色
  const themes = () => {
    let color;
    let backgroundColor;
    if (theme === 'default') {
      // 默认
      color = '#303133';
      backgroundColor = '#F0F2F5';
    } else if (theme === 'deep') {
      // 深色
      color = '#fff';
      backgroundColor = '#4400FA';
    } else if (theme === 'white') {
      // 白色
      color = '#303133';
      backgroundColor = '#F0F2F5';
    }

    return {
      headerStyle: {
        backgroundColor,
        ...cssStyle,
      },
      titleStyle: {
        color: customColor || color,
        fontWeight: '600',
      },
    };
  };

  return (
    <CJFragment className={styles.header_wrap} style={themes().headerStyle}>
      <CJImageBackground
        style={themes().headerStyle}
        className={styles.headerBox}
        source={headerBackgroundImage}
      >
        <CJView className={styles.header_content}>
          {isBack ? (
            <CJIcon
              name="iconxialaanniu-Dropdownbutton"
              color={themes().titleStyle.color}
              onClick={handleBack}
              size={18}
            />
          ) : (
            <CJView />
          )}
          <CJText className={styles.title} style={themes().titleStyle}>
            {title}
          </CJText>
          {right || <CJView className={styles.right_box} />}
        </CJView>
      </CJImageBackground>
    </CJFragment>
  );
};
