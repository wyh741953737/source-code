import React, { FC } from 'react';
import { ModalProps } from '@/hooks/useModal';
import { Button, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';

export interface StaticParams {
  keys?: string[];
  dataSource: any[];
  beadType: any[];
}

interface Props {
  title: string;
  width?: number;
  modal: ModalProps<any, StaticParams>;
  columnsFactory: ((keys: any) => ColumnsType<any>) | ColumnsType<any>;
}

const headType = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    render: (text: any, record: any) => record.id,
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
  },
];
const InformationModal: FC<Props> = ({
  title,
  width,
  modal,
  columnsFactory,
}) => {
  const {
    visible,
    close,
    params = { keys: [], dataSource: [], beadType: [] },
  } = modal;
  return (
    <Modal
      title={title}
      width={width}
      visible={visible}
      onCancel={close}
      footer={
        <Button type="primary" onClick={close}>
          关闭
        </Button>
      }
    >
      <Table
        rowKey={(r, i) => String(i)}
        scroll={{ y: 500 }}
        columns={
          Array.isArray(columnsFactory)
            ? columnsFactory
            : columnsFactory(params?.keys)
        }
        dataSource={params?.dataSource}
      />
      {params.beadType.map(item => (
        <Table
          rowKey={(r, i) => String(i)}
          scroll={{ y: 500 }}
          columns={headType}
          dataSource={item?.content}
        />
      ))}
    </Modal>
  );
};
export default InformationModal;
