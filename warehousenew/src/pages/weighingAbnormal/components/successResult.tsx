import React from 'react';
import { Modal, Table, Button } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import { defaultColumns } from '@/utils';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, params, loading } = modal;

  const columns = defaultColumns([
    {
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'left',
    },
    {
      title: '运单号',
      dataIndex: 'logisticsTrackingNumber',
      key: 'logisticsTrackingNumber',
      align: 'left',
    },
    {
      title: '录入重量(g)',
      dataIndex: 'weight',
      key: 'weight',
      align: 'left',
    },
  ]);

  return (
    <Modal
      title={`录入成功`}
      visible={visible}
      width={800}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
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
        <p style={{ textAlign: 'center' }}>暂无提交成功的重量信息</p>
      )}
    </Modal>
  );
};
