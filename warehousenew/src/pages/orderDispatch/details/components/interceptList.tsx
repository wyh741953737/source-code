import React, { useState } from 'react';
import { Table } from 'antd';
import { defaultColumns } from '@/utils';

interface Props {
  dataSource: Array<any> | undefined;
}
const InterceptList: React.FC<Props> = ({ dataSource }) => {
  const columns = defaultColumns([
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
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'left',
    },
    {
      title: '运单号',
      dataIndex: 'parcelOrWaybillNumber',
      key: 'parcelOrWaybillNumber',
      align: 'left',
    },
  ]);
  return (
    <Table
      // @ts-ignore
      columns={columns}
      bordered
      dataSource={dataSource}
      pagination={false}
      style={{ width: '100%', maxHeight: '600px', overflowY: 'scroll' }}
      rowKey={record => record.parcelOrWaybillNumber}
    />
  );
};
export default InterceptList;
