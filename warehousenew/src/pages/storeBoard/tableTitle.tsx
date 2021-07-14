import React from 'react';
import style from './index.less';

interface Props {
  data: Array<{ name: string; value: string | number | undefined }>;
}

const TableTitle: (data: Props) => React.ReactElement = ({ data }) => {
  return (
    <div className={style['table-title']}>
      {data.map((item, index) => (
        <div key={index} className={style['table-title-item']}>
          <span className={style['table-title-item-name']}>{item.name}：</span>
          <span className={style['table-title-item-value']}>
            {item.value || '暂未统计'}
          </span>
        </div>
      ))}
    </div>
  );
};
export default TableTitle;
