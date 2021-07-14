import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, InputNumber } from 'antd';
import { ModalProps } from '@/hooks/useModal';

interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const layout = { labelCol: { span: 4 }, wrapperCol: { span: 19 } };
  const [count, setCount] = useState<number>(0);
  const typeArr = [1, 4];
  useEffect(() => {
    form.resetFields();
  }, [params]);
  const countChange = (value: string | number | undefined) => {
    setCount(value && value > params?.quantity ? params?.quantity : value);
  };
  return (
    <Modal
      title="确认少件数量"
      visible={visible}
      onCancel={close}
      onOk={() => onOk(params)}
      okText={
        typeArr.indexOf(params?.exceptionType) > -1 || count == params?.quantity
          ? '确认'
          : '确认并打印新条码'
      }
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item label="少件SKU" {...layout}>
          <Input placeholder="请输入" disabled value={params?.sku} />
        </Form.Item>
        <Form.Item
          label="少件数量"
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
            onChange={countChange}
          />
        </Form.Item>
        <Form.Item name="remark" label="备注" {...layout}>
          <Input.TextArea rows={4} placeholder="请输入" maxLength={200} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
