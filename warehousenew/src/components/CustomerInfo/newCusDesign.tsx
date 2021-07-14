import React from 'react';
import { Table } from 'antd';
import ImagePreview from '@/components/ImagePreview';

interface Props {
  dataSource: any;
  tuCengFun: Function;
}

const customerInfo: React.FC<Props> = ({ dataSource, tuCengFun }) => {
  const columns = [
    {
      title: '定制位置',
      dataIndex: 'areaName',
      key: 'areaName',
    },
    {
      title: '效果图',
      dataIndex: 'img',
      key: 'img',
      render: (text: string, record: any) => {
        return <ImagePreview key={record.img} url={record.img} />;
      },
    },
    {
      title: '类型',
      dataIndex: 'beizhu',
      key: 'beizhu',
      render: (text: string, record: any) => {
        return record.img ? (
          <a onClick={tuCengFun(record.layer)}>{record.type}</a>
        ) : (
          record.type
        );
      },
    },
    {
      title: '下载图片',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      width: 120,
      render: (text: string, record: any) => {
        return (
          <a
            download=""
            href={record.img}
            target="_blank"
            style={{ fontSize: '13px' }}
          >
            下载图片
          </a>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <p style={{ textAlign: 'center' }}>定制信息</p>
      <Table columns={columns} pagination={false} dataSource={dataSource} />
    </React.Fragment>
  );
};
export default customerInfo;
