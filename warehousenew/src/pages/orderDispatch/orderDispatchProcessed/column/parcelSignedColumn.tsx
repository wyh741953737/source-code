import React from 'react';
import { defaultColumns, dateTimeFormat } from '@/utils';
import style from '../index.less';
import { CopyOutlined } from '@ant-design/icons/lib';
import { Button } from 'antd';

/*!
 * 订单调度-已收货 -已签收包裹Table表头
 * 20021-01-15
 */

export default (checkDetail: Function, checkLog: Function) => {
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
      title: '签收日期',
      dataIndex: 'receiptAt',
      key: 'receiptAt',
      align: 'left',
      fixed: 'left',
      render: (text: string, record: any) => {
        let time = dateTimeFormat(text);
        return (
          <>
            {time}
            {record.mark && record.mark == 1 ? (
              <span className={style.interceptSpan}>拦</span>
            ) : null}
          </>
        );
      },
    },
    {
      title: '运单号',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      align: 'left',
    },
    {
      title: '包裹编号',
      dataIndex: 'parcelNumber',
      key: 'parcelNumber',
      align: 'left',
      render: (text: string, record: any) => {
        return (
          <>
            {text}{' '}
            <CopyOutlined
              className={style.copy}
              onClick={() => checkLog(record)}
            />
          </>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      align: 'left',
    },
    {
      title: '操作',
      dataIndex: 'Action',
      key: 'Action',
      align: 'left',
      render: (text: any, record: any) => {
        return (
          <Button type="primary" onClick={() => checkDetail(record)}>
            查看详情
          </Button>
        );
      },
    },
  ]);
};
