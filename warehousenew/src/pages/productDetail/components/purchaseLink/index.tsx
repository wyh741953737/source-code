import React from 'react';
import { Table, Rate } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export default (props: any) => {
  const staticData: any = props;
  const list = staticData?.supplierLink
    ? staticData.supplierLink.filter((i: any) => i)
    : [];
  const columns: ColumnsType<any> = [
    {
      title: '采购链接',
      dataIndex: 'name',
      key: 'name',
      width: 350,
      align: 'center',
      render: val => {
        return (
          <a
            href={val}
            style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
            target="_blank"
          >
            {val}
          </a>
        );
      },
    },
    {
      title: '星级',
      align: 'center',
      dataIndex: 'star',
      key: 'star',
      render: (text: any, record: any) => {
        console.log(text, 'text=======');
        return <Rate value={text} />;
      },
    },
    {
      title: '价格（￥）',
      align: 'center',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '备注',
      align: 'center',
      dataIndex: 'remark',
      key: 'remark',
    },
  ];

  return (
    <Table
      style={{ width: '100%' }}
      dataSource={list}
      columns={columns}
      pagination={false}
      bordered
    />
  );
};
