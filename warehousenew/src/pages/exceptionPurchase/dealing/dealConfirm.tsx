import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { ModalProps } from '@/hooks/useModal';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  useEffect(() => form.resetFields, [params]);
  return (
    <Modal
      title="确认处理"
      visible={visible}
      onCancel={close}
      onOk={() => onOk(params)}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item
          label="备注"
          name="remark"
          rules={[{ max: 100, message: '限制100个字符' }]}
        >
          <Input.TextArea rows={4} placeholder="请输入备注内容" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
