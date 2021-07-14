import React, { useEffect } from 'react';
import { Modal, Form, Select, Input, Row, Col } from 'antd';
import style from '../index.less';
import { ModalProps } from '@/hooks/useModal';
import useOptions from '@/hooks/useOptions';
import { warehouseApply } from '@/option.apply';
import { FORWARDERLIST } from '@/enum.config';
import { useState } from 'react';
interface Props {
  modal: ModalProps;
}

export default ({ modal }: Props) => {
  const { visible, close, onOk, form, params, loading } = modal;
  const isUpdate = params && params.id ? true : false;
  const [option] = useOptions(warehouseApply, { interval: Infinity });
  const layout = { labelCol: { span: 7 }, wrapperCol: { span: 17 } };
  const [isOther, setIsOther] = useState<boolean>(false);
  const layout2 = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14, offset: 1 },
  };
  useEffect(() => {
    if (params) {
      const { goodsLoanName } = params;
      form.setFieldsValue({
        ...params,
        goodsLoanName: goodsLoanName.includes('其它') ? '其它' : goodsLoanName,
        otherName: goodsLoanName.includes('其它')
          ? goodsLoanName.split('-')[1]
          : undefined,
      });
      if (goodsLoanName.includes('其它')) {
        setIsOther(true);
      } else {
        setIsOther(false);
      }
    } else {
      form.resetFields();
      setIsOther(false);
    }
  }, [params]);
  const onValuesChange = (changedValues: any) => {
    if ('goodsLoanName' in changedValues) {
      if (changedValues['goodsLoanName'] == '其它') {
        setIsOther(true);
      } else {
        setIsOther(false);
      }
    }
  };

  const confirmOk = () => {
    onOk(params);
  };

  return (
    <Modal
      title={`${isUpdate ? '修改' : '新建'}调度任务`}
      visible={visible}
      width={600}
      destroyOnClose={true}
      wrapClassName={style['add-or-update-modal']}
      confirmLoading={loading}
      onCancel={close}
      onOk={confirmOk}
    >
      <Form form={form} onValuesChange={onValuesChange}>
        {isUpdate ? (
          <Row>
            <Col span={11}>
              <Form.Item name="dispatchNumber" label="调度编号">
                <Input disabled={isUpdate} />
              </Form.Item>
            </Col>
          </Row>
        ) : null}
        <Row>
          <Col span={11}>
            <Form.Item
              name="sourceStorehouseId"
              label="转出仓"
              rules={[{ required: true, message: '请选择转出仓' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="请选择"
                allowClear
                disabled={isUpdate}
              >
                {option.menu.map(o => (
                  <Select.Option key={o.key} value={o.key}>
                    {o.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={13}>
            <Form.Item
              name="targetStorehouseId"
              label="到达仓"
              rules={[
                { required: true, message: '请选择到达仓' },
                {
                  validator: (rule: any, value: number, callback: any) => {
                    const { sourceStorehouseId } = form.getFieldsValue();
                    if (value === sourceStorehouseId) {
                      callback('与转出仓不能一致');
                      return;
                    }
                    callback();
                  },
                },
              ]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="请选择"
                allowClear
                disabled={isUpdate}
              >
                {option.menu.map(o => (
                  <Select.Option key={o.key} value={o.key}>
                    {o.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="goodsLoanName"
              label="货代名称"
              rules={[{ required: true, message: '请选择货代' }]}
            >
              <Select
                getPopupContainer={triggerNode => triggerNode.parentNode}
                placeholder="请选择"
                allowClear
              >
                {FORWARDERLIST.map(o => (
                  <Select.Option key={o.key} value={o.key}>
                    {o.value}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {isOther && (
              <Form.Item
                name="otherName"
                label="其它名称"
                rules={[{ required: true, message: '请填写其它货代名称' }]}
              >
                <Input placeholder="请填写其它货代名称" />
              </Form.Item>
            )}
            <Form.Item label={'调度备注'} name={'remarks'}>
              <Input.TextArea placeholder="请填写调度备注" maxLength={50} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
