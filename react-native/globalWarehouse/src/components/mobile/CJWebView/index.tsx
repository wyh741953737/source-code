import React from 'react';
import styles from './styles.less';

export default (props: any) => {
  const { url } = props;

  const onload = () => {
    const iframe = document.getElementById('iframe');
  };

  return (
    <iframe className={styles.iframe} id="iframe" src={url} onLoad={onload} />
  );
};
