import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Modal, message, Button } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import { BarcodeOutlined, DeleteOutlined } from '@ant-design/icons/lib';
import style from './index.less';

interface Props {
  modal: ModalProps;
}

const ConsumableModal: React.FC<Props> = ({ modal }) => {
  const { visible, onOk, form, params = {}, loading } = modal;
  const inputRef = useRef<Input>(null);
  const [values, setValues] = useState<string[]>([]);
  const onPressEnter = async (e: any) => {
    const value = e.target.value.trim();
    inputRef.current?.select();
    if (!value) {
      return message.error('请扫描或输入耗材码');
    }
    setValues([...values, e.target.value]);
  };
  useEffect(() => {
    if (visible) {
      setValues([]);
      const timer = setTimeout(() => inputRef.current?.focus(), 500);
      return () => clearTimeout(timer);
    }
  }, [visible]);
  return (
    <Modal
      title="耗材录入"
      visible={visible}
      confirmLoading={loading}
      maskClosable={false}
      closable={false}
      footer={
        <Button type="primary" onClick={() => onOk(values)}>
          耗材录入完成
        </Button>
      }
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        <Form.Item
          label="扫描耗材"
          name="consumable"
          extra="可以不扫描耗材，直接点击耗材录入完成"
        >
          <Input
            ref={inputRef}
            placeholder="请扫描耗材"
            onPressEnter={onPressEnter}
            onFocus={() => inputRef.current?.select()}
            prefix={<BarcodeOutlined />}
          />
        </Form.Item>
        {values.length > 0 && (
          <Form.Item label="耗材列表">
            {values.map((v, i) => (
              <div key={i} className={style['consumable-item']}>
                <span>{v}</span>
                <DeleteOutlined
                  onClick={() =>
                    setValues(values.filter((v, index) => i !== index))
                  }
                />
              </div>
            ))}
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
export default ConsumableModal;
