import React from 'react';
import { CJView, CJText } from '../index';
import styles from './styles';

interface IProps {
  /* 自定义行内样式 */
  style?: object;
  /* 自定义class */
  className?: object;
  /* 自定义行内样式(rn) */
  rnStyle?: object;
  /* 自定义class样式(rn) */
  rnClass?: object;
  /* 是否有边框 */
  bordered?: boolean;
  /* 标题 */
  title?: string | React.ReactNode;
  /* 卡片右上角的操作区域 */
  extra?: string | React.ReactNode;
  /* 内容区域 */
  children?: string | React.ReactNode;
  /* 其他参数 */
  [key: string]: any;
}

export default (props: IProps) => {
  const { children, title, extra, bordered = true, ...args } = props;
  const _title = typeof title === 'string' ? <CJText>{title}</CJText> : title;
  const _extra = typeof extra === 'string' ? <CJText>{extra}</CJText> : extra;
  const _children =
    typeof children === 'string' ? <CJText>{children}</CJText> : children;

  return (
    <CJView h5Class={styles.wrap} rnClass={styles.wrap} {...args}>
      {!!title && (
        <CJView
          className={styles.head}
          h5Class={bordered && styles.border_bottom}
          rnClass={bordered && styles.border_bottom}
        >
          <CJView className={styles.title} numberOfLines={1}>
            {_title}
          </CJView>
          {_extra}
        </CJView>
      )}
      <CJView className={styles.content}>{_children}</CJView>
    </CJView>
  );
};
