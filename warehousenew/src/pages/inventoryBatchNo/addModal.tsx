import React, { useEffect, useState } from 'react';
import { Form, Modal, Select } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import * as api from '@/services/moveInWarehouse';
import { connect } from 'dva';

interface Props {
  modal: ModalProps;
}

const Index: React.FC<Props> = ({ modal }) => {
  const { visible, close, onOk, loading } = modal;
  const [form] = Form.useForm();
  const layout = { labelCol: { span: 7 }, wrapperCol: { span: 14 } };
  return (
    <Modal
      title="重新指派"
      visible={visible}
      onCancel={close}
      onOk={async () => {
        onOk();
      }}
      confirmLoading={loading}
      okText="确定"
      maskClosable={false}
    >
      <Form form={form} {...layout}>
        <Form.Item name="checkNumber" label="批次号">
          <span>12345678</span>
        </Form.Item>
        <Form.Item name="transferRange" label="指派用户">
          <Select placeholder="请选择" allowClear>
            {[].map((m: any) => (
              <Select.Option key={m.key} value={m.key}>
                {m.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default connect(({ common }: any) => ({
  warehouseId: common.warehouseId,
}))(Index);
