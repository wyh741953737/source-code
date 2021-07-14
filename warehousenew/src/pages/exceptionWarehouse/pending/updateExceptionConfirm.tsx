import React, { useEffect } from 'react';
import { Form, Modal, InputNumber, Input, Upload } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import style from './index.less';
import { PlusOutlined } from '@ant-design/icons/lib/icons';
import UploadOSS, { imageType } from '@/components/CustomFields/UploadOSS';

interface Props {
  modal: ModalProps;
}
export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 17 } };
  useEffect(() => {
    form.setFieldsValue(params);
  }, [params]);
  return (
    <Modal
      title="添加异常记录"
      className={style.container}
      visible={visible}
      onCancel={close}
      onOk={() => onOk(params)}
      confirmLoading={loading}
      width={550}
    >
      <Form form={form}>
        <Form.Item
          {...layout}
          label="异常原因"
          name="remark"
          rules={[{ required: true, message: '请输入异常原因' }]}
        >
          <Input.TextArea placeholder="请输入" rows={2} maxLength={100} />
        </Form.Item>
        <Form.Item
          {...layout}
          label="异常数量"
          name="count"
          rules={[
            { required: true, message: '请输入异常数量' },
            {
              max: params?.record?.quantity,
              type: 'number',
              message: `数量不能大于${params?.record?.quantity}`,
            },
          ]}
        >
          <InputNumber placeholder="请输入" precision={0} min={1} />
        </Form.Item>
        <Form.Item
          {...layout}
          label="证明图片"
          name="images"
          // rules={[{ required: true, message: '请输入证明图片' }]}
        >
          <UploadOSS
            limit={{ type: imageType, size: 5 * 1024 * 1024 }}
            max={5}
            listType="picture-card"
          >
            <PlusOutlined />
          </UploadOSS>
        </Form.Item>
      </Form>
    </Modal>
  );
};
