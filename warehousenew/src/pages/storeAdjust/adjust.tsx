import React, { FC } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { COMMMASSEPARATE } from '@/regExp.config';

const Adjust: FC<{ modal: ModalProps }> = ({ modal }) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
  const { realityQuantity, frozenQuantity, useQuantity, locationId, type } =
    params?.from || {};
  const canMoveQuantity =
    Number(realityQuantity) - Number(frozenQuantity) - Number(useQuantity);
  const checkCommas = (rule: any, value: string, callback: any) => {
    if (value && !COMMMASSEPARATE.test(value)) {
      callback('您输入的格式有误，仅支持数字，英文，和英文逗号');
      return;
    }
    callback();
  };
  return (
    <Modal
      title="调整内容"
      visible={visible}
      onCancel={close}
      onOk={() => onOk()}
      confirmLoading={loading}
    >
      <Form form={form} {...layout}>
        <Form.Item label="可调整量">
          <Input value={canMoveQuantity} />
        </Form.Item>
        <Form.Item
          label="To目标数量"
          name="alterQuantity"
          rules={[{ required: true, message: '请输入转移数量' }]}
        >
          <InputNumber
            min={0}
            precision={0}
            maxLength={5}
            placeholder="请输入"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="调整原因" name="remark">
          <Input.TextArea
            placeholder="请输入，限制100字符"
            rows={3}
            maxLength={200}
          />
        </Form.Item>
        {locationId && type == '1' && (
          <Form.Item
            label={'指定抵扣订单'}
            name={'orderInfo'}
            rules={[
              {
                validator: checkCommas,
                message: '请输入正确的格式，仅支持数字，英文，且用英文逗号隔开',
              },
            ]}
          >
            <Input placeholder="请输入订单号,多个请用英文逗号隔开" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
export default Adjust;
