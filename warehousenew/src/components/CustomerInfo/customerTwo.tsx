import React from 'react';
import { Table } from 'antd';
import ImagePreview from '@/components/ImagePreview';

interface Props {
  dataSource: any;
}

const customerInfo: React.FC<Props> = ({ dataSource }) => {
  const columns = [
    {
      title: '示例图片',
      dataIndex: 'image',
      key: 'image',
      render: (text: string, record: any) => {
        return <ImagePreview key={record.image} url={record.image} />;
      },
    },
    {
      title: '留言备注',
      dataIndex: 'beizhu',
      key: 'beizhu',
      render: (text: string, record: any) =>
        record.text || record.thirdPardMessage,
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
            href={record.image}
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
      <p style={{ textAlign: 'center' }}>客户的客户第三方定制信息</p>
      <Table columns={columns} pagination={false} dataSource={dataSource} />
    </React.Fragment>
  );
};
export default customerInfo;
