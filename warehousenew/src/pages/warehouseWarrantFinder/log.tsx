import React from 'react';
import { Modal, Table } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { dateTimeFormat } from '@/utils';
interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, params, loading } = modal;
  const columns = [
    {
      title: '操作人',
      dataIndex: 'operateName',
      key: 'operateName',
      width: 100,
      align: 'left',
    },
    {
      title: '操作节点',
      width: 100,
      dataIndex: 'typeName',
      key: 'typeName',
      align: 'left',
    },
    {
      title: '操作内容',
      dataIndex: 'description',
      key: 'description',
      align: 'left',
    },
    {
      title: '操作时间',
      dataIndex: 'operateTime',
      key: 'operateTime',
      width: 200,
      align: 'left',
      render: (text: string) => dateTimeFormat(text),
    },
  ];

  return (
    <Modal
      title="操作日志"
      visible={visible}
      confirmLoading={loading}
      width={800}
      onCancel={close}
      onOk={onOk}
    >
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={params?.data}
        rowKey={record => record.id}
      />
    </Modal>
  );
};
