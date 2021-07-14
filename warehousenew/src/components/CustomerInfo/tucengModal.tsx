import React from 'react';
import { Modal, Table } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import ImagePreview from '@/components/ImagePreview';
interface Props {
  modal: ModalProps;
}

const Index: React.FC<Props> = ({ modal }) => {
  const { visible, close, onOk, loading, params } = modal;
  console.log(params);
  const columns = [
    {
      title: '序号',
      dataIndex: 'areaName',
      key: 'areaName',
      render: (text: string, record: any, index: number) => {
        return index + 1;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '内容',
      dataIndex: 'beizhu',
      key: 'beizhu',
      render: (text: string, record: any) => {
        console.log('pic', record.imgsrc);
        return record.type == 'text' || record.type == 'Text' ? (
          record.title
        ) : (
          <ImagePreview key={record.imgsrc} url={record.imgsrc} />
        );
      },
    },
  ];

  return (
    <Modal
      title={`客户定制信息`}
      width={1000}
      visible={visible}
      onCancel={close}
      onOk={onOk}
      confirmLoading={loading}
      maskClosable={false}
    >
      {params ? (
        <React.Fragment>
          {' '}
          <Table columns={columns} pagination={false} dataSource={params} />
        </React.Fragment>
      ) : null}
    </Modal>
  );
};
export default Index;
