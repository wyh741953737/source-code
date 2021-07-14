import React, { useEffect, useState } from 'react';
import { Form, Modal, Input, Row, Col, message, InputNumber } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { ModalProps } from '@/hooks/useModal';
interface Props {
  simple: ModalProps;
}
const SimpleModal: React.FC<Props> = ({ simple }) => {
  const { visible, close, onOk, form, loading, params = {} } = simple;
  const layout = { labelCol: { span: 0 }, wrapperCol: { span: 24 } };

  useEffect(() => {
    form.setFieldsValue({ subStandardQuantity: undefined });
  }, [visible]);
  return (
    <Modal
      title="补打"
      visible={visible}
      onCancel={close}
      onOk={onOk}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form}>
        <Row>
          <Col span={24}>
            <Form.Item
              label="打印数量"
              name="subStandardQuantity"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 6 }}
              rules={[{ required: true, message: '请输入补打数量' }]}
            >
              <InputNumber
                style={{ width: '200px' }}
                placeholder="请输入补打数量"
                min={1}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SimpleModal;
