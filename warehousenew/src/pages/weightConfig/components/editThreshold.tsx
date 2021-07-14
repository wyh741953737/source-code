import React, { useEffect } from 'react';
import { Modal, Form, Row, Col, InputNumber } from 'antd';
import style from '../index.less';

import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { connect } from 'dva';
interface Props {
  modal: ModalProps;
}

export default connect(({}: any) => ({}))(({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
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
    if ('storehouseId' in changedValues) {
      //   form.setFieldsValue({ areaName: undefined });
    }
  };

  return (
    <Modal
      title={`重量阈值`}
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={() => onOk(params)}
    >
      <Form form={form} onValuesChange={onValuesChange} preserve={false}>
        <Row>
          <Col span={23}>
            <Form.Item
              label={'阈值'}
              name={'number'}
              {...layout}
              rules={[{ required: true, message: '请输入阈值' }]}
            >
              <InputNumber
                min={0}
                max={100}
                precision={0}
                style={{ width: '90%', marginRight: '10px' }}
                formatter={value => `${value}%`}
                parser={(value: any) => value.replace('%', '')}
                placeholder="请输入阈值"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
