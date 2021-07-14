import React, { useEffect, useRef } from 'react';
import { Form, Input, Modal } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { BarcodeOutlined } from '@ant-design/icons/lib';

interface Props {
  modal: ModalProps;
}

const TSContainerModal: React.FC<Props> = ({ modal }) => {
  const { visible, form, onOk, params = {}, loading } = modal;
  const inputRef = useRef<Input>(null);
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => inputRef.current?.focus(), 500);
      return () => clearTimeout(timer);
    }
  }, [visible]);
  return (
    <Modal
      title="暂存"
      visible={visible}
      confirmLoading={loading}
      onCancel={onOk}
      onOk={() => {
        form
          .validateFields()
          .then(() => onOk())
          .catch(e => {
            inputRef.current?.focus();
          });
      }}
      okText="确定并暂存到此容器"
      cancelText="放弃暂存"
      maskClosable={false}
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        <Form.Item
          label="请扫描暂存容器"
          name="container"
          rules={[{ required: true, message: '请扫描暂存容器' }]}
        >
          <Input
            ref={inputRef}
            placeholder="请扫描暂存容器"
            onFocus={() => inputRef.current?.select()}
            prefix={<BarcodeOutlined />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default TSContainerModal;
