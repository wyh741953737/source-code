import React, { useEffect } from 'react';
import { Form, Modal, Input, InputNumber } from 'antd';
import { ModalProps } from '@/hooks/useModal';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const layout = { labelCol: { span: 4 }, wrapperCol: { span: 19 } };
  return (
    <Modal
      title="回填运单号"
      visible={visible}
      onCancel={close}
      onOk={() => onOk(params)}
      confirmLoading={loading}
    >
      <Form form={form} {...layout}>
        <Form.Item
          name="remark"
          label="运单号"
          rules={[{ required: true, message: '请输入运单号' }]}
        >
          <Input placeholder="请输入" maxLength={50} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
