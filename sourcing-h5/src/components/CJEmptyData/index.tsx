import React from 'react';
import { CJText, CJView, CJImage } from '../baseUI';

interface IProps {
  /* 无数据提示文本 */
  text?: string;
  /* 是否展示 */
  show?: boolean;
  /* 无数据展示图片 */
  imgUrl?: string;
  /* 无数据展示图片 */
  h5Style?: React.CSSProperties;
  /* 自定义class(h5) */
  h5Class?: string;
}

const CJEmptyData: React.FC<IProps> = function (props) {
  const {
    show, text, imgUrl, h5Style = {}, h5Class,
  } = props;
  const _props = { h5Class };

  return (
    <CJView
      {..._props}
      className="empty_wrap"
      h5Style={{
        display: show ? 'block' : 'none',
        textAlign: 'center',
        paddingTop: '10%',
        ...h5Style,
      }}
    >
      <CJImage src={imgUrl} style={{ width: 80 }} />
      <CJText
        style={{
          display: 'block',
          color: '#909399',
          fontSize: 14,
          fontWeight: 300,
          marginTop: 10,
        }}
      >
        {text || 'No Data'}
      </CJText>
    </CJView>
  );
};

CJEmptyData.defaultProps = {
  show: true,
  imgUrl: require('./emptyData.png'),
};

export default CJEmptyData;
