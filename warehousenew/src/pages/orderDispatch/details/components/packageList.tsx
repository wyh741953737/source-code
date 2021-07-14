import React, { useState } from 'react';
import { Table } from 'antd';
import { defaultColumns } from '@/utils';
import { history } from 'umi';
interface Props {
  dataSource: Array<any> | undefined;
  packageListUseRouter: Function;
}
const PackageList: React.FC<Props> = ({ dataSource, packageListUseRouter }) => {
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
      title: '包裹编号',
      dataIndex: 'parcelNumber',
      key: 'parcelNumber',
      align: 'left',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'left',
      render: (text: any, record: any) => {
        return record.detailResultList ? record.detailResultList.length : 0;
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
      style={{ width: '100%', maxHeight: '600px', overflowY: 'scroll' }}
      rowKey={record => record.id}
      onRow={record => {
        return {
          onClick: event => {
            packageListUseRouter(record);
          }, // 点击行
        };
      }}
    />
  );
};
export default PackageList;
