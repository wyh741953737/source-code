import React, { useEffect, useState } from 'react';
import { Modal, Form, Select, Input, Row, Col, InputNumber } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import UploadOSS, { imageType } from '@/components/CustomFields/UploadOSS';
import { PlusOutlined } from '@ant-design/icons';
import * as regExp from '@/regExp.config';
interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  console.log(params, 'params');

  const [imgloading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const isUpdate = params && params.id ? true : false;
  const layout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };
  const layout2 = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14, offset: 1 },
  };
  useEffect(() => {
    if (params) {
      form.setFieldsValue({
        ...params,
      });
    } else {
      form.resetFields();
    }
  }, [params]);
  const onValuesChange = (changedValues: any) => {
    const length = form.getFieldValue('length')
      ? form.getFieldValue('length')
      : 0;
    const width = form.getFieldValue('width') ? form.getFieldValue('width') : 0;
    const height = form.getFieldValue('height')
      ? form.getFieldValue('height')
      : 0;
    let volume = 0;
    if ('length' in changedValues) {
      volume = length * width * height;
      form.setFieldsValue({ volume: volume });
    }
    if ('width' in changedValues) {
      volume = length * width * height;
      form.setFieldsValue({ volume: volume });
    }
    if ('height' in changedValues) {
      volume = length * width * height;
      form.setFieldsValue({ volume: volume });
    }
  };

  const checkValue = (rule: any, value: number, callback: any) => {
    if (value > 9999.99) {
      callback('你输入的值过大，不能大于9999.99');
      return;
    }
    callback();
  };

  const confirmOk = () => {
    onOk(params);
  };

  return (
    <Modal
      title={`${isUpdate ? '修改' : '新增'}耗材`}
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={confirmOk}
    >
      <Form form={form} onValuesChange={onValuesChange} preserve={false}>
        <Row>
          <Col span={22}>
            <Form.Item
              label={'耗材编号'}
              name={'cNumber'}
              {...layout}
              rules={[
                {
                  max: 14,
                  message: '耗材编号不能大于14个字符',
                },
                {
                  pattern: regExp.MATERIALNUMBERREGEXP,
                  message: '只支持数字、英文，不区分大小写，请正确输入',
                },
              ]}
            >
              <Input
                placeholder="请填写耗材编号"
                disabled={isUpdate}
                maxLength={14}
              />
            </Form.Item>
            <Form.Item
              label={'耗材名称'}
              name={'cName'}
              {...layout}
              rules={[{ required: true, message: '请填写耗材名称' }]}
            >
              <Input placeholder="请填写耗材" maxLength={10} />
            </Form.Item>
            <Form.Item
              label={'长'}
              name={'length'}
              {...layout}
              rules={[
                {
                  validator: checkValue,
                },
                { required: true, message: '请输入长' },
              ]}
            >
              <InputNumber min={0} precision={2} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label={'宽'}
              name={'width'}
              {...layout}
              rules={[
                {
                  validator: checkValue,
                },
                { required: true, message: '请输入宽' },
              ]}
            >
              <InputNumber min={0} precision={2} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label={'高'}
              name={'height'}
              {...layout}
              rules={[
                {
                  validator: checkValue,
                },
                { required: true, message: '请输入高' },
              ]}
            >
              <InputNumber min={0} precision={2} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label={'重量'}
              name={'weight'}
              {...layout}
              rules={[
                {
                  validator: checkValue,
                },
              ]}
            >
              <InputNumber precision={2} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label={'体积'}
              name={'volume'}
              {...layout}
              initialValue={0}
              rules={[
                {
                  validator: checkValue,
                },
              ]}
            >
              <InputNumber precision={2} style={{ width: '100%' }} disabled />
            </Form.Item>
            <Form.Item
              label={'单价'}
              name={'price'}
              {...layout}
              rules={[
                {
                  validator: checkValue,
                },
              ]}
            >
              <InputNumber precision={2} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              {...layout}
              label="图片"
              name="image"
              extra="建议上传800*800像素，大小不超过500KB以内"
            >
              <UploadOSS
                listType="picture-card"
                accept={imageType.join(',')}
                max={1}
                limit={{ type: imageType, size: 500 * 1024 }}
              >
                <PlusOutlined style={{ fontSize: 30 }} />
              </UploadOSS>
            </Form.Item>
            {isUpdate ? (
              <Form.Item
                label={'停用'}
                name={'isDelete'}
                {...layout}
                rules={[]}
              >
                <Select
                  getPopupContainer={triggerNode => triggerNode.parentNode}
                  placeholder="全部"
                  allowClear
                >
                  <Select.Option key={1} value={1}>
                    是
                  </Select.Option>
                  <Select.Option key={0} value={0}>
                    否
                  </Select.Option>
                </Select>
              </Form.Item>
            ) : null}
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
