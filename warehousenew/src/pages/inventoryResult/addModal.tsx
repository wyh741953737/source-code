import React, { useState } from 'react';
import { Modal, Table, Space, Radio } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { CHECKWAYS } from '@/enum.config';
import { connect } from 'dva';

interface Props {
  modal: ModalProps;
  title: string;
}

const Index: React.FC<Props> = ({ modal, title }) => {
  const { visible, close, onOk, loading, params } = modal;
  const [checkWay, changeCheckWay] = useState(CHECKWAYS.light.key);
  const DiffHtml = ({ text }: any) => {
    return <span style={{ color: 'red' }}>{text}</span>;
  };
  const columns = [
    {
      title: '库区',
      dataIndex: 'areaName',
      key: 'areaName',
    },
    {
      title: '库位',
      dataIndex: 'locationName',
      key: 'locationName',
    },
    {
      title: '货主',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: '初盘系统数量',
      dataIndex: 'initQuantity',
      key: 'initQuantity',
    },
    {
      title: '初盘数量',
      dataIndex: 'firstQuantity',
      key: 'firstQuantity',
    },
    {
      title: '差异',
      dataIndex: 'diff',
      key: 'diff',
      render: (text: string, record: any) => {
        return (
          <DiffHtml
            text={Number(record.firstQuantity) - Number(record.initQuantity)}
          />
        );
      },
    },
  ];

  return (
    <Modal
      title={title}
      width={1000}
      visible={visible}
      onCancel={close}
      onOk={async () => {
        onOk(checkWay, params);
      }}
      confirmLoading={loading}
      okText="确定"
      maskClosable={false}
    >
      <Space style={{ paddingBottom: '20px' }}>
        <span>盘点方式：</span>
        <Radio.Group
          onChange={e => changeCheckWay(e.target.value)}
          value={checkWay}
        >
          {CHECKWAYS.map(m => (
            <Radio key={m.key} value={m.key}>
              {m.value}
            </Radio>
          ))}
        </Radio.Group>
      </Space>
      <Table
        columns={columns}
        scroll={{ y: 400 }}
        dataSource={params}
        pagination={false}
      />
    </Modal>
  );
};
export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(Index);
