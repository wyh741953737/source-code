import React from 'react';
import { Form, Modal, InputNumber, Input, Upload } from 'antd';
import { ModalProps } from '@/hooks/useModal';
import FormList from '@/components/FormList';
import style from './index.less';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons/lib/icons';
import UploadOSS, {
  imageType,
  UploadValidate,
} from '@/components/CustomFields/UploadOSS';

interface Props {
  modal: ModalProps;
}
export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const layout = { labelCol: { span: 6 }, wrapperCol: { span: 18 } };
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
        <FormList
          name="list"
          min={1}
          closeIcon={<DeleteOutlined />}
          closeFilter={(index, field, fields) => fields.length > 1}
          renderItem={field => {
            return (
              <div>
                <Form.Item
                  {...layout}
                  label="异常原因"
                  name={[field.name, 'remark']}
                  fieldKey={[field.fieldKey, 'remark']}
                  rules={[{ required: true, message: '请输入异常原因' }]}
                >
                  <Input.TextArea
                    placeholder="请输入"
                    rows={2}
                    maxLength={100}
                  />
                </Form.Item>
                <Form.Item
                  {...layout}
                  label="异常数量"
                  name={[field.name, 'count']}
                  fieldKey={[field.fieldKey, 'count']}
                  rules={[
                    { required: true, message: '请输入异常数量' },
                    {
                      max: params.quantity,
                      type: 'number',
                      message: `数量不能大于${params.quantity}`,
                    },
                  ]}
                >
                  <InputNumber placeholder="请输入" precision={0} min={1} />
                </Form.Item>
                <Form.Item
                  {...layout}
                  label="证明图片"
                  name={[field.name, 'images']}
                  fieldKey={[field.fieldKey, 'images']}
                  rules={[
                    // { required: true, message: '请输入证明图片' },
                    { validator: UploadValidate({ noValidateError: true }) },
                  ]}
                >
                  <UploadOSS
                    limit={{ type: imageType, size: 5 * 1024 * 1024 }}
                    max={5}
                    listType="picture-card"
                  >
                    <PlusOutlined />
                  </UploadOSS>
                </Form.Item>
              </div>
            );
          }}
        />
      </Form>
    </Modal>
  );
};
