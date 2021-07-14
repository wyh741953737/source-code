import React, { FC } from 'react';
import { Form, Input, InputNumber, Modal, Select, Radio } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { SERVICECOMMODITYFLAG, STORETYPETRANS } from '@/enum.config';
import * as regExp from '@/regExp.config';

const Trans: FC<{ modal: ModalProps }> = ({ modal }) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
  const { realityQuantity, frozenQuantity, useQuantity } = params?.from || {};
  const canMoveQuantity =
    Number(realityQuantity) - Number(frozenQuantity) - Number(useQuantity);
  return (
    <Modal
      title="转移内容"
      visible={visible}
      onCancel={close}
      onOk={onOk}
      confirmLoading={loading}
    >
      <Form form={form} {...layout}>
        <Form.Item
          label="To货主名称"
          name="customerName"
          hasFeedback
          rules={[
            { required: true, message: '请输入To货主名称' },
            { max: 20, message: '限制20字符', type: 'string' },
          ]}
        >
          <Input placeholder="请输入，限制20字符" />
        </Form.Item>
        <Form.Item
          label="To库存类型"
          name="inventoryType"
          rules={[{ required: true, message: '请选择To库存类型' }]}
        >
          <Select placeholder="请选择">
            {STORETYPETRANS.map(m => (
              <Select.Option key={m.key} value={m.key}>
                {m.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="转移数量"
          name="quantity"
          rules={[
            { required: true, message: '请输入转移数量' },
            {
              max: isNaN(canMoveQuantity) ? 0 : canMoveQuantity,
              type: 'number',
              message: isNaN(canMoveQuantity)
                ? '可转移数量异常'
                : `可转移数量上限不能大于${canMoveQuantity}`,
            },
          ]}
        >
          <InputNumber
            min={1}
            precision={0}
            maxLength={10}
            placeholder="请输入"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Trans;
