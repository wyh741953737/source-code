import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, message, Table, InputNumber, Button } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { connect } from 'dva';
import { dateTimeFormat, defaultColumns } from '@/utils';
import { SCHEDULINGTYPE } from '@/enum.config';
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
      title: '运单号/包裹号',
      dataIndex: 'parcelOrWaybillNumber',
      key: 'parcelOrWaybillNumber',
      align: 'left',
    },
    {
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'left',
    },
    {
      title: '属性',
      dataIndex: 'property',
      key: 'property',
      align: 'left',
    },
    {
      title: '调度类型',
      dataIndex: 'schedulingType',
      key: 'schedulingType',
      align: 'left',
      render: (text: number, record: any) => {
        return SCHEDULINGTYPE.key(text)?.value;
      },
    },
    {
      title: '重量',
      dataIndex: 'weight',
      key: 'weight',
      align: 'left',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'left',
    },
  ]);

  return (
    <Modal
      title={`包裹编号: ${params ? params.packageNumber : '-'}`}
      visible={visible}
      width={800}
      destroyOnClose={true}
      closable={false}
      footer={
        <Button type="primary" onClick={close}>
          关闭
        </Button>
      }
    >
      {params && params.Data.length > 0 ? (
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          dataSource={params.Data}
          loading={loading}
          rowKey={(record: any) =>
            record.orderId + record.parcelOrWaybillNumber
          }
          pagination={false}
        />
      ) : (
        <p style={{ textAlign: 'center' }}>暂无数据</p>
      )}
    </Modal>
  );
};
