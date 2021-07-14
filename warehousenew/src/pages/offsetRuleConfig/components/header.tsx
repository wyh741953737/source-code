import React from 'react';
import style from '../index.less';
import { OFFSETRULETYPE } from '@/enum.config';
import { dateTimeFormat } from '@/utils';

export default ({ record }: any) => {
  const { name, storehouseName, status, updateBy, updateAt } = record;
  let typeObj: any = OFFSETRULETYPE.key(status);
  return (
    <div className={style.header}>
      <div className={style.title}>{name}</div>
      <div className={style.content}>
        <span className={style.spanOne}>仓库：{storehouseName}</span>
        <span className={style.spanOne}>
          状态：<span className={style[typeObj.class]}>{typeObj.value}</span>
        </span>
        <span className={style.spanOne}>更新人：{updateBy}</span>
        <span className={style.spanTwo}>
          更新时间：{dateTimeFormat(updateAt)}
        </span>
      </div>
    </div>
  );
};
