import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Row, Col, InputNumber, message } from 'antd';
import style from '../index.less';

import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { connect } from 'dva';
import * as api from '@/services/packagePrint';

interface Props {
  modal: ModalProps;
}

export default connect(({ packagePrint }: any) => ({}))(({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const [option] = useOptions(warehouseApply, { interval: Infinity });

  const layout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };

  const [focus, setFocus] = useState(false);
  const layout2 = {
    labelCol: { span: 12, offset: 1 },
    wrapperCol: { span: 12, offset: 1 },
  };
  useEffect(() => {
    console.log(params);
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
  const authLogisticNumber = async (e: any) => {
    console.log(e.target.value, params, '==========eeeeee');

    const { id, logisticsCompany } = params;
    let postParams = {
      logisticsTrackingNumber: e.target.value,
      logisticsCompany,
      weightPackageId: id,
    };
    const resp = await api
      .trackNumber({
        ...postParams,
      })
      .catch(e => {});
    if (!resp || resp.code !== 200) {
      message.warn('识别失败');
      form.setFieldsValue({ logisticsTrackingNumber: undefined });
    }
  };

  const focusChange = () => {
    setFocus(true);
  };
  const blurChange = () => {
    setFocus(false);
  };

  return (
    <Modal
      title={`新增包裹`}
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
              label={'输入包裹'}
              name={'logisticsTrackingNumber'}
              {...layout}
              rules={[{ required: true, message: '请扫描或手动输入追踪号' }]}
            >
              <Input
                placeholder="请扫描或手动输入追踪号"
                onPressEnter={authLogisticNumber}
              />
            </Form.Item>
            <Form.Item
              label={'输入重量'}
              name={'weight'}
              {...layout}
              rules={[{ required: true, message: '请输入包裹重量' }]}
            >
              <InputNumber
                min={0}
                placeholder="请输入包裹重量(kg)"
                style={{ width: '90%', marginRight: '10px' }}
                onFocus={focusChange}
                onBlur={blurChange}
                formatter={value => {
                  if (focus) {
                    return `${value}`;
                  }
                  return `${value}kg`;
                }}
                parser={(value: any) => value.replace('kg', '')}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});
