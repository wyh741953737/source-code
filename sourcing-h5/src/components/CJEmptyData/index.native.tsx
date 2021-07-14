import React from 'react';
import {CJText, CJView, CJImage} from '../baseUI';
import styles from './styles';

interface IProps {
  /* 无数据提示文本 */
  text?: string;
  /* 是否展示 */
  show?: boolean;
  /* 无数据展示图片 */
  imgUrl?: any;
  /* 自定义class(rn) */
  rnClass?: object;
}

const CJEmptyData: React.FC<IProps> = props => {
  const {show, text, imgUrl, rnClass} = props;

  return (
    <>
      {show && (
        <CJView rnClass={rnClass ? rnClass : styles.no_data}>
          <CJImage source={imgUrl} rnClass={styles.img} />
          <CJText rnClass={styles.no_data_text}>{text}</CJText>
        </CJView>
      )}
    </>
  );
};

CJEmptyData.defaultProps = {
  text: 'No more',
  show: true,
  imgUrl: require('./emptyData.png'),
};

export default CJEmptyData;
