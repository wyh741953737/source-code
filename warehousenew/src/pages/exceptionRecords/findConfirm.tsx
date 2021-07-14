import React from 'react';
import { Form, Modal, Input } from 'antd';
import { ModalProps } from '@/hooks/useModal';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, loading, params } = modal;
  const layout = { labelCol: { span: 3 }, wrapperCol: { span: 19 } };
  return (
    <Modal
      title="确认货已找到"
      visible={visible}
      onCancel={close}
      onOk={() => onOk(params)}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item name="remark" label="备注" {...layout}>
          <Input.TextArea rows={4} placeholder="请输入" maxLength={200} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
