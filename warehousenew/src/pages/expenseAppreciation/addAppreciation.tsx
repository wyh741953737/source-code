import React from 'react';
import { Form, Modal, Select, Input, DatePicker, InputNumber } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { SERVICECOMMODITY, SETTLEMENT, STATISTICSUNIT } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';

interface Props {
  modal: ModalProps;
}

const AddAppreciation: React.FC<Props> = ({ modal }) => {
  const { visible, close, onOk, form, params = {}, loading } = modal;
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
  return (
    <Modal
      title="新增增值费用"
      visible={visible}
      onCancel={close}
      onOk={onOk}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item label="编号" {...layout}>
          <Input value="不填写将自动生成" disabled />
        </Form.Item>
        <Form.Item
          name="expenseName"
          label="费用名称"
          {...layout}
          rules={[{ required: true, message: '请输入费用名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="warehouse"
          label="仓库名称"
          {...layout}
          rules={[{ required: true, message: '请选择仓库' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
          >
            {option.menu.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="settlement"
          label="结算维度"
          {...layout}
          rules={[{ required: true, message: '请选择结算维度' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
          >
            {SETTLEMENT.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="customerId" label="客户编号" {...layout}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="客户名称" {...layout}>
          <Input placeholder="请输入" disabled />
        </Form.Item>
        <Form.Item
          name="serviceCommodity"
          label="服务商品"
          {...layout}
          rules={[{ required: true, message: '请选择服务商品' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
          >
            {SERVICECOMMODITY.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="statisticsUnit"
          label="统计单位"
          {...layout}
          rules={[{ required: true, message: '请选择统计单位' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
          >
            {STATISTICSUNIT.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="timeStart"
          label="有效期起"
          {...layout}
          rules={[{ required: true, message: '请选择有效期起' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="endStart"
          label="有效期止"
          {...layout}
          rules={[{ required: true, message: '请选择有效期止' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="freeDays" label="免费天数" {...layout}>
          <InputNumber
            placeholder="请输入"
            min={0}
            max={10000}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddAppreciation;
