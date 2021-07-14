import React, { useEffect } from 'react';
import { Form, Modal, Select, Input } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { CONTAINERTYPE } from '@/enum.config';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';

interface Props {
  modal: ModalProps;
}
const AddContainer: React.FC<Props> = ({ modal }) => {
  const { visible, close, onOk, form, params = {}, loading } = modal;
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 16 } };
  useEffect(() => {
    form.setFieldsValue({ warehouse: params.storehouseId });
  }, [params]);
  return (
    <Modal
      title="新建容器"
      visible={visible}
      onCancel={close}
      onOk={onOk}
      confirmLoading={loading}
    >
      <Form form={form}>
        <Form.Item
          name="warehouse"
          label="仓库"
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
        <Form.Item name="containerNum" label="容器编号" {...layout}>
          <Input placeholder="请填写，不填写将自动生成" />
        </Form.Item>
        <Form.Item
          name="containerType"
          label="容器类型"
          {...layout}
          rules={[{ required: true, message: '请选择容器类型' }]}
        >
          <Select
            getPopupContainer={triggerNode => triggerNode.parentNode}
            placeholder="请选择"
          >
            {CONTAINERTYPE.map(item => (
              <Select.Option key={item.key} value={item.key}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="remark" label="备注" {...layout}>
          <Input.TextArea placeholder="请输入" maxLength={200} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddContainer;
