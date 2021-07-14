import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, message, Table, InputNumber, Button } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { connect } from 'dva';
import { dateTimeFormat, defaultColumns } from '@/utils';

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
      title: '库位id',
      dataIndex: 'id',
      key: 'id',
      align: 'left',
    },
    {
      title: '库位名称',
      dataIndex: 'name',
      key: 'name',
      align: 'left',
    },
    {
      title: '库位数量',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'left',
      width: 120,
    },
  ]);

  return (
    <Modal
      title={`推荐库位`}
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
      {params && params.length > 0 ? (
        <Table
          // @ts-ignore
          columns={columns}
          bordered
          dataSource={params}
          loading={loading}
          rowKey={(record: any) => record.id}
          pagination={false}
        />
      ) : (
        <p style={{ textAlign: 'center' }}>暂无数据</p>
      )}
    </Modal>
  );
};
