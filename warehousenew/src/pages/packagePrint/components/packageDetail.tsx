import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import { defaultColumns } from '@/utils';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [dataSource, setDataSource] = useState<
    Array<{ code: string; id: string }>
  >([]);
  useEffect(() => {
    console.log(params);
    if (params) {
      setDataSource(params);
    } else {
      setDataSource([]);
    }
  }, [params]);

  const columns = defaultColumns([
    {
      title: '包裹编号',
      dataIndex: 'packCode',
      key: 'packCode',
      align: 'center',
    },
    {
      title: '操作人',
      dataIndex: 'createBy',
      key: 'createBy',
      align: 'center',
    },
    {
      title: '订单号',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'center',
    },

    {
      title: '运单号',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
    },
  ]);

  return (
    <Modal
      title={`包裹明细`}
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={() => onOk(params)}
    >
      <Table
        // @ts-ignore
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        scroll={{ y: 500 }}
        pagination={false}
      />
    </Modal>
  );
};
