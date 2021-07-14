import React from 'react';
import { CJView, CJLoadingIcon } from '@/components/baseUI';
import styles from './styles';

interface WProps {
  /** 组件className */
  className?: string;
  /** 组件loading状态 */
  loading?: boolean;
}

export default (props: WProps = {}) => {
  const { className = '', loading = true } = props;
  if (!loading) {
    return null;
  }
  return (
    <CJView className={`${styles.web_loading} ${className}`}>
      <CJLoadingIcon />
    </CJView>
  );
};
