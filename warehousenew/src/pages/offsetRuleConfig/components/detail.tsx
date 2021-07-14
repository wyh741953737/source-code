import React from 'react';

import style from '../index.less';

export default ({ record }: any) => {
  let {
    storehouseRuleRelationDTOList,
    firstOrder,
    firstCustomer,
    username,
  } = record;
  let ruleString = '';
  if (firstOrder == 1) {
    ruleString += '首单优先级>';
  }
  if (firstCustomer == 1) {
    ruleString += '指定客户>';
  }
  let ruleData = JSON.parse(JSON.stringify(storehouseRuleRelationDTOList));
  ruleData.sort((item1: any, item2: any) => item1.ruleRank - item2.ruleRank);
  let nameArray: Array<string> = ruleData.map((item: any) => item.ruleName);
  ruleString += nameArray.join('>');
  return (
    <div className={style.detail}>
      <div className={style.descript}>
        <p className={style.rule}>
          <span>规则详情：</span> {ruleString}
        </p>
        <p className={style.firstPrecedence}>
          <span>首单优先：</span> {firstOrder == 1 ? '是' : '否'}
        </p>
      </div>
      <div className={style.descript}>
        <p className={style.specialCustomer}>
          <span>指定客户优先：</span> {firstCustomer == 1 ? '是' : '否'}
        </p>
        <p className={style.customerName}>
          <span>客户名称：</span>{' '}
          <span
            title={firstCustomer == 1 ? username : '-'}
            className={style.textName}
          >
            {firstCustomer == 1 ? username : '-'}
          </span>
        </p>
      </div>
    </div>
  );
};
