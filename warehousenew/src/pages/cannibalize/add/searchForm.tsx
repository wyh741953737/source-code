import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import style from './index.less';
import {
  CANNIBALIZERANGE,
  CANNIBALIZETYPE,
  CANNIBALIZEPROPERTY,
} from '@/enum.config';

interface Props {
  form: FormInstance;
  setIsVerify: Function;
  disabled: boolean;
}

export default ({ form, setIsVerify, disabled }: Props) => {
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
  const layout1 = { labelCol: { span: 3 }, wrapperCol: { span: 21 } };
  const onValuesChange = () => {
    setTimeout(
      () =>
        form
          .validateFields()
          .then(e => setIsVerify(true))
          .catch(e => setIsVerify(false)),
      200,
    );
  };
  const targetStorehouseValidator = async (rules: any, value: any) => {
    const sourceStorehouseId = form.getFieldValue('sourceStorehouseId');
    if (!sourceStorehouseId) return;
    if (sourceStorehouseId === value) {
      return Promise.reject('到达仓不能为转出仓');
    }
  };
  return (
    <Form form={form} {...layout} onValuesChange={onValuesChange}>
      <div className={style.title}>调拨单详情</div>
      <Row>
        <Col span={6}>
          <Form.Item
            name="type"
            label="调拨类型"
            initialValue={1}
            rules={[{ required: true, message: '请选择调拨类型' }]}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择"
              disabled={disabled}
            >
              {CANNIBALIZETYPE.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="transferRange"
            label="调拨范围"
            rules={[{ required: true, message: '请选择调拨范围' }]}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择"
              disabled={disabled}
            >
              {CANNIBALIZERANGE.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="sourceStorehouseId"
            label="转出仓"
            rules={[{ required: true, message: '请选择转出仓' }]}
            dependencies={['targetStorehouseId']}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择"
              disabled={disabled}
            >
              {option.menu.map(o => (
                <Select.Option key={o.key} value={o.key}>
                  {o.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="targetStorehouseId"
            label="到达仓"
            rules={[
              { required: true, message: '请选择到达仓' },
              { validator: targetStorehouseValidator },
            ]}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择"
              disabled={disabled}
            >
              {option.menu.map(o => (
                <Select.Option key={o.key} value={o.key}>
                  {o.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="packProperty"
            label="调拨属性"
            rules={[{ required: true, message: '请选择调拨属性' }]}
          >
            <Select
              getPopupContainer={triggerNode => triggerNode.parentNode}
              placeholder="请选择"
              disabled={disabled}
            >
              {CANNIBALIZEPROPERTY.map(m => (
                <Select.Option key={m.key} value={m.key}>
                  {m.value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="remark" label="备注" {...layout1}>
            <Input
              placeholder="请输入，限制50个字符"
              maxLength={50}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
