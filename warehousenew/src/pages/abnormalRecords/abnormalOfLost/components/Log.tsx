import React from 'react';
import { Modal, Table, Button } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { dateTimeFormat, defaultColumns } from '@/utils';
import propertyTraversal from '@/utils/propertyUtils';
import { ORDERTYPE } from '@/enum.config';
interface Props {
  modal: ModalProps;
}

const { confirm } = Modal;

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const onValuesChange = (changedValues: any) => {
    if ('storehouseId' in changedValues) {
    }
  };

  const columns = defaultColumns([
    {
      title: '操作人',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
    },
    {
      title: '操作节点',
      dataIndex: 'operationNode',
      key: 'operationNode',
      align: 'center',
    },
    {
      title: '操作内容',
      dataIndex: 'operationContent',
      key: 'operationContent',
      align: 'center',
    },

    {
      title: '操作时间',
      dataIndex: 'operationTime',
      key: 'operationTime',
      render: (text: string) => dateTimeFormat(text),
    },
  ]);
  return (
    <Modal
      title={`订单分拣明细`}
      visible={visible}
      width={1000}
      destroyOnClose={true}
      closable={false}
      footer={
        <Button type="primary" onClick={close}>
          关闭
        </Button>
      }
    >
      {params && (
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          dataSource={params}
          loading={loading}
          rowKey={(record: any) => record.outboundOrder}
          pagination={false}
          scroll={{ y: 400 }}
        />
      )}
    </Modal>
  );
};
