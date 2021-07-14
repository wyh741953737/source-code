import React, { FC } from 'react';
import { ModalProps } from '@/hooks/useModal';
import { Button, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { dateTimeFormat, defaultColumns } from '@/utils';

export interface StaticParams {
  keys?: string[];
  dataSource: any[];
}

interface Props {
  title: string;
  width?: number;
  modal: ModalProps<any, StaticParams>;
  columnsFactory: ((keys: any) => ColumnsType<any>) | ColumnsType<any>;
}

const StaticModal: FC<Props> = ({ title, width, modal, columnsFactory }) => {
  const { visible, close, params = { keys: [], dataSource: [] } } = modal;
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
        pagination={{
          size: 'small',
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          hideOnSinglePage: true,
        }}
      />
    </Modal>
  );
};
export default StaticModal;

export function logColumns(keys: [string, string, string]) {
  return defaultColumns([
    { title: '操作人', key: keys[0], dataIndex: keys[0] },
    { title: '操作内容', key: keys[1], dataIndex: keys[1] },
    {
      title: '操作时间',
      key: keys[2],
      dataIndex: keys[2],
      render: (text: string) => dateTimeFormat(text),
    },
  ]);
}
