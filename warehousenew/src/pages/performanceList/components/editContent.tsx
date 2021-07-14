import React, { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Select,
  Input,
  Row,
  Col,
  message,
  Upload,
  InputNumber,
} from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { connect } from 'dva';
import UploadOSS, { imageType } from '@/components/CustomFields/UploadOSS';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { SCORETYPE } from '@/enum.config';
import * as regExp from '@/regExp.config';
interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;

  const [imgloading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const isUpdate = params && params.id ? true : false;
  const layout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };
  const layout2 = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14, offset: 1 },
  };

  const onValuesChange = (changedValues: any) => {
    if ('storehouseId' in changedValues) {
    }
  };

  const confirmOk = () => {
    onOk(params);
  };

  const checkValue = (rule: any, value: string, callback: any) => {
    if (!regExp.CEN.test(value)) {
      callback('只能输入中文，数字，字母');
      return;
    }
    callback();
  };

  return (
    <Modal
      title={`积分变更`}
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
              label={'加分/减分'}
              name={'scoreType'}
              {...layout}
              rules={[{ required: true, message: '请选择变更类型' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="请选择"
                allowClear
              >
                {SCORETYPE.map(o => (
                  <Select.Option key={o.key} value={o.key}>
                    {o.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={'变更值'}
              name={'quantity'}
              {...layout}
              rules={[{ required: true, message: '请填写变更值' }]}
            >
              <InputNumber
                precision={0}
                min={1}
                max={1000}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label={'扣分原因'}
              name={'remarks'}
              {...layout}
              rules={[
                { required: true, message: '请填写扣分原因' },
                {
                  validator: checkValue,
                },
              ]}
              getValueFromEvent={event => {
                return event.target.value.replace(/\s+/g, '');
              }}
            >
              <Input.TextArea placeholder="请填写扣分原因" maxLength={100} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
