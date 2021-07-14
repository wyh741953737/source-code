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
  useEffect(() => {
    if (params) {
      form.setFieldsValue({
        ...params,
      });
    } else {
      form.resetFields();
    }
  }, [params]);
  const confirmOk = () => {
    onOk(params);
  };
  return (
    <Modal
      title="输入物流和运单号"
      visible={visible}
      onCancel={close}
      onOk={confirmOk}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form form={form}>
        <Row>
          <Col span={24}>
            <Form.Item
              label="物流"
              name="logisticsCompany"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 6 }}
              rules={[{ required: true, message: '请选择物流' }]}
            >
              <Input style={{ width: '300px' }} min={1} disabled />
            </Form.Item>
            <Form.Item
              label="运单号"
              name="trackingNumber"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 6 }}
              rules={[{ required: true, message: '请输入运单号' }]}
            >
              <Input
                style={{ width: '300px' }}
                placeholder="请输入运单号"
                min={1}
              />
            </Form.Item>
            {params.orderType != 1 ? (
              <Form.Item
                label="线下物流"
                name="offlineLogistics"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 6 }}
              >
                <Input
                  style={{ width: '300px' }}
                  placeholder="线下物流单号"
                  min={1}
                />
              </Form.Item>
            ) : null}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SimpleModal;
