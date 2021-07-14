import React from 'react';
import { Modal, Table, Button } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { defaultColumns } from '@/utils';
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
      title: '出库单号',
      dataIndex: 'outboundOrder',
      key: 'outboundOrder',
      align: 'left',
    },
    {
      title: '已分拣数',
      dataIndex: 'sortedQuantity',
      key: 'sortedQuantity',
      align: 'left',
    },
    {
      title: '商品数量',
      dataIndex: 'outputQuantity',
      key: 'outputQuantity',
    },
    {
      title: '单据类型',
      dataIndex: 'type',
      key: 'type',
      align: 'left',
      render: (text: number) => ORDERTYPE.key(text)?.value || '-',
    },
  ]);
  const expandedRowRender = (record: any) => {
    console.log(record, 'sortedSkuDTOS=====');
    const childColumns = defaultColumns([
      {
        title: 'SKU',
        dataIndex: 'variantSku',
        key: 'variantSku',
        align: 'left',
      },
      {
        title: '短码',
        dataIndex: 'variantNum',
        key: 'variantNum',
        align: 'left',
      },
      {
        title: '属性',
        dataIndex: 'variantKeyMap',
        key: 'variantKeyMap',
        width: 150,
        render: (text: any) => {
          return <div>{propertyTraversal(text)}</div>;
        },
      },
      {
        title: '商品数量',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'left',
      },
      {
        title: '已分拣数量',
        dataIndex: 'sortedSkuQuantity',
        key: 'sortedSkuQuantity',
        align: 'left',
      },
    ]);
    return (
      <Table
        // @ts-ignore
        columns={childColumns}
        bordered
        dataSource={record.sortedSkuDTOS}
        loading={loading}
        rowKey={(record: any) => record.id}
        pagination={false}
      />
    );
  };
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
          expandable={{
            expandedRowRender,
            rowExpandable: record =>
              record.sortedSkuDTOS && record.sortedSkuDTOS.length > 0,
          }}
        />
      )}
    </Modal>
  );
};
