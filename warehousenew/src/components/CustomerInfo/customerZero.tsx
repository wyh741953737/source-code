import React from 'react';
import { Table } from 'antd';
import ImagePreview from '@/components/ImagePreview';

interface Props {
  dataSource: any;
}

const customerInfo: React.FC<Props> = ({ dataSource }) => {
  const columns = [
    {
      title: '定制位置',
      dataIndex: 'location',
      key: 'location',
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return 'CJ前';
        }
        if (record.customMessgae.zone.back) {
          return 'CJ后';
        }
        if (record.customDesign.front) {
          return '客户前';
        }
        if (record.customDesign.back) {
          return '客户后';
        }
      },
    },
    {
      title: '定制区域图',
      dataIndex: 'editimgurl',
      key: 'editimgurl',
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.front.editimgurl}
              url={record.customMessgae.zone.front.editimgurl}
            />
          );
        }
        if (record.customMessgae.zone.back) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.back.editimgurl}
              url={record.customMessgae.zone.back.editimgurl}
            />
          );
        }
        if (record.customDesign.front) {
          return (
            <ImagePreview
              key={record.customDesign.front.editimgurl}
              url={record.customDesign.front.editimgurl}
            />
          );
        }
        if (record.customDesign.back) {
          return (
            <ImagePreview
              key={record.customDesign.back.editimgurl}
              url={record.customDesign.back.editimgurl}
            />
          );
        }
        return <ImagePreview key={''} url={''} />;
      },
    },
    {
      title: '展示图',
      dataIndex: 'showimgurl',
      key: 'showimgurl',
      width: 120,
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.front.showimgurl}
              url={record.customMessgae.zone.front.showimgurl}
            />
          );
        }
        if (record.customMessgae.zone.back) {
          return (
            <ImagePreview
              key={record.customMessgae.zone.back.showimgurl}
              url={record.customMessgae.zone.back.showimgurl}
            />
          );
        }
        if (record.customDesign.front) {
          return (
            <ImagePreview
              key={record.customDesign.front.showimgurl}
              url={record.customDesign.front.showimgurl}
            />
          );
        }
        if (record.customDesign.back) {
          return (
            <ImagePreview
              key={record.customDesign.back.showimgurl}
              url={record.customDesign.back.showimgurl}
            />
          );
        }
        return <ImagePreview key={''} url={''} />;
      },
    },
    {
      title: '定制信息',
      dataIndex: 'beizhu',
      key: 'beizhu',
      render: (text: string, record: any) => {
        if (record.customMessgae.zone.front) {
          return '-';
        }
        if (record.customMessgae.zone.back) {
          return '-';
        }
        if (record.customDesign.front) {
          return (
            <React.Fragment>
              {record.customDesign.front.text && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">定制文字:</span>
                  <span>{record.customDesign.front.text}</span>
                </p>
              )}
              {record.customDesign.front.fontsize && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体大小:</span>
                  <span>{record.customDesign.front.fontsize}</span>
                </p>
              )}
              {record.customDesign.front.fontcolor && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体颜色:</span>
                  <span>{record.customDesign.front.fontcolor}</span>
                </p>
              )}
              {record.customDesign.front.fontfamily && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体名字:</span>
                  <span>{record.customDesign.front.fontfamily}</span>
                </p>
              )}
            </React.Fragment>
          );
        }
        if (record.customDesign.back) {
          return (
            <React.Fragment>
              {record.customDesign.back.text && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">定制文字:</span>
                  <span>{record.customDesign.back.text}</span>
                </p>
              )}
              {record.customDesign.back.fontsize && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体大小:</span>
                  <span>{record.customDesign.back.fontsize}</span>
                </p>
              )}
              {record.customDesign.back.fontcolor && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体颜色:</span>
                  <span>{record.customDesign.back.fontcolor}</span>
                </p>
              )}
              {record.customDesign.back.fontfamily && (
                <p className="pod-text-p">
                  <span className="pod-text-tit">字体名字:</span>
                  <span>{record.customDesign.back.fontfamily}</span>
                </p>
              )}
            </React.Fragment>
          );
        }
        return '-';
      },
    },
    {
      title: '下载图片',
      dataIndex: 'image',
      key: 'image',
      width: 120,
      render: (text: number, record: any) => {
        if (record.customMessgae.zone.front) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customMessgae.zone.front.editimgurl}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        if (record.customMessgae.zone.back) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customMessgae.zone.back.editimgurl}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        if (record.customDesign.front) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customDesign.front.imgUrl}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        if (record.customDesign.back) {
          return (
            <a
              download=""
              target="_blank"
              href={record.customDesign.back.imgUrl}
              style={{ fontSize: '13px' }}
            >
              下载图片
            </a>
          );
        }
        return '-';
      },
    },
  ];
  return (
    <React.Fragment>
      <p style={{ textAlign: 'center' }}>客户的定制信息</p>
      <Table columns={columns} pagination={false} dataSource={dataSource} />
    </React.Fragment>
  );
};
export default customerInfo;
