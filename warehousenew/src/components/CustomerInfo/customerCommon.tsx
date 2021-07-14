import React from 'react';
import { Table } from 'antd';
import ImagePreview from '@/components/ImagePreview';

interface Props {
  dataSource: any;
  ordTableTit: string;
}

const customerInfo: React.FC<Props> = ({ dataSource, ordTableTit }) => {
  const columns = [
    {
      title: `${ordTableTit}`,
      dataIndex: 'image',
      key: 'image',
      colSpan: 2,
      render: (text: string, record: any) => {
        const keyArr = Object.keys(record);
        return keyArr.map(item => <div>{item}</div>);
      },
    },
    {
      title: '下载图片',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      colSpan: 2,
      render: (text: string, record: any) => {
        const keyArr = Object.keys(record);
        return keyArr.map(item => {
          if (item != 'cj_count' && record[item].indexOf('http') != -1) {
            return (
              <>
                <ImagePreview
                  key={record[item].replace('dl=1', 'preview=1')}
                  url={record[item].replace('dl=1', 'preview=1')}
                />
                <a
                  download=""
                  target="_blank"
                  href={record[item]}
                  style={{ fontSize: '13px', float: 'left' }}
                >
                  下载图片
                </a>
              </>
            );
          } else {
            return record[item];
          }
        });
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
