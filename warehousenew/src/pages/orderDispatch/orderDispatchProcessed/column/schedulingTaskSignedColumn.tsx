import React from 'react';
import { defaultColumns, dateTimeFormat } from '@/utils';

/*!
 * 订单调度-已收货 -已签收调度任务Table表头
 *  20021-01-15
 */
export default (checkDetail?: Function, checkLog?: Function) => {
  return defaultColumns([
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'left',
      width: 80,
      fixed: 'left',
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: '调度编号',
      dataIndex: 'dispatchNumber',
      key: 'dispatchNumber',
      align: 'left',
      fixed: 'left',
    },
    {
      title: '货代名称',
      dataIndex: 'goodsLoanName',
      key: 'goodsLoanName',
      align: 'left',
    },
    {
      title: '转出仓',
      dataIndex: 'sourceStorehouseName',
      key: 'sourceStorehouseName',
      align: 'left',
      width: 100,
    },
    {
      title: '到达仓',
      dataIndex: 'targetStorehouseName',
      key: 'targetStorehouseName',
      align: 'left',
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      key: 'createBy',
      align: 'left',
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'left',
      render: (text: string) => dateTimeFormat(text),
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'left',
    },
  ]);
};
