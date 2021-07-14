import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { defaultColumns } from '@/utils';
import { SCHEDULINGTYPE } from '@/enum.config';

interface Props {
  dataSource: Array<any> | undefined;
  deleteDetail: Function;
}
const PackageList: React.FC<Props> = ({ dataSource, deleteDetail }) => {
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
      title: '调度类型',
      dataIndex: 'schedulingType',
      key: 'schedulingType',
      align: 'left',
      render: (text: number, record: any) => {
        return SCHEDULINGTYPE.key(Number(text))?.value;
      },
    },
    {
      title: '属性',
      dataIndex: 'property',
      key: 'property',
      align: 'left',
    },
    {
      title: '运单号/包裹号',
      dataIndex: 'parcelOrWaybillNumber',
      key: 'parcelOrWaybillNumber',
      align: 'left',
    },
    {
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'left',
    },
    {
      title: '重量(kg)',
      dataIndex: 'weight',
      key: 'weight',
      align: 'left',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'left',
    },
    {
      title: '操作',
      dataIndex: 'Action',
      key: 'Action',
      align: 'left',
      render: (text: any, record: any) => {
        return <Button onClick={() => deleteDetail(record)}>删除</Button>;
      },
    },
  ]);
  return (
    <Table
      // @ts-ignore
      columns={columns}
      bordered
      dataSource={dataSource}
      pagination={false}
      style={{ width: '100%' }}
      rowKey={record => record.orderId + record.parcelOrWaybillNumber}
    />
  );
};
export default PackageList;
