import React, { FC, useState } from 'react';
import { Form, Input, InputNumber, Modal, Select, Radio } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { SERVICECOMMODITYFLAG, STORETYPETRANS } from '@/enum.config';
import * as regExp from '@/regExp.config';
import { COMMMASSEPARATE } from '@/regExp.config';

const Trans: FC<{ modal: ModalProps }> = ({ modal }) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
  const { realityQuantity, frozenQuantity, useQuantity, type, locationId } =
    params?.from || {};
  const [inventoryType, setInventoryType] = useState<string>('1');
  const canMoveQuantity =
    Number(realityQuantity) - Number(frozenQuantity) - Number(useQuantity);
  const checkCommas = (rule: any, value: string, callback: any) => {
    if (value && !COMMMASSEPARATE.test(value)) {
      callback('您输入的格式有误，仅支持数字，英文，和英文逗号');
      return;
    }
    callback();
  };
  const inventoryTypeChange = (value: string) => {
    setInventoryType(value);
  };
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
          label="To货主编号"
          name="cjNumber"
          hasFeedback
          rules={[
            { required: true, message: '请输入To货主编号' },
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
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
            onChange={inventoryTypeChange}
          >
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
        {locationId && type == '1' && inventoryType == '1' && (
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
        <Form.Item label="备注" name="remark" hasFeedback>
          <Input.TextArea placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Trans;
