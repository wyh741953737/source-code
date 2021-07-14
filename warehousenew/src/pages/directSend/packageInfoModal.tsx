import React from 'react';
import { Form, Input, Modal, message, Table, Button } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import * as api from '@/services/directSend';
import { defaultColumns } from '@/utils';
import useButton from '@/hooks/useButton';
// import printAuto from '@/components/Print';
import printAuto from '@/utils/printThree';

interface Props {
  modal: ModalProps;
}

const PackageInfoModal: React.FC<Props> = ({ modal }) => {
  const { visible, onOk, params = {}, loading } = modal;
  const printDetailBtn = useButton({
    onClick: async () => {
      // if (!params.id) return;
      const resp = await api.printDetail([params.id]);
      printAuto(
        resp.data.map(d => ({
          url: d.pdf,
          logisticsChannel: d.logisticsChannel,
          orderId: d.orderId,
          logisticsCompany: d.logisticsCompany,
        })),
      );
    },
  });
  const columns = defaultColumns([
    { title: 'SKU', dataIndex: 'variantSku', key: 'variantSku', align: 'left' },
    {
      title: '商品名称',
      dataIndex: 'productName',
      key: 'productName',
      align: 'left',
    },
    {
      title: '商品数量',
      dataIndex: 'checkedNum',
      key: 'checkedNum',
      align: 'left',
    },
  ]);
  const footer = (
    <>
      <Button loading={printDetailBtn.loading} onClick={printDetailBtn.onClick}>
        打印装箱明细
      </Button>
      <Button type="primary" loading={loading} onClick={onOk}>
        继续验货
      </Button>
    </>
  );
  return (
    <Modal
      title="封箱"
      visible={visible}
      confirmLoading={loading}
      okText="确定并打印面单"
      closable={false}
      maskClosable={false}
      width={700}
      footer={footer}
    >
      <Table
        dataSource={params.data || []}
        columns={columns}
        rowKey={record => record.variantSku}
        pagination={false}
        scroll={{ y: 400 }}
        footer={() => (
          <span>此订单{params.isLast ? '已' : '未'}完成验货,请继续验货</span>
        )}
      />
    </Modal>
  );
};
export default PackageInfoModal;
