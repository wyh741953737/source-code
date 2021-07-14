import React from 'react';
import { CJView, CJText } from '@/components/baseUI';
import styles from './styles';

interface IProps {}

export default (props: IProps) => {
  const {} = props;
  return (
    <CJView className={styles.hot_types}>
      <CJText className={styles.title}></CJText>
    </CJView>
  );
};
