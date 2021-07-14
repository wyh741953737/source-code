import React from 'react';
import { Modal, Table } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { GetDetail } from '@/services/thirdStore.d';

interface Props {
  modal: ModalProps<GetDetail.Response>;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, loading, params } = modal;
  const columns1 = defaultColumns([
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: '批次', dataIndex: 'batchNumber', key: 'batchNumber' },
    {
      title: '入库时间',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text: string) => dateTimeFormat(text),
    },
    { title: '实物库存', dataIndex: 'realityQuantity', key: 'realityQuantity' },
    {
      title: '可用库存',
      dataIndex: 'availableQuantity',
      key: 'availableQuantity',
    },
    { title: '占用库存', dataIndex: 'useQuantity', key: 'useQuantity' },
    { title: '冻结库存', dataIndex: 'frozenQuantity', key: 'frozenQuantity' },
  ]);
  const columns2 = defaultColumns([
    { title: '订单号', dataIndex: 'useNumber', key: 'useNumber' },
    { title: 'SKU', dataIndex: 'sku', key: 'sku' },
    { title: '占用数量', dataIndex: 'useQuantity', key: 'useQuantity' },
    {
      title: '占用时间',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (text: string) => dateTimeFormat(text),
    },
  ]);
  return (
    <Modal
      title="库位详情及占用"
      visible={visible}
      onCancel={close}
      onOk={onOk}
      confirmLoading={loading}
      width={1200}
    >
      <Table
        rowKey={record => record.sku + record.batchNumber + record.createAt}
        columns={columns1}
        dataSource={params?.batchReturnDTOS}
        style={{ marginBottom: '20px' }}
      />
      <Table
        rowKey={record => record.sku + record.useNumber + record.createAt}
        columns={columns2}
        dataSource={params?.batchUseReturnDTOS}
      />
    </Modal>
  );
};
