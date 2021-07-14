import React, { useEffect } from 'react';
import { Form, Modal, Input, InputNumber } from 'antd';
import { ModalProps } from '@/hooks/useModal';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const layout = { labelCol: { span: 4 }, wrapperCol: { span: 19 } };
  useEffect(() => {
    form.resetFields();
  }, [params]);
  return (
    <Modal
      title="确认缺货数量"
      visible={visible}
      onCancel={close}
      onOk={() => onOk(params)}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item label="缺货SKU" {...layout}>
          <Input placeholder="请输入" disabled value={params?.sku} />
        </Form.Item>
        <Form.Item
          label="缺货数量"
          name="count"
          {...layout}
          rules={[
            { required: true, message: '请输入数量' },
            {
              max: params?.quantity || 0,
              type: 'number',
              message: `确认数量不能大于实际缺货数量(${params?.quantity})`,
            },
          ]}
        >
          <InputNumber
            placeholder="请输入"
            precision={0}
            min={1}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="remark" label="备注" {...layout}>
          <Input placeholder="请输入" maxLength={5} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
